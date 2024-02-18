import os
import json
import urllib
import re
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
)
import time


@authenticate
def get_questions_route(event, user_data, body):
    phone = user_data["key2"]

    return format_response(
        event=event,
        http_code=200,
        body="Not implemented :)",
    )


@authenticate
def set_questions_route(event, user_data, body):
    phone = user_data["key2"]

    return format_response(
        event=event,
        http_code=201,
        body="Not implemented :)",
    )