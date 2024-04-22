import json
import os

import urllib3

from .utils import (
    authenticate,
    format_response,
)

TENOR_API_KEY = os.environ["TENOR_API_KEY"]

http = urllib3.PoolManager()

cached_searches = {}


@authenticate
def tenor_search_route(event, user_data, body):
    print(body)
    query = body.get("query").strip().lower()
    if not query:
        return format_response(
            event=event,
            http_code=204,
            body={
                "results": [],
                "message": "You need to search for something, you supplied a blank string for query",
            },
        )
    key = query
    if body.get('pos'):
        key = key + '_' + body.get('pos')

    if key in cached_searches:
        return format_response(
            event=event,
            http_code=202,
            body={
                "results": cached_searches[key],
                "message": f"I had a result cached for '{key}'",
            },
        )

    uri = (
        f"https://tenor.googleapis.com/v2/search?q={query}&key={TENOR_API_KEY}&limit=5"
    )
    if body.get('pos'):
        uri = uri + f"&pos={body.get('pos')}"
    print(uri)
    tenor_response = http.request("GET", uri)
    tenor_response_text = tenor_response.data.decode("utf-8")
    tenor_response_json = json.loads(tenor_response_text)

    cached_searches[key] = tenor_response_json

    return format_response(
        event=event,
        http_code=200,
        body={
            "results": tenor_response_json,
            "message": f"I searched tenor for '{key}'",
        },
    )
