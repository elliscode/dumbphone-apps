import json
import re
import urllib3
import os
from .utils import (
    DOMAIN_NAME,
    DOMAIN_NAME_WWW,
    get_user_data,
    format_response,
    sqs,
    authenticate,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    dynamo_obj_to_python_obj,
    create_id,
    SMS_SQS_QUEUE_URL,
    SMS_SQS_QUEUE_ARN,
    SMS_SCHEDULER_ROLE_ARN,
    scheduler,
)

http = urllib3.PoolManager()

NEST_CLIENT_ID = os.environ.get("NEST_CLIENT_ID")
NEST_CLIENT_SECRET = os.environ.get("NEST_CLIENT_SECRET")


@authenticate
def get_token_from_code_route(event, user_data, body):
    if "code" not in body:
        return format_response(
            event=event,
            http_code=400,
            body="You must supply a code",
        )

    auth_code = body["code"]

    google_token_response = http.request(
        "POST",
        f"https://www.googleapis.com/oauth2/v4/token?client_id={NEST_CLIENT_ID}&client_secret={NEST_CLIENT_SECRET}&code={auth_code}&grant_type=authorization_code&redirect_uri={DOMAIN_NAME_WWW}/thermostat/index.html",
    )
    google_token_response_text = google_token_response.data.decode("utf-8")
    if google_token_response.status == 200:
        google_token_response_json = json.loads(google_token_response_text)

        python_data = {
            "key1": "nest",
            "key2": user_data["key2"],
            "refresh_token": google_token_response_json["refresh_token"],
        }
        dynamo_data = python_obj_to_dynamo_obj(python_data)
        dynamo.put_item(
            TableName=TABLE_NAME,
            Item=dynamo_data,
        )

        return format_response(
            event=event,
            http_code=google_token_response.status,
            body=google_token_response_json,
        )
    else:
        return format_response(
            event=event,
            http_code=google_token_response.status,
            body="Token could not be retrieved, please reauthorize the application",
        )


@authenticate
def get_token_from_existing_refresh_token_route(event, user_data, body):
    nest_token_response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "nest", "key2": user_data["key2"]}),
    )
    if "Item" not in nest_token_response:
        return format_response(
            event=event,
            http_code=404,
            body="No existing token found for user, please reauthorize the application",
        )

    nest_token_item = dynamo_obj_to_python_obj(nest_token_response["Item"])

    google_token_response = http.request(
        "POST",
        f"https://www.googleapis.com/oauth2/v4/token?client_id={NEST_CLIENT_ID}&client_secret={NEST_CLIENT_SECRET}&refresh_token={nest_token_item['refresh_token']}&grant_type=refresh_token",
    )
    google_token_response_text = google_token_response.data.decode("utf-8")
    if google_token_response.status == 200:
        google_token_response_json = json.loads(google_token_response_text)

        return format_response(
            event=event,
            http_code=google_token_response.status,
            body=google_token_response_json,
        )
    else:
        return format_response(
            event=event,
            http_code=google_token_response.status,
            body="Token could not be retrieved, please reauthorize the application",
        )
