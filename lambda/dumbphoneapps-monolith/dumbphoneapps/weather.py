import os
import urllib3
import json
from .utils import (
    authenticate,
    format_response,
)

WEATHER_API_KEY = os.environ["WEATHER_API_KEY"]

http = urllib3.PoolManager()


@authenticate
def get_forecast_route(event, user_data, body):
    print(body)
    lat = body['lat']
    lon = body['lon']
    response = http.request(
        "GET",
        f"https://api.weatherapi.com/v1/forecast.json?key={WEATHER_API_KEY}&q={lat},{lon}&days=1&aqi=no&alerts=no",
    )
    response_text = response.data.decode("utf-8")
    response_json = json.loads(response_text)

    return format_response(
        event=event,
        http_code=200,
        body=response_json,
    )
