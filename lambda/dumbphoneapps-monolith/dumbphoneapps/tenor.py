from .dumbphoneapps_logger import log

import json
import os

import urllib3

from .utils import (
    authenticate,
    format_response,
)

TENOR_API_KEY = os.environ.get("TENOR_API_KEY")

http = urllib3.PoolManager()

cached_searches = {}


@authenticate
def tenor_search_route(event, user_data, body):
    log(body, user_data)
    query = body.get("query").strip().lower()
    if not query:
        return format_response(
            event=event,
            http_code=204,
            body={
                "results": [],
                "message": "You need to search for something, you supplied a blank string for query",
            },
            user_data=user_data,
        )
    page = body.get("pos", 1)
    key = query if page == 1 else f"{query}_{page}"

    if key in cached_searches:
        return format_response(
            event=event,
            http_code=202,
            body={
                "results": cached_searches[key],
                "message": f"I had a result cached for '{key}'",
            },
            user_data=user_data,
        )

    uri = f"https://api.klipy.com/api/v1/{TENOR_API_KEY}/gifs/search?q={query}&per_page=5&page={page}"
    log(uri, user_data)
    klipy_response = http.request("GET", uri)
    klipy_response_text = klipy_response.data.decode("utf-8")
    klipy_response_json = json.loads(klipy_response_text)

    current_page = klipy_response_json["data"]["current_page"]
    has_next = klipy_response_json["data"]["has_next"]
    normalized = {
        "results": klipy_response_json["data"]["data"],
        "next": current_page + 1 if has_next else None,
    }

    cached_searches[key] = normalized

    return format_response(
        event=event,
        http_code=200,
        body={
            "results": normalized,
            "message": f"I searched klipy for '{key}'",
        },
        user_data=user_data,
    )
