import json
import os
import re
import time
import urllib

from .grocery_list import (
    additem,
)
from .notes import parse_message_as_note
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
    boto3,
    SMS_SQS_QUEUE_URL,
)

sts_connection = boto3.client("sts")

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
PRESIGNED_AWS_ACCESS_KEY_ID = os.environ.get("PRESIGNED_AWS_ACCESS_KEY_ID")
PRESIGNED_AWS_SECRET_ACCESS_KEY = os.environ.get("PRESIGNED_AWS_SECRET_ACCESS_KEY")

CONTENT_TYPES = {
    "mov": "video/quicktime",
    "mp4": "video/mp4",
    "3gp": "video/3gpp",
    "png": "image/png",
    "jpg": "image/jpg",
    "jpeg": "image/jpg",
    "gif": "image/gif",
}


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
            QueueUrl=SMS_SQS_QUEUE_URL,
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

    message = parse_message_as_note(msg_text, user_data, from_number)

    print(message)
    sqs.send_message(
        QueueUrl=SMS_SQS_QUEUE_URL,
        MessageBody=json.dumps(message),
    )

    return {
        "statusCode": 200,
        "body": "<Response/>",
        "headers": {
            "Content-Type": "application/xml",
        },
    }


def parse_message_as_grocery_items(msg_text, from_number):
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

        add_response = additem(event, {"key2": from_number}, {"name": group, "item": item})

        print(add_response)

        count = count + 1

    return {"phone": from_number, "message": f"Successfully added {count} items"}


@authenticate
def gather_uploaded_items_route(event, user_data, body):
    phone = user_data["key2"]
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            "key1": {
                "AttributeValueList": [{"S": f"uploaded_file_{phone}"}],
                "ComparisonOperator": "EQ",
            },
        },
    )

    output = []

    if "Items" in response:
        for item in response["Items"]:
            python_item = dynamo_obj_to_python_obj(item)
            file_name = python_item["name"]
            upload_date = python_item["key2"]
            output.append({"name": file_name, "uploadDate": upload_date})

    return format_response(
        event=event,
        http_code=200,
        body={"files": output},
    )


@authenticate
def generate_presigned_post(event, user_data, body):
    extension = body.get("extension", "").lower()
    phone = user_data["key2"]
    if extension not in ["jpg", "png", "3gp", "jpeg", "mp4", "mov", "gif"]:
        return format_response(
            event=event,
            http_code=400,
            body=f"Invalid extension supplied {extension}",
        )
    s3 = boto3.client(
        "s3",
        aws_access_key_id=PRESIGNED_AWS_ACCESS_KEY_ID,
        aws_secret_access_key=PRESIGNED_AWS_SECRET_ACCESS_KEY,
    )

    try:
        file_name = create_id(10)
        response = s3.generate_presigned_post(
            Bucket="dumbphoneapps-user-space",
            Key=f"{file_name}.{extension}",
            ExpiresIn=600,
            Fields={"Content-Type": CONTENT_TYPES[extension]},
            Conditions=[["starts-with", "$Content-Type", ""]],
        )
        print("Got presigned POST URL: %s", response["url"])
        return format_response(
            event=event,
            http_code=200,
            body=response,
        )
    except Exception as e:
        print(e)
        print(
            "Couldn't get a presigned POST URL",
        )
    return format_response(
        event=event,
        http_code=500,
        body="Could not create a presigned url",
    )


@authenticate
def acknowledge_presigned_post_success_route(event, user_data, body):
    phone = user_data["key2"]

    file_name = body.get("fullFileName", None)

    if not file_name:
        return format_response(
            event=event,
            http_code=400,
            body="You did not supply a fullFileName in your POST body",
        )

    acknowledge_time = int(time.time())
    expiration_time = acknowledge_time + (7 * 24 * 60 * 60)

    uploaded_file_entry = {
        "key1": f"uploaded_file_{phone}",
        "key2": f"{acknowledge_time:d}",
        "name": f"{file_name}",
        "expiration": int(expiration_time),
    }

    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(uploaded_file_entry),
    )

    return format_response(
        event=event,
        http_code=200,
        body="Successfully acknowledged the post",
    )


def generate_presigned_get(event):
    body = json.loads(event["body"])
    print(body)
    data_id = body.get("id", "")
    s3 = boto3.client(
        "s3",
        aws_access_key_id=PRESIGNED_AWS_ACCESS_KEY_ID,
        aws_secret_access_key=PRESIGNED_AWS_SECRET_ACCESS_KEY,
    )

    try:
        object_key = f"{data_id}"
        view_url = s3.generate_presigned_url(
            "get_object",
            Params={
                "Bucket": "dumbphoneapps-user-space",
                "Key": object_key,
            },
            ExpiresIn=600,
        )
        download_url = s3.generate_presigned_url(
            "get_object",
            Params={
                "Bucket": "dumbphoneapps-user-space",
                "Key": object_key,
                "ResponseContentDisposition": "attachment",
            },
            ExpiresIn=600,
        )

        return format_response(
            event=event,
            http_code=200,
            body={"url": view_url, "download_url": download_url},
        )
    except Exception as e:
        print(e)
        print("Couldn't get a presigned GET URL")
    return format_response(
        event=event,
        http_code=500,
        body="Could not create a presigned url",
    )
