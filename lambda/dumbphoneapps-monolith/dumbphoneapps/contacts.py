import base64
import json
import os
import time

import urllib3

from .utils import (
    authenticate,
    format_response,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    dynamo_obj_to_python_obj,
)

WEATHER_API_USERNAME = os.environ["WEATHER_API_USERNAME"]
WEATHER_API_PASSWORD = os.environ["WEATHER_API_PASSWORD"]

weather_token = None
weather_token_expiration = None

http = urllib3.PoolManager()


@authenticate
def get_contacts_route(event, user_data, body):
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            "key1": {
                "AttributeValueList": [{"S": f"contacts_{user_data['key2']}"}],
                "ComparisonOperator": "EQ",
            },
        },
    )
    contacts = {}
    for item in response["Items"]:
        python_item = dynamo_obj_to_python_obj(item)
        print(python_item)
        contacts[python_item["key2"]] = python_item["phone_list"]

    return format_response(
        event=event,
        http_code=200,
        body=contacts,
    )