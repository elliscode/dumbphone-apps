import json
import urllib
import re
from .grocery_list import (
    additem,
)
from .utils import sqs, get_user_data, ADMIN_PHONE


def twilio_route(event):
    print(event)

    parsed_body = urllib.parse.parse_qs(event["body"])

    print(parsed_body)

    from_number = parsed_body["From"][0]

    if not re.compile("^\\+1\\d{10}$").match(from_number):
        message = {
            "phone": ADMIN_PHONE,
            "message": f"Received a text message from {from_number} which is not valid",
        }
        print(message)
        return {
            "statusCode": 200,
            "body": "<Response/>",
            "headers": {
                "Content-Type": "application/xml",
            },
        }

    print(f"Received a text message from {from_number}, checking if account exists...")

    username = from_number[2:]

    user_data = get_user_data(username)

    print(user_data)

    if not user_data:
        message = {
            "phone": from_number,
            "message": f"You do not have an account, please sign up at dumbphoneapps.com",
        }
        print(message)
        sqs.send_message(
            QueueUrl="https://sqs.us-east-1.amazonaws.com/646933935516/smsQueue",
            MessageBody=json.dumps(message),
        )
        return {
            "statusCode": 200,
            "body": "<Response/>",
            "headers": {
                "Content-Type": "application/xml",
            },
        }

    msg_text = parsed_body["Body"][0]

    print(msg_text)

    count = 0
    for line in msg_text.split("\n"):
        parts = line.split(",", 1)
        if len(parts) == 1:
            group = "Groceries"
            item = parts[0].strip()
        else:
            group = parts[0].strip()
            item = parts[1].strip()

        if not item:
            continue

        event = {}
        event["headers"] = {}
        event["headers"]["origin"] = ""

        add_response = additem(event, user_data, {"name": group, "item": item})

        print(add_response)

        count = count + 1

    message = {"phone": from_number, "message": f"Successfully added {count} items"}
    print(message)
    sqs.send_message(
        QueueUrl="https://sqs.us-east-1.amazonaws.com/646933935516/smsQueue",
        MessageBody=json.dumps(message),
    )

    return {
        "statusCode": 200,
        "body": "<Response/>",
        "headers": {
            "Content-Type": "application/xml",
        },
    }
