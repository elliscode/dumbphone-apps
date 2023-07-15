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


def login_route(event):
    body = parse_body(event["body"])
    phone = body["phone"]
    submitted_otp = body["otp"]

    print(phone)
    print(submitted_otp)

    # get user data
    user_data = get_user_data(phone)
    if user_data is None:
        return format_response(event=event, http_code=500, body="No user exists")

    # get otp
    otp_data = get_otp(phone)
    if otp_data is None or otp_data["expiration"] < int(time.time()):
        return format_response(
            event=event,
            http_code=500,
            body="OTP expired, please wait 30 seconds and try to log in again",
        )
    diff = otp_data["last_failure"] + 30 - int(time.time())
    if diff > 0:
        return format_response(
            event=event,
            http_code=403,
            body=f"Please wait {diff} seconds before trying to log in again",
        )

    if submitted_otp != otp_data["otp"]:
        otp_data["last_failure"] = int(time.time())
        set_otp(phone, otp_data)
        return format_response(
            event=event, http_code=403, body="Incorrect OTP, please try again"
        )

    # delete the OTP
    delete_otp(phone)
    # log in the user and send them the data
    token_data = create_token(phone)

    # generate the date_string
    date_string = time.strftime(
        "%a, %d %b %Y %H:%M:%S GMT", time.gmtime(time.time() + (4 * 30 * 24 * 60 * 60))
    )

    return format_response(
        event=event,
        http_code=200,
        body="successfully logged in",
        headers={
            "x-csrf-token": token_data["csrf"],
            "Set-Cookie": f'dumbphoneapps-auth-token={token_data["key2"]}; Domain=.dumbphoneapps.com; Expires={date_string}; Secure; HttpOnly',
        },
    )


def otp_route(event):
    body = parse_body(event["body"])
    phone = str(body["phone"])

    if not re.match(r"^\d{10}$", phone):
        return format_response(
            event=event,
            http_code=500,
            body="Invalid phone supplied, must be 10 digits USA phone number",
        )

    # get or create user data
    user_data = get_user_data(phone)
    if user_data is None:
        user_data = create_user_data(phone)
        alert_admin_of_new_user(phone)
    print(user_data)

    # generate and set OTP
    otp_data = get_otp(phone)
    body_text = f"OTP already exists for {phone}, please log in"
    if otp_data is None or otp_data["expiration"] < int(time.time()):
        otp_value = "".join(secrets.choice(digits) for i in range(7))
        otp_data = create_otp(phone, otp_value)

        # generate and send message if you are creating a new otp
        message = {
            "phone": phone,
            "message": f"{otp_data['otp']} is your dumbphoneapps.com one-time passcode\n\n@dumbphoneapps.com #{otp_data['otp']}",
        }
        print(message)
        sqs.send_message(
            QueueUrl="https://sqs.us-east-1.amazonaws.com/646933935516/smsQueue",
            MessageBody=json.dumps(message),
        )
        body_text = f"Successfully sent OTP to {phone}"
    print(otp_data)

    return format_response(event=event, http_code=200, body=body_text)


def alert_admin_of_new_user(phone):
    # generate and send message if you are creating a new otp
    message = {
        "phone": ADMIN_PHONE,
        "message": f"A new user has joined dumbphoneapps!\n\nPhone: {phone}",
    }
    print(message)
    sqs.send_message(
        QueueUrl="https://sqs.us-east-1.amazonaws.com/646933935516/smsQueue",
        MessageBody=json.dumps(message),
    )


def create_token(phone):
    python_data = {
        "key1": "token",
        "key2": create_id(32),
        "csrf": create_id(32),
        "user": phone,  # m    d    h    m    s
        "expiration": int(time.time()) + (4 * 30 * 24 * 60 * 60),
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data


def set_otp(phone, python_data):
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data


def create_otp(phone, otp_value):
    python_data = {
        "key1": "otp",
        "key2": phone,
        "otp": otp_value,
        "expiration": int(time.time()) + (5 * 60),
        "last_failure": 0,
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data


def get_otp(phone):
    user_data_boto = dynamo.get_item(
        Key=python_obj_to_dynamo_obj({"key1": "otp", "key2": phone}),
        TableName=TABLE_NAME,
    )
    output = None
    if "Item" in user_data_boto:
        output = dynamo_obj_to_python_obj(user_data_boto["Item"])
    return output


def delete_otp(phone):
    dynamo.delete_item(
        Key=python_obj_to_dynamo_obj({"key1": "otp", "key2": phone}),
        TableName=TABLE_NAME,
    )


def create_user_data(phone):
    python_data = {
        "key1": "user",
        "key2": phone,
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data


def set_list_data(list_id, name, items):
    dynamo_data = python_obj_to_dynamo_obj(
        {
            "key1": "list",
            "key2": list_id,
            "name": name,
            "items": items,
        }
    )
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
