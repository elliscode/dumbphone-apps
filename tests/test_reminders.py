import datetime
import json
import os
import re
import sys
import unittest
from unittest import mock

os.environ.setdefault("AWS_DEFAULT_REGION", "us-east-1")
os.environ.setdefault("DYNAMODB_TABLE_NAME", "test-table")
os.environ.setdefault("DOMAIN_NAMES", "https://dpa.test")
os.environ.setdefault("SMS_SQS_QUEUE_URL", "https://sqs.test/sms")
os.environ.setdefault("SMS_SCHEDULER_ROLE_ARN", "arn:aws:iam::123:role/scheduler")
os.environ.setdefault("REMINDER_DISPATCH_LAMBDA_ARN", "arn:aws:lambda:us-east-1:123:function:test")
os.environ.setdefault("ADMIN_PHONE", "+15550000000")

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "lambda", "dumbphoneapps-monolith"))

from botocore.exceptions import ClientError  # noqa: E402

from dumbphoneapps import reminders, utils  # noqa: E402
from dumbphoneapps.reminders import to_public  # noqa: E402
from dumbphoneapps.utils import dynamo_obj_to_python_obj, python_obj_to_dynamo_obj  # noqa: E402

UTC = datetime.timezone.utc
NOW = datetime.datetime(2026, 10, 30, 12, 0, tzinfo=UTC)  # 08:00 EDT
USER_A = "2125550001"
USER_B = "2125550002"
MISSING = object()


def client_error(code):
    return ClientError({"Error": {"Code": code, "Message": code}}, "op")


def evaluate_condition(expression, item, names, values):
    tokens = re.findall(r"\(|\)|<>|=|<|[#:\w]+", expression)
    pos = [0]

    def peek():
        return tokens[pos[0]] if pos[0] < len(tokens) else None

    def take():
        pos[0] += 1
        return tokens[pos[0] - 1]

    def operand(token):
        if token.startswith(":"):
            return values[token]
        return item.get(names.get(token, token), MISSING)

    def atom():
        token = take()
        if token == "(":
            result = parse_or()
            take()
            return result
        if token in ("attribute_not_exists", "attribute_exists"):
            take()
            name = take()
            take()
            exists = names.get(name, name) in item
            return exists if token == "attribute_exists" else not exists
        left = operand(token)
        op = take()
        right = operand(take())
        if left is MISSING or right is MISSING:
            return False
        return {"=": left == right, "<>": left != right, "<": left < right}[op]

    def parse_and():
        result = atom()
        while peek() == "AND":
            take()
            result = atom() and result
        return result

    def parse_or():
        result = parse_and()
        while peek() == "OR":
            take()
            result = parse_and() or result
        return result

    return parse_or()


class FakeDynamo:
    def __init__(self):
        self.items = {}
        self.queried_key1s = []
        self.fail_next_update = None

    def _key(self, key):
        key = dynamo_obj_to_python_obj(key)
        return key["key1"], key["key2"]

    def _check(self, item, condition, names, values):
        if condition and not evaluate_condition(
            condition, item or {}, names or {}, dynamo_obj_to_python_obj(values or {})
        ):
            raise client_error("ConditionalCheckFailedException")

    def get_item(self, TableName, Key, ConsistentRead=False):
        item = self.items.get(self._key(Key))
        return {"Item": python_obj_to_dynamo_obj(item)} if item else {}

    def put_item(self, TableName, Item, ConditionExpression=None, ExpressionAttributeNames=None,
                 ExpressionAttributeValues=None):
        item = dynamo_obj_to_python_obj(Item)
        key = (item["key1"], item["key2"])
        self._check(self.items.get(key), ConditionExpression, ExpressionAttributeNames, ExpressionAttributeValues)
        self.items[key] = item

    def delete_item(self, TableName, Key, ConditionExpression=None, ExpressionAttributeNames=None,
                    ExpressionAttributeValues=None):
        key = self._key(Key)
        self._check(self.items.get(key), ConditionExpression, ExpressionAttributeNames, ExpressionAttributeValues)
        self.items.pop(key, None)

    def update_item(self, TableName, Key, UpdateExpression, ConditionExpression=None,
                    ExpressionAttributeNames=None, ExpressionAttributeValues=None):
        if self.fail_next_update and self.fail_next_update in UpdateExpression:
            self.fail_next_update = None
            raise RuntimeError("simulated crash")
        names = ExpressionAttributeNames or {}
        values = dynamo_obj_to_python_obj(ExpressionAttributeValues or {})
        key = self._key(Key)
        item = self.items.get(key)
        self._check(item, ConditionExpression, names, ExpressionAttributeValues)
        item = dict(item or {"key1": key[0], "key2": key[1]})
        set_part, _, remove_part = UpdateExpression.partition(" REMOVE ")
        for assignment in set_part.removeprefix("SET ").split(","):
            name, value = [s.strip() for s in assignment.split("=")]
            item[names.get(name, name)] = values[value]
        for name in filter(None, (s.strip() for s in remove_part.split(","))):
            item.pop(names.get(name, name), None)
        self.items[key] = item

    def query(self, TableName, KeyConditionExpression, ExpressionAttributeValues):
        key1 = dynamo_obj_to_python_obj(ExpressionAttributeValues)[":key1"]
        self.queried_key1s.append(key1)
        return {"Items": [python_obj_to_dynamo_obj(i) for (k1, _), i in self.items.items() if k1 == key1]}


class FakeScheduler:
    def __init__(self):
        self.groups = set()
        self.schedules = {}
        self.fail_next_create = False

    def create_schedule(self, **schedule):
        if self.fail_next_create:
            self.fail_next_create = False
            raise RuntimeError("simulated scheduler outage")
        if schedule["GroupName"] not in self.groups:
            raise client_error("ResourceNotFoundException")
        if schedule["Name"] in self.schedules:
            raise client_error("ConflictException")
        self.schedules[schedule["Name"]] = schedule

    def create_schedule_group(self, Name):
        self.groups.add(Name)

    def delete_schedule(self, GroupName, Name):
        if Name not in self.schedules:
            raise client_error("ResourceNotFoundException")
        del self.schedules[Name]


class FakeSqs:
    def __init__(self):
        self.messages = []

    def send_message(self, QueueUrl, MessageBody):
        self.messages.append(json.loads(MessageBody))


class RemindersTestCase(unittest.TestCase):
    def setUp(self):
        self.dynamo = FakeDynamo()
        self.scheduler = FakeScheduler()
        self.sqs = FakeSqs()
        tokens = {
            f"token-{phone}": {"key2": f"token-{phone}", "csrf": "csrf", "user": phone, "expiration": 2**40}
            for phone in (USER_A, USER_B)
        }
        patches = [
            mock.patch.object(reminders, "dynamo", self.dynamo),
            mock.patch.object(reminders, "scheduler", self.scheduler),
            mock.patch.object(reminders, "sqs", self.sqs),
            mock.patch.object(reminders, "utc_now", lambda: NOW),
            mock.patch.object(reminders.time, "time", lambda: NOW.timestamp()),
            mock.patch.object(utils, "get_token", lambda t: tokens.get(t)),
            mock.patch.object(utils, "get_active_tokens", lambda user: {"tokens": {f"token-{user}": 2**40}}),
            mock.patch.object(utils, "get_user_data", lambda user: {"key1": "user", "key2": user}),
        ]
        for p in patches:
            p.start()
            self.addCleanup(p.stop)

    def call(self, route, body, user=USER_A):
        event = {
            "headers": {"cookie": f"dumbphoneapps-auth-token=token-{user}", "origin": "https://dpa.test"},
            "body": json.dumps({"csrf": "csrf", **body}),
        }
        response = route(event)
        return response["statusCode"], json.loads(response["body"])

    def create(self, user=USER_A, **overrides):
        body = {
            "description": "Walk the dog",
            "recipient": "(212) 555-9999",
            "frequency": "daily",
            "start_date": "2026-11-02",
            "start_time": "08:00",
            **overrides,
        }
        return self.call(reminders.create_reminder_route, body, user)

    def get(self, user=USER_A):
        return self.call(reminders.get_reminders_route, {}, user)

    def skip(self, reminder, user=USER_A, next_send_at=None):
        body = {"reminder_id": reminder["reminder_id"], "next_send_at": next_send_at or reminder["next_send_at"]}
        return self.call(reminders.skip_reminder_route, body, user)

    def defer(self, reminder, user=USER_A, next_send_at=None):
        body = {"reminder_id": reminder["reminder_id"], "next_send_at": next_send_at or reminder["next_send_at"]}
        return self.call(reminders.defer_reminder_route, body, user)

    def delete(self, reminder_id, user=USER_A):
        return self.call(reminders.delete_reminder_route, {"reminder_id": reminder_id}, user)

    def record(self, reminder, user=USER_A):
        return self.dynamo.items.get((f"reminder_{user}", reminder["reminder_id"]))

    def payload_for(self, reminder):
        name = reminders.schedule_name(reminder["reminder_id"], reminder["next_send_at"])
        return json.loads(self.scheduler.schedules[name]["Target"]["Input"])["reminder_dispatch"]

    def fire(self, payload, request_id="req-1"):
        return reminders.dispatch_reminder_event(payload, request_id)

    def user_sms(self):
        return [m for m in self.sqs.messages if m["phone"] != os.environ["ADMIN_PHONE"]]


class CreateTests(RemindersTestCase):
    def test_create_each_frequency(self):
        for frequency in reminders.FREQUENCIES:
            status, body = self.create(frequency=frequency)
            self.assertEqual(status, 200, body)
            reminder = body["reminder"]
            self.assertEqual(reminder["frequency"], frequency)
            self.assertEqual(reminder["recipient"], "2125559999")
            self.assertEqual(reminder["next_send_at"], "2026-11-02T13:00:00Z")
            self.assertEqual(reminder["next_send_local"], "2026-11-02 08:00")
            self.assertEqual(self.record(reminder)["status"], "active")
            name = reminders.schedule_name(reminder["reminder_id"], reminder["next_send_at"])
            schedule = self.scheduler.schedules[name]
            self.assertEqual(schedule["ScheduleExpression"], "at(2026-11-02T13:00:00)")
            self.assertEqual(schedule["GroupName"], "preventable-reminders")
        self.assertEqual(len(self.scheduler.schedules), 5)

    def test_rejects_invalid_phone_numbers(self):
        for recipient in ["555-1234", "123456789012", "0125559999", "abcdefghij", ""]:
            status, body = self.create(recipient=recipient)
            self.assertEqual(status, 400, recipient)
            self.assertIn("phone", body["message"])
        self.assertEqual(self.dynamo.items, {})

    def test_accepts_leading_country_code(self):
        status, body = self.create(recipient="+1 212 555 9999")
        self.assertEqual(body["reminder"]["recipient"], "2125559999")

    def test_rejects_invalid_frequency(self):
        status, body = self.create(frequency="hourly")
        self.assertEqual(status, 400)
        self.assertIn("Frequency", body["message"])

    def test_rejects_past_dates(self):
        status, body = self.create(start_date="2026-10-30", start_time="07:59")
        self.assertEqual(status, 400)
        self.assertIn("future", body["message"])
        status, _ = self.create(start_date="2026-10-30", start_time="08:01")
        self.assertEqual(status, 200)

    def test_rejects_missing_or_malformed_fields(self):
        for overrides in [
            {"description": "   "},
            {"description": "x" * 501},
            {"start_date": "2026-13-01"},
            {"start_date": None},
            {"start_time": "8am"},
            {"start_time": "25:00"},
        ]:
            status, _ = self.create(**overrides)
            self.assertEqual(status, 400, overrides)

    def test_timezone_conversion(self):
        self.assertEqual(reminders.to_iso(reminders.local_start_to_utc("2026-10-31", "08:00")), "2026-10-31T12:00:00Z")
        self.assertEqual(reminders.to_iso(reminders.local_start_to_utc("2026-11-15", "08:00")), "2026-11-15T13:00:00Z")
        # 02:30 doesn't exist on spring-forward day; it lands at 03:30 EDT
        self.assertEqual(reminders.to_iso(reminders.local_start_to_utc("2027-03-14", "02:30")), "2027-03-14T07:30:00Z")

    def test_schedule_failure_rolls_back(self):
        self.scheduler.fail_next_create = True
        status, _ = self.create()
        self.assertEqual(status, 500)
        self.assertEqual(self.dynamo.items, {})


class GetTests(RemindersTestCase):
    def test_returns_active_sorted_and_isolated(self):
        _, late = self.create(description="late", start_date="2026-12-01")
        _, early = self.create(description="early", start_date="2026-11-01")
        _, done = self.create(description="done", frequency="once", start_date="2026-11-05")
        self.create(user=USER_B, description="someone else")
        self.record(done["reminder"])["status"] = "completed"

        status, body = self.get()
        self.assertEqual(status, 200)
        self.assertEqual([r["description"] for r in body["reminders"]], ["early", "late"])
        self.assertEqual(self.dynamo.queried_key1s, [f"reminder_{USER_A}"])

        _, body = self.get(user=USER_B)
        self.assertEqual([r["description"] for r in body["reminders"]], ["someone else"])


class SkipTests(RemindersTestCase):
    def test_skip_once_deletes_reminder_and_schedule(self):
        _, body = self.create(frequency="once")
        reminder = body["reminder"]
        status, body = self.skip(reminder)
        self.assertEqual(status, 200)
        self.assertTrue(body["deleted"])
        self.assertIsNone(self.record(reminder))
        self.assertEqual(self.scheduler.schedules, {})

    def test_skip_recurring_advances_one_occurrence(self):
        _, body = self.create(frequency="daily")
        reminder = body["reminder"]
        status, body = self.skip(reminder)
        self.assertEqual(status, 200)
        self.assertEqual(body["reminder"]["next_send_local"], "2026-11-03 08:00")
        record = self.record(reminder)
        self.assertEqual(record["status"], "active")
        self.assertEqual(record["occurrence_index"], 1)
        self.assertEqual(record["last_skipped_at"], "2026-11-02T13:00:00Z")
        name = reminders.schedule_name(reminder["reminder_id"], "2026-11-03T13:00:00Z")
        self.assertEqual(list(self.scheduler.schedules), [name])

    def test_repeated_skip_does_not_double_advance(self):
        _, body = self.create(frequency="weekly")
        reminder = body["reminder"]
        self.assertEqual(self.skip(reminder)[0], 200)
        status, body = self.skip(reminder)
        self.assertEqual(status, 409)
        self.assertEqual(body["reminder"]["next_send_local"], "2026-11-09 08:00")
        self.assertEqual(self.record(reminder)["occurrence_index"], 1)

    def test_skip_while_sending_is_rejected(self):
        _, body = self.create()
        reminder = body["reminder"]
        self.record(reminder)["status"] = "sending"
        status, body = self.skip(reminder)
        self.assertEqual(status, 409)
        self.assertIn("being sent", body["message"])
        self.assertEqual(self.record(reminder)["next_send_at"], reminder["next_send_at"])

    def test_skip_loses_race_to_dispatch_claim(self):
        _, body = self.create()
        reminder = body["reminder"]
        payload = self.payload_for(reminder)
        real_get = reminders.get_reminder
        calls = []

        def get_then_dispatch(key1, key2):
            # The skip reads the reminder as active, then the dispatch claims
            # it before the skip's conditional write lands
            snapshot = real_get(key1, key2)
            if not calls:
                calls.append(1)
                self.dynamo.fail_next_update = "last_sent_at"
                with self.assertRaises(RuntimeError):
                    self.fire(payload, "req-1")
            return snapshot

        with mock.patch.object(reminders, "get_reminder", get_then_dispatch):
            status, body = self.skip(reminder)
        self.assertEqual(status, 409)
        self.assertIn("being sent", body["message"])
        self.assertEqual(self.record(reminder)["occurrence_index"], 0)
        self.assertEqual(len(self.user_sms()), 1)

    def test_skip_other_users_reminder_is_not_found(self):
        _, body = self.create(user=USER_B)
        reminder = body["reminder"]
        status, _ = self.skip(reminder, user=USER_A)
        self.assertEqual(status, 404)
        self.assertEqual(self.record(reminder, user=USER_B)["occurrence_index"], 0)

    def test_old_event_after_skip_does_not_send(self):
        _, body = self.create()
        reminder = body["reminder"]
        payload = self.payload_for(reminder)
        self.skip(reminder)
        self.assertTrue(self.fire(payload)["result"].startswith("stale"))
        self.assertEqual(self.sqs.messages, [])


class DeleteTests(RemindersTestCase):
    def test_delete_once_and_recurring(self):
        for frequency in ("once", "monthly"):
            _, body = self.create(frequency=frequency)
            reminder = body["reminder"]
            status, body = self.delete(reminder["reminder_id"])
            self.assertEqual(status, 200)
            self.assertTrue(body["deleted"])
            self.assertIsNone(self.record(reminder))
        self.assertEqual(self.scheduler.schedules, {})

    def test_delete_twice_is_ok(self):
        _, body = self.create()
        reminder_id = body["reminder"]["reminder_id"]
        self.assertEqual(self.delete(reminder_id)[0], 200)
        self.assertEqual(self.delete(reminder_id)[0], 200)

    def test_delete_while_sending_is_rejected_unless_stuck(self):
        _, body = self.create()
        reminder = body["reminder"]
        record = self.record(reminder)
        record.update({"status": "sending", "sending_started_at": int(NOW.timestamp()) - 60})
        status, _ = self.delete(reminder["reminder_id"])
        self.assertEqual(status, 409)
        self.assertEqual(self.record(reminder)["status"], "sending")
        record["sending_started_at"] = int(NOW.timestamp()) - reminders.STUCK_SENDING_SECONDS - 1
        self.assertEqual(self.delete(reminder["reminder_id"])[0], 200)
        self.assertIsNone(self.record(reminder))

    def test_delete_other_users_reminder_leaves_it_alone(self):
        _, body = self.create(user=USER_B)
        reminder = body["reminder"]
        self.assertEqual(self.delete(reminder["reminder_id"], user=USER_A)[0], 200)
        self.assertIsNotNone(self.record(reminder, user=USER_B))
        self.assertEqual(len(self.scheduler.schedules), 1)

    def test_leftover_event_after_delete_does_not_send(self):
        _, body = self.create()
        reminder = body["reminder"]
        payload = self.payload_for(reminder)
        self.delete(reminder["reminder_id"])
        self.assertTrue(self.fire(payload)["result"].startswith("stale"))
        self.assertEqual(self.sqs.messages, [])


class RecurrenceTests(unittest.TestCase):
    def occ(self, start_local, frequency, n):
        return reminders.to_iso(reminders.nth_occurrence_utc(start_local, frequency, n))

    def test_daily_keeps_local_time_across_dst(self):
        self.assertEqual(self.occ("2026-10-30T08:00", "daily", 0), "2026-10-30T12:00:00Z")
        self.assertEqual(self.occ("2026-10-30T08:00", "daily", 3), "2026-11-02T13:00:00Z")
        self.assertEqual(self.occ("2027-03-13T08:00", "daily", 0), "2027-03-13T13:00:00Z")
        self.assertEqual(self.occ("2027-03-13T08:00", "daily", 1), "2027-03-14T12:00:00Z")

    def test_weekly_keeps_weekday(self):
        for n in range(10):
            occurrence = reminders.nth_occurrence_utc("2026-11-03T18:00", "weekly", n).astimezone(reminders.local_tz())
            self.assertEqual(occurrence.weekday(), 1)
            self.assertEqual(occurrence.hour, 18)

    def test_monthly_clamps_without_drifting(self):
        self.assertEqual(self.occ("2027-01-31T09:00", "monthly", 1)[:10], "2027-02-28")
        self.assertEqual(self.occ("2027-01-31T09:00", "monthly", 2)[:10], "2027-03-31")
        self.assertEqual(self.occ("2027-01-31T09:00", "monthly", 3)[:10], "2027-04-30")
        self.assertEqual(self.occ("2028-01-31T09:00", "monthly", 1)[:10], "2028-02-29")

    def test_yearly_handles_leap_day(self):
        self.assertEqual(self.occ("2028-02-29T09:00", "yearly", 1)[:10], "2029-02-28")
        self.assertEqual(self.occ("2028-02-29T09:00", "yearly", 4)[:10], "2032-02-29")

    def test_once_has_single_occurrence(self):
        with self.assertRaises(ValueError):
            reminders.nth_occurrence_utc("2026-11-03T18:00", "once", 1)

    def test_next_future_occurrence_skips_past_occurrences(self):
        record = {"start_local": "2026-10-01T08:00", "frequency": "daily", "occurrence_index": 0}
        # NOW is exactly 2026-10-30 08:00 EDT, so the next future one is the 31st
        self.assertEqual(reminders.next_future_occurrence(record, NOW), (30, "2026-10-31T12:00:00Z"))


class MonthEndTests(RemindersTestCase):
    def test_monthly_on_31st_survives_february(self):
        _, body = self.create(frequency="monthly", start_date="2026-12-31", start_time="09:00")
        reminder = body["reminder"]
        seen = [reminder["next_send_local"]]

        # Advance through every path that moves a reminder forward, so the stored
        # state (not just the date math) has to carry the 31st past February
        steps = ["skip", "send", "defer", "send", "skip"]
        for i, step in enumerate(steps):
            if step == "skip":
                _, body = self.skip(reminder)
                reminder = body["reminder"]
            elif step == "defer":
                _, body = self.defer(reminder)
                reminder = body["reminder"]
            else:
                self.fire(self.payload_for(reminder), f"req-{i}")
                reminder = to_public(self.record(reminder))
            seen.append(reminder["next_send_local"])

        self.assertEqual(
            seen,
            [
                "2026-12-31 09:00",
                "2027-01-31 09:00",
                "2027-02-28 09:00",  # clamped, 2027 isn't a leap year
                "2027-03-31 09:00",  # back to the 31st, not stuck on the 28th
                "2027-04-30 09:00",
                "2027-05-31 09:00",
            ],
        )
        self.assertEqual(len(self.user_sms()), 2)


class DispatchTests(RemindersTestCase):
    def test_recurring_sends_and_schedules_next(self):
        _, body = self.create(frequency="daily")
        reminder = body["reminder"]
        self.fire(self.payload_for(reminder))
        self.assertEqual(self.user_sms(), [{"phone": "+12125559999", "message": "Walk the dog"}])
        record = self.record(reminder)
        self.assertEqual(record["status"], "active")
        self.assertEqual(record["next_send_at"], "2026-11-03T13:00:00Z")
        self.assertEqual(record["last_sent_at"], "2026-11-02T13:00:00Z")
        self.assertNotIn("claim_id", record)
        name = reminders.schedule_name(reminder["reminder_id"], "2026-11-03T13:00:00Z")
        self.assertIn(name, self.scheduler.schedules)

    def test_once_is_completed(self):
        _, body = self.create(frequency="once")
        reminder = body["reminder"]
        self.fire(self.payload_for(reminder))
        self.assertEqual(len(self.user_sms()), 1)
        self.assertEqual(self.record(reminder)["status"], "completed")
        self.assertEqual(self.get()[1]["reminders"], [])

    def test_duplicate_invocation_sends_once(self):
        _, body = self.create()
        payload = self.payload_for(body["reminder"])
        self.fire(payload, "req-1")
        self.assertTrue(self.fire(payload, "req-2")["result"].startswith("stale"))
        self.assertTrue(self.fire(payload, "req-1")["result"].startswith("stale"))
        self.assertEqual(len(self.user_sms()), 1)

    def test_retry_after_crash_resumes_without_resending(self):
        _, body = self.create()
        reminder = body["reminder"]
        payload = self.payload_for(reminder)
        # Crash after the SMS is enqueued, while scheduling the next occurrence
        self.scheduler.fail_next_create = True
        with self.assertRaises(RuntimeError):
            self.fire(payload, "req-1")
        self.assertEqual(self.record(reminder)["status"], "sending")
        self.assertEqual(len(self.user_sms()), 1)
        self.assertEqual(len(self.sqs.messages), 2)  # the admin alert

        # A different delivery of the same event backs off while the claim is held
        self.assertTrue(self.fire(payload, "req-2")["result"].startswith("stale"))
        # Skip and delete both refuse while it's mid-send
        self.assertEqual(self.skip(reminder)[0], 409)
        self.assertEqual(self.delete(reminder["reminder_id"])[0], 409)

        # Lambda's retry of the original invocation finishes the job
        self.fire(payload, "req-1")
        self.assertEqual(len(self.user_sms()), 1)
        self.assertEqual(self.record(reminder)["status"], "active")
        self.assertEqual(self.record(reminder)["next_send_at"], "2026-11-03T13:00:00Z")

    def test_retry_after_crash_before_finalize(self):
        _, body = self.create()
        reminder = body["reminder"]
        payload = self.payload_for(reminder)
        self.dynamo.fail_next_update = "last_sent_at"
        with self.assertRaises(RuntimeError):
            self.fire(payload, "req-1")
        self.fire(payload, "req-1")
        self.assertEqual(len(self.user_sms()), 1)
        self.assertEqual(self.record(reminder)["next_send_at"], "2026-11-03T13:00:00Z")


class ExecutionLimitTests(RemindersTestCase):
    def test_create_stores_limit(self):
        status, body = self.create(remaining="40", frequency="weekly")
        self.assertEqual(status, 200, body)
        self.assertEqual((body["reminder"]["remaining"], body["reminder"]["executions_total"]), (40, 40))
        self.assertEqual(self.record(body["reminder"])["remaining"], 40)

    def test_blank_limit_is_unlimited(self):
        for remaining in ("", None):
            _, body = self.create(remaining=remaining)
            self.assertIsNone(body["reminder"]["remaining"])
            self.assertNotIn("remaining", self.record(body["reminder"]))

    def test_rejects_bad_limits(self):
        for remaining in (0, -1, 1001, "abc", "1.5", True):
            status, body = self.create(remaining=remaining)
            self.assertEqual(status, 400, remaining)
            self.assertIn("Number of reminders", body["message"])

    def test_limit_ignored_for_once(self):
        _, body = self.create(frequency="once", remaining=5)
        self.assertIsNone(body["reminder"]["remaining"])

    def test_skip_decrements_then_ends(self):
        _, body = self.create(remaining=2)
        reminder = body["reminder"]
        status, body = self.skip(reminder)
        self.assertEqual(status, 200)
        self.assertEqual(body["reminder"]["remaining"], 1)
        status, body = self.skip(body["reminder"])
        self.assertEqual(status, 200)
        self.assertTrue(body["deleted"])
        self.assertIsNone(self.record(reminder))
        self.assertEqual(self.scheduler.schedules, {})

    def test_skip_unlimited_keeps_no_limit(self):
        _, body = self.create()
        _, body = self.skip(body["reminder"])
        self.assertIsNone(body["reminder"]["remaining"])
        self.assertNotIn("remaining", self.record(body["reminder"]))

    def test_send_decrements_then_completes(self):
        _, body = self.create(remaining=2)
        reminder = body["reminder"]
        self.fire(self.payload_for(reminder))
        record = self.record(reminder)
        self.assertEqual((record["status"], record["remaining"]), ("active", 1))
        self.fire(self.payload_for(to_public(record)), "req-2")
        record = self.record(reminder)
        self.assertEqual((record["status"], record["remaining"]), ("completed", 0))
        self.assertEqual(len(self.user_sms()), 2)
        # Only the two schedules that fired exist (the fake doesn't auto-delete); no third was created
        self.assertEqual(len(self.scheduler.schedules), 2)

    def test_send_retry_does_not_double_decrement(self):
        _, body = self.create(remaining=3)
        reminder = body["reminder"]
        payload = self.payload_for(reminder)
        self.scheduler.fail_next_create = True
        with self.assertRaises(RuntimeError):
            self.fire(payload, "req-1")
        self.fire(payload, "req-1")
        self.fire(payload, "req-1")
        self.assertEqual(self.record(reminder)["remaining"], 2)
        self.assertEqual(len(self.user_sms()), 1)


class DeferTests(RemindersTestCase):
    def test_defer_advances_without_using_an_execution(self):
        _, body = self.create(remaining=3)
        reminder = body["reminder"]
        status, body = self.defer(reminder)
        self.assertEqual(status, 200)
        self.assertEqual(body["reminder"]["next_send_local"], "2026-11-03 08:00")
        self.assertEqual(body["reminder"]["remaining"], 3)
        record = self.record(reminder)
        self.assertEqual(record["last_deferred_at"], "2026-11-02T13:00:00Z")
        self.assertNotIn("last_skipped_at", record)
        name = reminders.schedule_name(reminder["reminder_id"], "2026-11-03T13:00:00Z")
        self.assertEqual(list(self.scheduler.schedules), [name])

    def test_defer_last_execution_keeps_reminder(self):
        _, body = self.create(remaining=1)
        status, body = self.defer(body["reminder"])
        self.assertEqual(status, 200)
        self.assertFalse(body["deleted"])
        self.assertEqual(body["reminder"]["remaining"], 1)

    def test_defer_once_is_rejected(self):
        _, body = self.create(frequency="once")
        reminder = body["reminder"]
        status, body = self.defer(reminder)
        self.assertEqual(status, 400)
        self.assertEqual(self.record(reminder)["next_send_at"], reminder["next_send_at"])

    def test_repeated_defer_does_not_double_advance(self):
        _, body = self.create()
        reminder = body["reminder"]
        self.assertEqual(self.defer(reminder)[0], 200)
        self.assertEqual(self.defer(reminder)[0], 409)
        self.assertEqual(self.record(reminder)["occurrence_index"], 1)

    def test_old_event_after_defer_does_not_send(self):
        _, body = self.create()
        reminder = body["reminder"]
        payload = self.payload_for(reminder)
        self.defer(reminder)
        self.assertTrue(self.fire(payload)["result"].startswith("stale"))
        self.assertEqual(self.sqs.messages, [])

    def test_dead_mans_switch(self):
        _, body = self.create(remaining=1, description="I lost my phone")
        reminder = body["reminder"]
        for _ in range(3):
            status, body = self.defer(reminder)
            self.assertEqual(status, 200)
            reminder = body["reminder"]
        self.assertEqual(reminder["next_send_local"], "2026-11-05 08:00")
        self.assertEqual(reminder["remaining"], 1)
        # The day it isn't deferred, it sends once and is done
        self.fire(self.payload_for(reminder))
        self.assertEqual([m["message"] for m in self.user_sms()], ["I lost my phone"])
        self.assertEqual(self.record(reminder)["status"], "completed")
        # Only the schedule that just fired remains (the fake doesn't auto-delete); nothing new was scheduled
        name = reminders.schedule_name(reminder["reminder_id"], reminder["next_send_at"])
        self.assertEqual(list(self.scheduler.schedules), [name])
        self.assertEqual(self.get()[1]["reminders"], [])


if __name__ == "__main__":
    unittest.main()
