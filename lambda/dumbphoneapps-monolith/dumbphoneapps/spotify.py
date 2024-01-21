import os
import json
import urllib
import re
import urllib3
import base64
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

spotify_client_cache = {}


@authenticate
def set_spotify_client_route(event, user_data, body):
    if "spotifyClientId" not in body or "spotifyClientSecret" not in body:
        return format_response(
            event=event,
            http_code=400,
            body="You must supply a spotifyClientId and a spotifyClientSecret",
        )

    python_data = {
        "key1": "spotify",
        "key2": user_data["key2"],
        "clientId": body["spotifyClientId"],
        "clientSecret": body["spotifyClientSecret"],
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    spotify_client_cache[user_data["key2"]] = {"clientId": body["spotifyClientId"], "clientSecret": body["spotifyClientSecret"],}

    return format_response(
        event=event,
        http_code=200,
        body="Successfully wrote the spotifyClientId and spotifyClientSecret to the database",
    )


@authenticate
def set_spotify_auth_code_route(event, user_data, body):

    spotify_data = get_spotify_credentials(user_data)

    if not spotify_data:
        return format_response(
            event=event,
            http_code=404,
            body="Spotify credentials not found",
        )

    if "spotifyAuthCode" not in body:
        return format_response(
            event=event,
            http_code=400,
            body="You must supply a spotifyAuthCode",
        )

    python_data = {
        "key1": "spotify",
        "key2": user_data["key2"],
        "clientId": spotify_data["clientId"],
        "clientSecret": spotify_data["clientSecret"],
        "authCode": body["spotifyAuthCode"],
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    spotify_client_cache[user_data["key2"]] = {
        "clientId": spotify_data["clientId"], 
        "clientSecret": spotify_data["clientSecret"],
        "authCode": body["spotifyAuthCode"],
    }

    return format_response(
        event=event,
        http_code=200,
        body="Successfully wrote the spotifyAuthCode to the database",
    )


@authenticate
def get_spotify_login_url_route(event, user_data, body):

    spotify_data = get_spotify_credentials(user_data)

    state = create_id(128)

    python_data = {
        "key1": "spotify_state",
        "key2": user_data["key2"],
        "state": state,
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    query_params = generate_query_parameters({
        "response_type": "code",
        "client_id": spotify_data["clientId"],
        "scope": "app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-playing",
        "redirect_uri": "https://aws.dumbphoneapps.com/spotify/",
        "state": state
    })

    return format_response(
        event=event,
        http_code=200,
        body={
            "url": f"https://accounts.spotify.com/authorize{query_params}",
            "state": state,
            "clientId": spotify_data["clientId"]
        },
    )


@authenticate
def get_spotify_access_token_route(event, user_data, body):

    spotify_data = get_spotify_credentials(user_data)
    
    base64_encoded_auth = base64.b64encode(f'{spotify_data["clientId"]}:{spotify_data["clientSecret"]}'.encode('utf-8')).decode('utf-8')

    http = urllib3.PoolManager()

    spotify_uri = "https://accounts.spotify.com/api/token"
    spotify_headers = {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": f"Basic {base64_encoded_auth}",
    }
    spotify_fields = {
        "code": spotify_data["authCode"],
        "redirect_uri": "https://aws.dumbphoneapps.com/spotify/",
        "grant_type": "authorization_code",
    }
    
    print(spotify_uri, spotify_headers, spotify_fields)
    
    body_text = generate_query_parameters(spotify_fields)
    body_text = body_text[1:]
    
    response = http.request(
        "POST",
        spotify_uri,
        headers=spotify_headers,
        body=body_text,
    )
    
    response_json = {}
    try:
        print(response)
        print(response.status)
        response_text = response.data.decode("utf-8")
        print(response_text)
        response_json = json.loads(response_text)
    except:
        return format_response(
            event=event,
            http_code=500,
            body="Failed on decode",
        )

    return format_response(
        event=event,
        http_code=200,
        body=response_json,
    )


def get_spotify_credentials(user_data):
    if user_data["key2"] in spotify_client_cache:
        return spotify_client_cache[user_data["key2"]]

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "spotify", "key2": user_data["key2"]}),
    )

    if "Item" not in response:
        return None

    spotify_data = dynamo_obj_to_python_obj(response["Item"])

    if "clientId" not in spotify_data:
        None

    cache_item = {
        "clientId": spotify_data["clientId"],
        "clientSecret": spotify_data["clientSecret"],
    }
    if "authCode" in spotify_data:
        cache_item["authCode"] = spotify_data["authCode"]

    spotify_client_cache[user_data["key2"]] = cache_item

    return cache_item