from .dumbphoneapps_logger import log

import json
import os
import re
import time
import urllib
import urllib3

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
from .input_validation import (
    validate_date,
)

sts_connection = boto3.client("sts")

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
PRESIGNED_AWS_ACCESS_KEY_ID = os.environ.get("PRESIGNED_AWS_ACCESS_KEY_ID")
PRESIGNED_AWS_SECRET_ACCESS_KEY = os.environ.get("PRESIGNED_AWS_SECRET_ACCESS_KEY")
LOCATION_TABLE_NAME = os.environ.get("LOCATION_TABLE_NAME", TABLE_NAME)

CONTENT_TYPES = {
    "mov": "video/quicktime",
    "mp4": "video/mp4",
    "3gp": "video/3gpp",
    "png": "image/png",
    "jpg": "image/jpg",
    "jpeg": "image/jpg",
    "gif": "image/gif",
}

http = urllib3.PoolManager()

connections_data = {}


def get_maps_key_route(event):
    body = json.loads(event["body"])
    log(body)
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
        TableName=LOCATION_TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": location_token, "key2": "location"}),
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


@authenticate
def get_authenticated_maps_key_route(event, user_data, body):
    return format_response(
        event=event,
        http_code=200,
        body={"key": GOOGLE_API_KEY},
        user_data=user_data,
    )


def get_location_route(event):
    body = json.loads(event["body"])
    log(body)
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
        TableName=LOCATION_TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": location_token, "key2": "location"}),
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
        log_this=False,
    )


@authenticate
def share_location_route(event, user_data, body):
    log(body)
    location_token = body.get("locationToken")
    if location_token and re.compile(r"[a-zA-Z0-9]{10}").match(location_token):
        pass
    else:
        location_token = create_id(10)

    dynamo.put_item(
        TableName=LOCATION_TABLE_NAME,
        Item=python_obj_to_dynamo_obj(
            {
                "key1": location_token,
                "key2": "location",
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
        user_data=user_data,
    )


def twilio_route(event):
    log(event)

    parsed_body = urllib.parse.parse_qs(event["body"])

    log(parsed_body)

    from_number = parsed_body["From"][0]

    if not re.compile("^\\+1\\d{10}$").match(from_number):
        message = {
            "phone": ADMIN_PHONE,
            "message": f"Received a text message from {from_number} which is not valid",
        }
        log(message)
        return {
            "statusCode": 200,
            "body": "<Response/>",
            "headers": {
                "Content-Type": "application/xml",
            },
        }

    log(f"Received a text message from {from_number}, checking if account exists...")

    username = from_number[2:]

    user_data = get_user_data(username)

    log(user_data)

    if not user_data:
        message = {
            "phone": from_number,
            "message": f"You do not have an account, please sign up at dumbphoneapps.com",
        }
        log(message, user_data)
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

    log(msg_text, user_data)

    message = parse_message_as_note(msg_text, user_data, from_number)

    log(message, user_data)
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

        log(add_response)

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
        user_data=user_data,
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
            user_data=user_data,
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
        log(f"Got presigned POST URL: {response["url"]}", user_data)
        return format_response(
            event=event,
            http_code=200,
            body=response,
            user_data=user_data,
        )
    except Exception as e:
        log(e, user_data)
        log("Couldn't get a presigned POST URL", user_data)
    return format_response(
        event=event,
        http_code=500,
        body="Could not create a presigned url",
        user_data=user_data,
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
            user_data=user_data,
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
        user_data=user_data,
    )


def generate_presigned_get(event):
    body = json.loads(event["body"])
    log(body)
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
        log(e)
        log("Couldn't get a presigned GET URL")
    return format_response(
        event=event,
        http_code=500,
        body="Could not create a presigned url",
    )


BOOKMARK_TOMBSTONE_MAX_AGE_MS = 60 * 24 * 60 * 60 * 1000  # 60 days


def get_bookmarks_data(phone):
    user_data_boto = dynamo.get_item(
        Key=python_obj_to_dynamo_obj({"key1": "bookmarks", "key2": phone}),
        TableName=TABLE_NAME,
    )
    if "Item" in user_data_boto:
        return dynamo_obj_to_python_obj(user_data_boto["Item"])
    return {"key1": "bookmarks", "key2": phone, "bookmarks": []}


def set_bookmarks_data(phone, bookmarks):
    python_data = {"key1": "bookmarks", "key2": phone, "bookmarks": bookmarks}
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(python_data),
    )
    return python_data


def merge_bookmarks(server_bookmarks, client_bookmarks):
    merged_by_id = {}
    for bookmark in server_bookmarks:
        if isinstance(bookmark, dict) and bookmark.get("id"):
            merged_by_id[bookmark["id"]] = bookmark
    for bookmark in client_bookmarks:
        if not isinstance(bookmark, dict) or not bookmark.get("id"):
            continue
        existing = merged_by_id.get(bookmark["id"])
        if existing is None or int(bookmark.get("updatedTime", 0)) > int(existing.get("updatedTime", 0)):
            merged_by_id[bookmark["id"]] = bookmark
    return list(merged_by_id.values())


def purge_expired_tombstones(bookmarks):
    cutoff_ms = int(time.time() * 1000) - BOOKMARK_TOMBSTONE_MAX_AGE_MS
    output = []
    for bookmark in bookmarks:
        if bookmark.get("status") == "Deleted" and int(bookmark.get("updatedTime", 0)) < cutoff_ms:
            continue
        output.append(bookmark)
    return output


@authenticate
def bookmarks_sync_route(event, user_data, body):
    phone = user_data["key2"]
    client_bookmarks = body.get("bookmarks", [])
    if not isinstance(client_bookmarks, list):
        return format_response(
            event=event,
            http_code=400,
            body="bookmarks must be a list",
            user_data=user_data,
        )

    server_data = get_bookmarks_data(phone)
    merged = merge_bookmarks(server_data.get("bookmarks", []), client_bookmarks)
    purged = purge_expired_tombstones(merged)

    # dynamo_obj_to_python_obj deserializes numeric attributes as Decimal,
    # which json.dumps can't serialize -- normalize back to int before responding
    for bookmark in purged:
        bookmark["updatedTime"] = int(bookmark.get("updatedTime", 0))
        bookmark["status"] = bookmark.get("status", "Active")

    set_bookmarks_data(phone, purged)

    return format_response(
        event=event,
        http_code=200,
        body={"bookmarks": purged},
        user_data=user_data,
    )
