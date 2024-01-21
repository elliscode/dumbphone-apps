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
    generate_query_parameters,
)
import time

discord_token_cache = {}


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
        "key2": user_data["key2"],
        "token": body["discordToken"],
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    discord_token_cache[user_data["key2"]] = body["discordToken"]

    return format_response(
        event=event,
        http_code=200,
        body="Successfully wrote the discordToken to the database",
    )


@authenticate
def discord_route(event, user_data, body):
    discord_uri = event["path"].replace("/discord/", "https://discord.com/", 1)

    http = urllib3.PoolManager()

    discord_token = get_discord_token(user_data)

    if not discord_token:
        return format_response(
            event=event,
            http_code=404,
            body="Discord token not found in the database",
        )

    discord_headers = {"Authorization": f"Bot {discord_token}"}

    if body["method"] == "POST" and "content" in body:
        discord_fields = {"content": body["content"]}

        response = http.request_encode_body(
            body["method"],
            discord_uri,
            headers=discord_headers,
            encode_multipart=False,
            fields=discord_fields,
        )
    elif body["method"] == "POST":
        discord_headers["Content-Type"] = "application/json"
        post_body = body.copy()
        post_body.pop("csrf")
        post_body.pop("method")
        print(post_body)
        print(discord_headers)
        response = http.request(
            body["method"],
            discord_uri,
            headers=discord_headers,
            body=bytes(json.dumps(post_body), encoding="utf-8"),
        )
    elif body["method"] == "GET":
        get_params = body.copy()
        get_params.pop("csrf")
        get_params.pop("method")
        url_suffix = generate_query_parameters(get_params)
        response = http.request(
            body["method"], discord_uri + url_suffix, headers=discord_headers
        )
    else:
        response = http.request(body["method"], discord_uri, headers=discord_headers)

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


def get_discord_token(user_data):
    if user_data["key2"] in discord_token_cache:
        return discord_token_cache[user_data["key2"]]

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "discord", "key2": user_data["key2"]}),
    )

    if "Item" not in response:
        return None

    discord_data = dynamo_obj_to_python_obj(response["Item"])

    if "token" not in discord_data:
        return None

    discord_token_cache[user_data["key2"]] = discord_data.get("token")

    return discord_data.get("token")
