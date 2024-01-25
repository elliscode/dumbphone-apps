import os
import urllib3
import json
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
import base64

WEATHER_API_USERNAME = os.environ["WEATHER_API_USERNAME"]
WEATHER_API_PASSWORD = os.environ["WEATHER_API_PASSWORD"]

weather_token = None

http = urllib3.PoolManager()


@authenticate
def get_forecast_route(event, user_data, body):
    print(body)
    lat = body["lat"]
    lon = body["lon"]

    found_token = get_token()

    daily_response = http.request(
        "GET",
        f"https://api.meteomatics.com/todayT23:59:59Z--tomorrow+6DT12:00:00Z:PT24H/t_min_2m_24h:F,t_max_2m_24h:F,weather_symbol_24h:idx/{lat},{lon}/json",
        headers={"Authorization": f"Bearer {found_token}"},
    )
    daily_response_text = daily_response.data.decode("utf-8")
    daily_response_json = json.loads(daily_response_text)

    hourly_response = http.request(
        "GET",
        f"https://api.meteomatics.com/now--now+23H:PT1H/t_2m:F,weather_symbol_1h:idx/{lat},{lon}/json",
        headers={"Authorization": f"Bearer {found_token}"},
    )
    hourly_response_text = hourly_response.data.decode("utf-8")
    hourly_response_json = json.loads(hourly_response_text)

    return format_response(
        event=event,
        http_code=200,
        body={"daily": daily_response_json, "hourly": hourly_response_json},
    )


def get_token():
    global weather_token
    if weather_token:
        print("weather cache hit")
        return weather_token

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({
            "key1": "token",
            "key2": "weather",
        }),
    )

    if "Item" in response:
        print("weather db hit")
        token_data = dynamo_obj_to_python_obj(response["Item"])
        if token_data["expiration"] > int(time.time()):
            return token_data["token"]

    print("weather db miss")

    base64_encoded_auth = base64.b64encode(
        f"{WEATHER_API_USERNAME}:{WEATHER_API_PASSWORD}".encode("utf-8")
    ).decode("utf-8")

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

    weather_token = response_json["access_token"]

    token_data = {
        "key1": "token",
        "key2": "weather",
        "token": weather_token,  # .      h    m    s
        "expiration": int(time.time()) + (2 * 60 * 60),
    }
    dynamo_data = python_obj_to_dynamo_obj(token_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    return weather_token
