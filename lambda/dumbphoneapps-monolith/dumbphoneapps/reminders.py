from .dumbphoneapps_logger import log
import calendar
import datetime
import functools
import json
import os
import re
import time
from zoneinfo import ZoneInfo

from botocore.exceptions import ClientError

from .input_validation import validate_date
from .utils import (
    authenticate,
    format_response,
    python_obj_to_dynamo_obj,
    dynamo_obj_to_python_obj,
    dynamo,
    sqs,
    scheduler,
    create_id,
    TABLE_NAME,
    ADMIN_PHONE,
    SMS_SQS_QUEUE_URL,
    SMS_SCHEDULER_ROLE_ARN,
)

# See docs/preventable-reminders.md for the overall design, the state machine
# (active -> sending -> active | completed), and the AWS setup this relies on.

REMINDER_DISPATCH_LAMBDA_ARN = os.environ.get("REMINDER_DISPATCH_LAMBDA_ARN")

TIMEZONE = "America/New_York"
UTC = datetime.timezone.utc
ISO_FORMAT = "%Y-%m-%dT%H:%M:%SZ"
LOCAL_FORMAT = "%Y-%m-%dT%H:%M"
FREQUENCIES = ["once", "daily", "weekly", "monthly", "yearly"]
SCHEDULE_GROUP = "preventable-reminders"
MAX_DESCRIPTION_LENGTH = 500
MAX_EXECUTIONS = 1000
# A "sending" claim older than this is considered stuck (the dispatcher died and
# exhausted its retries). Comfortably longer than the max Lambda timeout.
STUCK_SENDING_SECONDS = 15 * 60

TIME_REGEX = re.compile(r"^\d{2}:\d{2}(:\d{2})?$")


@functools.cache
def local_tz():
    # Loaded lazily so missing tz data on the runtime only breaks this app,
    # rather than failing the import of the whole monolith
    return ZoneInfo(TIMEZONE)


def utc_now():
    return datetime.datetime.now(tz=UTC)


def to_iso(dt):
    return dt.astimezone(UTC).strftime(ISO_FORMAT)


def from_iso(value):
    return datetime.datetime.strptime(value, ISO_FORMAT).replace(tzinfo=UTC)


def reminder_key1(user_data):
    return f"reminder_{user_data['key2']}"


def local_start_to_utc(date_str, time_str):
    # fold=0 picks the first of two ambiguous fall-back times, and for a time
    # that doesn't exist (spring-forward gap) zoneinfo applies the pre-gap
    # offset, so 02:30 becomes 03:30 EDT once converted to UTC
    naive = datetime.datetime.strptime(f"{date_str}T{time_str}", LOCAL_FORMAT)
    return naive.replace(tzinfo=local_tz()).astimezone(UTC)


def add_months(naive, months):
    years, month_index = divmod(naive.month - 1 + months, 12)
    year = naive.year + years
    month = month_index + 1
    day = min(naive.day, calendar.monthrange(year, month)[1])
    return naive.replace(year=year, month=month, day=day)


def nth_occurrence_utc(start_local, frequency, n):
    # Occurrences are always computed from the original local start so that
    # month-end clamping doesn't drift (Jan 31 -> Feb 28 -> Mar 31) and the
    # local wall-clock time survives daylight saving changes
    naive = datetime.datetime.strptime(start_local, LOCAL_FORMAT)
    if frequency == "once":
        if n != 0:
            raise ValueError("A one-time reminder only has occurrence 0")
    elif frequency == "daily":
        naive = naive + datetime.timedelta(days=n)
    elif frequency == "weekly":
        naive = naive + datetime.timedelta(weeks=n)
    elif frequency == "monthly":
        naive = add_months(naive, n)
    elif frequency == "yearly":
        naive = add_months(naive, 12 * n)
    else:
        raise ValueError(f"Unsupported frequency {frequency}")
    return naive.replace(tzinfo=local_tz()).astimezone(UTC)


def next_future_occurrence(record, now):
    # Always moves at least one occurrence forward, then keeps going until the
    # occurrence is in the future, so a late retry never schedules the past
    index = int(record["occurrence_index"]) + 1
    occurrence = nth_occurrence_utc(record["start_local"], record["frequency"], index)
    while occurrence <= now:
        index += 1
        occurrence = nth_occurrence_utc(record["start_local"], record["frequency"], index)
    return index, to_iso(occurrence)


def normalize_recipient(value):
    if not isinstance(value, str):
        return None
    digits = re.sub(r"\D", "", value)
    if len(digits) == 11 and digits.startswith("1"):
        digits = digits[1:]
    if len(digits) != 10 or digits[0] in "01":
        return None
    return digits


def normalize_time(value):
    if not isinstance(value, str) or not TIME_REGEX.match(value):
        return None
    try:
        datetime.datetime.strptime(value[:5], "%H:%M")
    except ValueError:
        return None
    return value[:5]


def validate_create_body(body, now):
    description = body.get("description")
    if not isinstance(description, str) or not description.strip():
        return None, "You must supply the reminder text"
    description = description.strip()
    if len(description) > MAX_DESCRIPTION_LENGTH:
        return None, f"Reminder text must be {MAX_DESCRIPTION_LENGTH} characters or fewer"
    recipient = normalize_recipient(body.get("recipient"))
    if not recipient:
        return None, "Recipient must be a 10 digit US phone number"
    frequency = body.get("frequency")
    if frequency not in FREQUENCIES:
        return None, f"Frequency must be one of {', '.join(FREQUENCIES)}"
    start_date = validate_date(body.get("start_date"))
    if not start_date:
        return None, "You must supply a start date in the format yyyy-mm-dd"
    start_time = normalize_time(body.get("start_time"))
    if not start_time:
        return None, "You must supply a time in the format hh:mm"
    start_at = local_start_to_utc(start_date, start_time)
    if start_at <= now:
        return None, "The reminder start date and time must be in the future"
    clean = {
        "description": description,
        "recipient": recipient,
        "frequency": frequency,
        "start_local": f"{start_date}T{start_time}",
        "start_at": to_iso(start_at),
    }
    # One-time reminders only ever have one execution, so a limit means nothing
    if frequency != "once":
        remaining = body.get("remaining")
        if remaining is not None and remaining != "":
            remaining = normalize_remaining(remaining)
            if not remaining:
                return None, f"Number of reminders must be a whole number from 1 to {MAX_EXECUTIONS}"
            clean["remaining"] = remaining
            clean["executions_total"] = remaining
    return clean, None


def normalize_remaining(value):
    if isinstance(value, str) and value.strip().isdigit():
        value = int(value.strip())
    if isinstance(value, bool) or not isinstance(value, int) or not 1 <= value <= MAX_EXECUTIONS:
        return None
    return value


def schedule_name(reminder_id, occurrence_iso):
    return f"reminder_{reminder_id}_{from_iso(occurrence_iso).strftime('%Y%m%dT%H%MZ')}"


def to_public(record):
    return {
        "reminder_id": record["key2"],
        "description": record["description"],
        "recipient": record["recipient"],
        "frequency": record["frequency"],
        "status": record["status"],
        "timezone": record["timezone"],
        "next_send_at": record["next_send_at"],
        "next_send_local": from_iso(record["next_send_at"]).astimezone(local_tz()).strftime("%Y-%m-%d %H:%M"),
        # None means the reminder repeats forever
        "remaining": int(record["remaining"]) if "remaining" in record else None,
        "executions_total": int(record["executions_total"]) if "executions_total" in record else None,
    }


def is_client_error(e, code):
    return isinstance(e, ClientError) and e.response.get("Error", {}).get("Code") == code


def get_reminder(key1, key2):
    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": key1, "key2": key2}),
        ConsistentRead=True,
    )
    if "Item" not in response:
        return None
    return dynamo_obj_to_python_obj(response["Item"])


def update_reminder(record, update_expression, condition_expression, values):
    # "status" is a DynamoDB reserved word, so every expression uses #status
    dynamo.update_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": record["key1"], "key2": record["key2"]}),
        UpdateExpression=update_expression,
        ConditionExpression=condition_expression,
        ExpressionAttributeNames={"#status": "status"},
        ExpressionAttributeValues=python_obj_to_dynamo_obj(values),
    )


def ensure_schedule(record, occurrence_iso):
    # Schedule names are deterministic, so creating one that already exists
    # means an earlier attempt (or a racing request) already did the work
    name = schedule_name(record["key2"], occurrence_iso)
    schedule = {
        "ActionAfterCompletion": "DELETE",
        "FlexibleTimeWindow": {"Mode": "OFF"},
        "GroupName": SCHEDULE_GROUP,
        "Name": name,
        "ScheduleExpression": f"at({occurrence_iso.rstrip('Z')})",
        "ScheduleExpressionTimezone": "UTC",
        "State": "ENABLED",
        "Target": {
            "Arn": REMINDER_DISPATCH_LAMBDA_ARN,
            "Input": json.dumps(
                {
                    "reminder_dispatch": {
                        "key1": record["key1"],
                        "key2": record["key2"],
                        "occurrence": occurrence_iso,
                    }
                }
            ),
            "RetryPolicy": {"MaximumRetryAttempts": 3},
            "RoleArn": SMS_SCHEDULER_ROLE_ARN,
        },
    }
    try:
        scheduler.create_schedule(**schedule)
    except ClientError as e:
        if is_client_error(e, "ConflictException"):
            return name
        if not is_client_error(e, "ResourceNotFoundException"):
            raise
        try:
            scheduler.create_schedule_group(Name=SCHEDULE_GROUP)
        except ClientError as e2:
            if not is_client_error(e2, "ConflictException"):
                raise
        try:
            scheduler.create_schedule(**schedule)
        except ClientError as e3:
            if not is_client_error(e3, "ConflictException"):
                raise
    return name


def delete_schedule_quietly(name):
    # A leftover schedule is harmless: the dispatcher ignores any occurrence
    # that doesn't match the reminder's current next_send_at
    if not name:
        return
    try:
        scheduler.delete_schedule(GroupName=SCHEDULE_GROUP, Name=name)
    except Exception as e:
        if not is_client_error(e, "ResourceNotFoundException"):
            log(f"Failed to delete schedule {name}: {e}")


@authenticate
def create_reminder_route(event, user_data, body):
    now = utc_now()
    clean, error = validate_create_body(body, now)
    if error:
        return format_response(event=event, http_code=400, body=error, user_data=user_data)

    record = {
        "key1": reminder_key1(user_data),
        "key2": create_id(32),
        **clean,
        "next_send_at": clean["start_at"],
        "occurrence_index": 0,
        "timezone": TIMEZONE,
        "status": "active",
        "created_at": to_iso(now),
    }
    record["schedule_name"] = schedule_name(record["key2"], record["next_send_at"])
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(record),
        ConditionExpression="attribute_not_exists(key2)",
    )
    try:
        ensure_schedule(record, record["next_send_at"])
    except Exception as e:
        log(f"Failed to schedule reminder {record['key2']}: {e}", user_data)
        dynamo.delete_item(
            TableName=TABLE_NAME,
            Key=python_obj_to_dynamo_obj({"key1": record["key1"], "key2": record["key2"]}),
        )
        return format_response(
            event=event,
            http_code=500,
            body="Failed to schedule the reminder, please try again",
            user_data=user_data,
        )

    return format_response(
        event=event,
        http_code=200,
        body={"reminder": to_public(record)},
        user_data=user_data,
    )


@authenticate
def get_reminders_route(event, user_data, body):
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditionExpression="key1 = :key1",
        ExpressionAttributeValues=python_obj_to_dynamo_obj({":key1": reminder_key1(user_data)}),
    )

    output = []
    for item in response.get("Items", []):
        record = dynamo_obj_to_python_obj(item)
        if record["status"] in ("active", "sending"):
            output.append(to_public(record))
    output.sort(key=lambda r: r["next_send_at"])

    return format_response(
        event=event,
        http_code=200,
        body={"reminders": output},
        user_data=user_data,
    )


@authenticate
def skip_reminder_route(event, user_data, body):
    # Skipping counts as one of the reminder's executions
    return advance_reminder(event, user_data, body, consume=True)


@authenticate
def defer_reminder_route(event, user_data, body):
    # Deferring pushes the reminder back without using up an execution
    return advance_reminder(event, user_data, body, consume=False)


def advance_reminder(event, user_data, body, consume):
    reminder_id = body.get("reminder_id")
    expected = body.get("next_send_at")
    if not isinstance(reminder_id, str) or not reminder_id or not isinstance(expected, str) or not expected:
        return format_response(
            event=event,
            http_code=400,
            body="You must supply a reminder_id and next_send_at",
            user_data=user_data,
        )

    record = get_reminder(reminder_key1(user_data), reminder_id)
    if record is None or record["status"] not in ("active", "sending"):
        return format_response(event=event, http_code=404, body="Reminder not found", user_data=user_data)
    if not consume and record["frequency"] == "once":
        return format_response(
            event=event,
            http_code=400,
            body="One-time reminders can't be deferred",
            user_data=user_data,
        )
    conflict = advance_conflict_response(event, user_data, record, expected)
    if conflict:
        return conflict

    limited = "remaining" in record
    values = {":active": "active", ":occ": expected}
    condition = "#status = :active AND next_send_at = :occ"
    try:
        # A one-time reminder, or a skip that uses the last execution, ends it
        if record["frequency"] == "once" or (consume and limited and int(record["remaining"]) <= 1):
            dynamo.delete_item(
                TableName=TABLE_NAME,
                Key=python_obj_to_dynamo_obj({"key1": record["key1"], "key2": record["key2"]}),
                ConditionExpression=condition,
                ExpressionAttributeNames={"#status": "status"},
                ExpressionAttributeValues=python_obj_to_dynamo_obj(values),
            )
            delete_schedule_quietly(record.get("schedule_name"))
            return format_response(
                event=event,
                http_code=200,
                body={"deleted": True, "reminder_id": reminder_id},
                user_data=user_data,
            )

        # Schedule the following occurrence before committing the skip. If the
        # commit loses a race, the deterministic name means whoever won will
        # want this exact schedule anyway
        index, next_iso = next_future_occurrence(record, utc_now())
        new_name = ensure_schedule(record, next_iso)
        update_expression = "SET next_send_at = :next, occurrence_index = :idx, schedule_name = :name"
        update_values = {**values, ":next": next_iso, ":idx": index, ":name": new_name}
        if consume:
            update_expression += ", last_skipped_at = :occ"
            if limited:
                update_expression += ", remaining = :remaining"
                update_values[":remaining"] = int(record["remaining"]) - 1
        else:
            update_expression += ", last_deferred_at = :occ"
        update_reminder(record, update_expression, condition, update_values)
    except ClientError as e:
        if not is_client_error(e, "ConditionalCheckFailedException"):
            raise
        current = get_reminder(reminder_key1(user_data), reminder_id)
        if current is None:
            return format_response(event=event, http_code=404, body="Reminder not found", user_data=user_data)
        return advance_conflict_response(event, user_data, current, expected) or format_response(
            event=event,
            http_code=409,
            body={"message": "This reminder changed, please refresh", "reminder": to_public(current)},
            user_data=user_data,
        )

    delete_schedule_quietly(record.get("schedule_name"))
    record.update({"next_send_at": next_iso, "occurrence_index": index, "schedule_name": new_name})
    if ":remaining" in update_values:
        record["remaining"] = update_values[":remaining"]
    return format_response(
        event=event,
        http_code=200,
        body={"deleted": False, "reminder": to_public(record)},
        user_data=user_data,
    )


def advance_conflict_response(event, user_data, record, expected):
    if record["status"] == "sending":
        return format_response(
            event=event,
            http_code=409,
            body={"message": "This reminder is already being sent", "reminder": to_public(record)},
            user_data=user_data,
        )
    if record["next_send_at"] != expected:
        return format_response(
            event=event,
            http_code=409,
            body={"message": "That occurrence was already skipped, deferred, or sent", "reminder": to_public(record)},
            user_data=user_data,
        )
    return None


@authenticate
def delete_reminder_route(event, user_data, body):
    reminder_id = body.get("reminder_id")
    if not isinstance(reminder_id, str) or not reminder_id:
        return format_response(event=event, http_code=400, body="You must supply a reminder_id", user_data=user_data)

    deleted_body = {"deleted": True, "reminder_id": reminder_id}
    record = get_reminder(reminder_key1(user_data), reminder_id)
    if record is None:
        return format_response(event=event, http_code=200, body=deleted_body, user_data=user_data)

    # A stuck "sending" claim (dispatcher exhausted its retries) can still be
    # deleted, otherwise the user would have no way to clear it
    try:
        dynamo.delete_item(
            TableName=TABLE_NAME,
            Key=python_obj_to_dynamo_obj({"key1": record["key1"], "key2": record["key2"]}),
            ConditionExpression="#status <> :sending OR sending_started_at < :stuck",
            ExpressionAttributeNames={"#status": "status"},
            ExpressionAttributeValues=python_obj_to_dynamo_obj(
                {":sending": "sending", ":stuck": int(time.time()) - STUCK_SENDING_SECONDS}
            ),
        )
    except ClientError as e:
        if not is_client_error(e, "ConditionalCheckFailedException"):
            raise
        return format_response(
            event=event,
            http_code=409,
            body="This reminder is being sent right now, try again in a moment",
            user_data=user_data,
        )

    delete_schedule_quietly(record.get("schedule_name"))
    return format_response(event=event, http_code=200, body=deleted_body, user_data=user_data)


def dispatch_reminder_event(payload, request_id):
    # Invoked by EventBridge Scheduler, not API Gateway. Exceptions propagate
    # on purpose so Lambda's async retries kick in. Retries of the same async
    # invocation share a request_id, which is how a retry resumes its own claim
    # while a duplicate delivery (different request_id) backs off
    try:
        result = dispatch_occurrence(payload["key1"], payload["key2"], payload["occurrence"], request_id)
        log(f"Reminder dispatch {payload}: {result}")
        return {"result": result}
    except Exception as e:
        log(f"Reminder dispatch {payload} failed: {e}")
        alert_admin_of_dispatch_failure(payload, e)
        raise


def dispatch_occurrence(key1, key2, occurrence, request_id):
    record = get_reminder(key1, key2)
    if record is None:
        return "stale: reminder no longer exists"
    if record["next_send_at"] != occurrence:
        return "stale: occurrence was skipped or already sent"

    claim_condition = "#status = :sending AND next_send_at = :occ AND claim_id = :cid"
    claim_values = {":sending": "sending", ":occ": occurrence, ":cid": request_id}

    if record["status"] == "active":
        try:
            update_reminder(
                record,
                "SET #status = :sending, claim_id = :cid, sending_started_at = :started",
                "#status = :active AND next_send_at = :occ",
                {**claim_values, ":active": "active", ":started": int(time.time())},
            )
        except ClientError as e:
            if not is_client_error(e, "ConditionalCheckFailedException"):
                raise
            return "stale: lost the claim to a skip, delete, or another dispatch"
        record.update({"status": "sending", "claim_id": request_id})
    elif record["status"] != "sending" or record.get("claim_id") != request_id:
        return f"stale: reminder is {record['status']} under another claim"

    # Enqueue and record the enqueue back to back. A retry after this point
    # won't send again; only a crash between these two calls can duplicate
    if record.get("sms_enqueued_for") != occurrence:
        sqs.send_message(
            QueueUrl=SMS_SQS_QUEUE_URL,
            MessageBody=json.dumps({"phone": f"+1{record['recipient']}", "message": record["description"]}),
        )
        update_reminder(record, "SET sms_enqueued_for = :occ", claim_condition, claim_values)

    # Sending uses up one execution. The finalize writes below are conditioned
    # on this invocation's claim, so a retry can't decrement twice
    remaining_set = ""
    remaining_values = {}
    if "remaining" in record:
        remaining_set = ", remaining = :remaining"
        remaining_values = {":remaining": int(record["remaining"]) - 1}

    try:
        if record["frequency"] == "once" or remaining_values.get(":remaining") == 0:
            update_reminder(
                record,
                f"SET #status = :completed, last_sent_at = :occ{remaining_set} REMOVE claim_id, sending_started_at",
                claim_condition,
                {**claim_values, **remaining_values, ":completed": "completed"},
            )
            return "sent, reminder completed"

        # Make sure the next occurrence is scheduled before releasing the claim
        index, next_iso = next_future_occurrence(record, utc_now())
        new_name = ensure_schedule(record, next_iso)
        update_reminder(
            record,
            "SET #status = :active, next_send_at = :next, occurrence_index = :idx, schedule_name = :name, "
            f"last_sent_at = :occ{remaining_set} REMOVE claim_id, sending_started_at",
            claim_condition,
            {
                **claim_values,
                **remaining_values,
                ":active": "active",
                ":next": next_iso,
                ":idx": index,
                ":name": new_name,
            },
        )
        return f"sent, next occurrence {next_iso}"
    except ClientError as e:
        if not is_client_error(e, "ConditionalCheckFailedException"):
            raise
        # Only a delete of a stuck claim can get here, nothing left to do
        return "sent, but the reminder was deleted before it could be advanced"


def alert_admin_of_dispatch_failure(payload, error):
    try:
        sqs.send_message(
            QueueUrl=SMS_SQS_QUEUE_URL,
            MessageBody=json.dumps(
                {
                    "phone": ADMIN_PHONE,
                    "message": f"Preventable reminder dispatch failed for {payload.get('key2')}: {error}",
                }
            ),
        )
    except Exception as e:
        log(f"Failed to alert admin: {e}")
