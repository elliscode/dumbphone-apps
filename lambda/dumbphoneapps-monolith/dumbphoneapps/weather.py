from .dumbphoneapps_logger import log

import base64
import json
import os
import time

import urllib3

from .input_validation import (
    validate_decimal,
    validate_date,
    validate_hms_time,
    validate_schema
)

from .utils import (
    authenticate,
    format_response,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    dynamo_obj_to_python_obj,
)

WEATHER_API_USERNAME = os.environ.get("WEATHER_API_USERNAME")
WEATHER_API_PASSWORD = os.environ.get("WEATHER_API_PASSWORD")

weather_token = None
weather_token_expiration = None

http = urllib3.PoolManager()

GET_FORECAST_SCHEMA = {
    "type": dict,
    "fields": [
        {"type": validate_decimal, "name": "lat"},
        {"type": validate_decimal, "name": "lon"},
        {"type": validate_date, "name": "today"},
        {"type": validate_date, "name": "eightDaysFromNow"},
        {"type": validate_hms_time, "name": "midnight"},
    ]
}


@authenticate
def get_forecast_route(event, user_data, body):
    body = validate_schema(body, GET_FORECAST_SCHEMA)

    if not body:
        return format_response(
            event=event,
            http_code=400,
            body=f"Improperly formatted events, must be in the format {GET_FORECAST_SCHEMA}",
            user_data=user_data,
        )

    found_token = get_token(user_data)

    uri = f"https://api.meteomatics.com/{body['today']}T{body['midnight']}Z--{body['eightDaysFromNow']}T{body['midnight']}Z:PT24H/t_min_2m_24h:F,t_max_2m_24h:F,weather_symbol_24h:idx/{body['lat']},{body['lon']}/json"
    log(uri, user_data)
    daily_response = http.request(
        "GET",
        uri,
        headers={"Authorization": f"Bearer {found_token}"},
    )
    daily_response_text = daily_response.data.decode("utf-8")
    daily_response_json = json.loads(daily_response_text)

    hourly_response = http.request(
        "GET",
        f"https://api.meteomatics.com/now--now+23H:PT1H/t_2m:F,weather_symbol_1h:idx/{body['lat']},{body['lon']}/json",
        headers={"Authorization": f"Bearer {found_token}"},
    )
    hourly_response_text = hourly_response.data.decode("utf-8")
    hourly_response_json = json.loads(hourly_response_text)

    return format_response(
        event=event,
        http_code=200,
        body={"daily": daily_response_json, "hourly": hourly_response_json},
        user_data=user_data,
    )


def get_token(user_data):
    global weather_token
    global weather_token_expiration
    if weather_token and time.time() < weather_token_expiration:
        log("weather cache hit", user_data)
        return weather_token

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj(
            {
                "key1": "token",
                "key2": "weather",
            }
        ),
    )

    if "Item" in response:
        log("weather db hit", user_data)
        token_data = dynamo_obj_to_python_obj(response["Item"])
        if token_data["expiration"] > int(time.time()):
            weather_token = token_data["token"]
            weather_token_expiration = token_data["expiration"]
            return token_data["token"]

    log("weather db miss", user_data)

    base64_encoded_auth = base64.b64encode(f"{WEATHER_API_USERNAME}:{WEATHER_API_PASSWORD}".encode("utf-8")).decode(
        "utf-8"
    )

    weather_uri = "https://login.meteomatics.com/api/v1/token"
    weather_headers = {
        "Authorization": f"Basic {base64_encoded_auth}",
    }

    response = http.request(
        "GET",
        weather_uri,
        headers=weather_headers,
    )

    try:
        response_text = response.data.decode("utf-8")
        response_json = json.loads(response_text)
    except:
        return None

    weather_token = response_json["access_token"]  # h  m    s
    weather_token_expiration = int(time.time()) + (2 * 60 * 60)

    token_data = {
        "key1": "token",
        "key2": "weather",
        "token": weather_token,
        "expiration": weather_token_expiration,
    }
    dynamo_data = python_obj_to_dynamo_obj(token_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    return weather_token
