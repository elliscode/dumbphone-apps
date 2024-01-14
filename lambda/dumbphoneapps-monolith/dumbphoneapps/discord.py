import os
import json
import urllib
import re
import urllib3
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
def discord_route(event, user_data, body):
    discord_uri = event["path"].replace('/discord/','https://discord.com/',1)
    
    http = urllib3.PoolManager()
    
    discord_headers = {'Authorization': f'Bot {body["discordToken"]}'}
    
    if body["method"] == "GET":
        response = http.request(
            body["method"],
            discord_uri,
            headers=discord_headers
        )
    elif body["method"] == "POST":
        discord_fields = {'content': body['content']}
        
        response = http.request_encode_body(
            body["method"],
            discord_uri,
            headers=discord_headers,
            encode_multipart=False,
            fields=discord_fields,
        )

    response_text = response.data.decode("utf-8")
    response_json = json.loads(response_text)

    return format_response(
        event=event,
        http_code=200,
        body=response_json,
    )