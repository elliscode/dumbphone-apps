import os
import json
import urllib
import re
from .grocery_list import (
    additem,
)
from .utils import (
    sqs,
    get_user_data,
    ADMIN_PHONE,
    authenticate,
    create_id,
    format_response,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    dynamo_obj_to_python_obj,
)
import time

GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]


def get_maps_key_route(event):
    body = json.loads(event["body"])
    print(body)
    location_token = body.get("locationToken")
    if location_token and re.compile(r"[a-zA-Z0-9]{10}").match(location_token):
        pass
    else:
        return format_response(
            event=event,
            http_code=404,
            body={"key": None, "message": "Location token not found"},
        )

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "location", "key2": location_token}),
    )

    if "Item" not in response:
        return format_response(
            event=event,
            http_code=404,
            body="Location token not found",
        )

    return format_response(
        event=event,
        http_code=200,
        body={"key": GOOGLE_API_KEY},
    )


def get_location_route(event):
    body = json.loads(event["body"])
    print(body)
    location_token = body.get("locationToken")
    if location_token and re.compile(r"[a-zA-Z0-9]{10}").match(location_token):
        pass
    else:
        return format_response(
            event=event,
            http_code=404,
            body="Location token not found",
        )

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "location", "key2": location_token}),
    )

    if "Item" not in response:
        return format_response(
            event=event,
            http_code=404,
            body="Location token not found",
        )

    location_data = dynamo_obj_to_python_obj(response["Item"])

    if "expiration" in location_data and location_data["expiration"] < int(time.time()):
        return format_response(
            event=event,
            http_code=404,
            body="Location token not found",
        )

    return format_response(
        event=event,
        http_code=200,
        body={
            "locationToken": location_token,
            "lat": location_data["lat"],
            "lon": location_data["lon"],
        },
    )


@authenticate
def share_location_route(event, user_data, body):
    print(body)
    location_token = body.get("locationToken")
    if location_token and re.compile(r"[a-zA-Z0-9]{10}").match(location_token):
        pass
    else:
        location_token = create_id(10)

    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(
            {
                "key1": "location",
                "key2": location_token,
                "lat": str(body["lat"]),
                "lon": str(body["lon"]),
                "expiration": int(time.time()) + (60 * 60),
            }
        ),
    )

    return format_response(
        event=event,
        http_code=200,
        body={"locationToken": location_token},
    )


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
