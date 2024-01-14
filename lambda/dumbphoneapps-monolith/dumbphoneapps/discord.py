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
def get_discord_token_route(event, user_data, body):
    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "discord", "key2": user_data['key2']}),
    )

    if "Item" not in response:
        return format_response(
            event=event,
            http_code=404,
            body="Discord token not found",
        )
        
    discord_data = dynamo_obj_to_python_obj(response["Item"])
    
    if 'token' not in discord_data:
        return format_response(
            event=event,
            http_code=404,
            body="Discord token not found in the database",
        )

    return format_response(
        event=event,
        http_code=200,
        body={'discordToken': discord_data.get('token')},
    )
    
    
    
@authenticate
def set_discord_token_route(event, user_data, body):
    if "discordToken" not in body:
        return format_response(
            event=event,
            http_code=400,
            body="You must supply a discordToken",
        )
        
    python_data = {
        "key1": "discord",
        "key2": user_data['key2'],
        "token": body['discordToken'],
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    return format_response(
        event=event,
        http_code=200,
        body='Successfully wrote the discordToken to the database',
    )
    


@authenticate
def discord_route(event, user_data, body):
    discord_uri = event["path"].replace('/discord/','https://discord.com/',1)
    
    http = urllib3.PoolManager()
    
    discord_headers = {'Authorization': f'Bot {body["discordToken"]}'}
    
    if body["method"] == "POST":
        discord_fields = {'content': body['content']}
        
        response = http.request_encode_body(
            body["method"],
            discord_uri,
            headers=discord_headers,
            encode_multipart=False,
            fields=discord_fields,
        )
    else:
        response = http.request(
            body["method"],
            discord_uri,
            headers=discord_headers
        )

    response_json = {}
    try:
        response_text = response.data.decode("utf-8")
        response_json = json.loads(response_text)
    except:
        pass

    return format_response(
        event=event,
        http_code=200,
        body=response_json,
    )