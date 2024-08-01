import json
import re

from .utils import (
    format_response,
    authenticate,
    SMS_SQS_QUEUE_ARN,
    SMS_SCHEDULER_ROLE_ARN,
    scheduler,
)


@authenticate
def schedule_sms_route(event, user_data, body):
    time_to_send = body["time"]
    if not time_to_send or not re.compile(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}").match(time_to_send):
        return format_response(
            event=event,
            http_code=400,
            body="You must supply a time in the format yyyy-mm-ddThh:mm:ss",
        )
    message_text = body["message"]
    if not message_text:
        return format_response(
            event=event,
            http_code=400,
            body="You must supply a message",
        )
    message_dict = {
        "phone": user_data["key2"],
        "message": message_text,
    }
    message_to_send = json.dumps(message_dict)
    schedule_name = f"schedule_{user_data['key2']}_{re.sub(r'[^a-z0-9]','_', time_to_send)}"
    group_name = f"schedule_group_{user_data['key2']}"
    try:
        response = scheduler.get_schedule_group(Name=group_name)
    except Exception as e:
        response = scheduler.create_schedule_group(Name=group_name)
    response = scheduler.create_schedule(
        ActionAfterCompletion="DELETE",
        FlexibleTimeWindow={
            "Mode": "OFF",
        },
        GroupName=group_name,
        Name=schedule_name,
        ScheduleExpression=f"at({time_to_send})",
        State="ENABLED",
        Target={
            "Arn": SMS_SQS_QUEUE_ARN,
            "Input": message_to_send,
            "RetryPolicy": {
                "MaximumRetryAttempts": 0,
            },
            "RoleArn": SMS_SCHEDULER_ROLE_ARN,
        },
    )

    return format_response(
        event=event,
        http_code=200,
        body=f"Scheduled a message for {time_to_send} {response['ScheduleArn']}",
    )


@authenticate
def get_sms_schedules_route(event, user_data, body):
    pass
