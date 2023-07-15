import os
import json
import time
import boto3
from urllib.parse import parse_qsl
from boto3.dynamodb.types import TypeDeserializer, TypeSerializer


ADMIN_PHONE = os.environ["ADMIN_PHONE"]
DOMAIN_NAME = os.environ["DOMAIN_NAME"]
DOMAIN_NAME_WWW = os.environ["DOMAIN_NAME_WWW"]
TABLE_NAME = os.environ["DYNAMODB_TABLE_NAME"]

digits = "0123456789"
lowercase_letters = "abcdefghijklmnopqrstuvwxyz"
uppercase_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
dynamo = boto3.client("dynamodb")
sqs = boto3.client("sqs")


def format_response(event, http_code, body, headers=None):
    if isinstance(body, str):
        body = {"message": body}
    domain_name = ""
    if event["headers"]["origin"].startswith(DOMAIN_NAME_WWW):
        domain_name = DOMAIN_NAME_WWW
    elif event["headers"]["origin"].startswith(DOMAIN_NAME):
        domain_name = DOMAIN_NAME
    all_headers = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": domain_name,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Expose-Headers": "x-csrf-token",
    }
    if headers is not None:
        all_headers.update(headers)
    return {
        "statusCode": http_code,
        "body": json.dumps(body),
        "headers": all_headers,
    }


def parse_cookie(input):
    cookies = input.split(" ")
    for cookie in cookies:
        parts = cookie.split("=")
        cookie_name = parts[0].strip(" ;")
        if cookie_name == "dumbphoneapps-auth-token":
            return parts[1].strip(" ;")


def parse_body(body):
    if isinstance(body, dict):
        return body
    elif body.startswith("{"):
        return json.loads(body)
    else:
        return dict(parse_qsl(body))


def dynamo_obj_to_python_obj(dynamo_obj: dict) -> dict:
    deserializer = TypeDeserializer()
    return {k: deserializer.deserialize(v) for k, v in dynamo_obj.items()}


def python_obj_to_dynamo_obj(python_obj: dict) -> dict:
    serializer = TypeSerializer()
    return {k: serializer.serialize(v) for k, v in python_obj.items()}


def get_token(token_string):
    user_data_boto = dynamo.get_item(
        Key=python_obj_to_dynamo_obj({"key1": "token", "key2": token_string}),
        TableName=TABLE_NAME,
    )
    output = None
    if "Item" in user_data_boto:
        output = dynamo_obj_to_python_obj(user_data_boto["Item"])
    return output


def delete_token(token_id):
    print("deleting token")
    dynamo.delete_item(
        Key=python_obj_to_dynamo_obj({"key1": "token", "key2": token_id}),
        TableName=TABLE_NAME,
    )


def get_user_data(username):
    user_data_boto = dynamo.get_item(
        Key=python_obj_to_dynamo_obj({"key1": "user", "key2": username}),
        TableName=TABLE_NAME,
    )
    output = None
    if "Item" in user_data_boto:
        output = dynamo_obj_to_python_obj(user_data_boto["Item"])
    return output


def path_equals(event, method, path):
    event_path = event["path"]
    event_method = event["httpMethod"]
    return event_method == method and (
        event_path == path or event_path == path + "/" or path == "*"
    )


def authenticate(func):
    def wrapper_func(*args, **kwargs):
        event = args[0]
        if "cookie" not in event["headers"]:
            return format_response(
                event=event, http_code=403, body="No active session, please log in"
            )
        cookie_string = event["headers"]["cookie"]
        cookie = parse_cookie(cookie_string)
        body = parse_body(event["body"])
        csrf_token = body["csrf"]
        token_data = get_token(cookie)
        if token_data is None or token_data["expiration"] < int(time.time()):
            return format_response(
                event=event,
                http_code=403,
                body="Your session has expired, please log in",
            )
        if csrf_token is None or token_data["csrf"] != csrf_token:
            delete_token(token_data["key1"])
            return format_response(
                event=event,
                http_code=403,
                body="Your CSRF token is invalid, your session has expired, please re log in",
            )
        user_data = get_user_data(token_data["user"])
        return func(event, user_data, body)

    return wrapper_func
