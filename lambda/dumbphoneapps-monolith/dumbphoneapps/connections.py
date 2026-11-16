from .dumbphoneapps_logger import log
import datetime
import json
import traceback
import urllib3
from .utils import (
    authenticate,
    format_response,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    dynamo_obj_to_python_obj,
)
from .input_validation import (
    validate_date,
    validate_schema,
)

CONNECTIONS_SCHEMA = {
    "type": list,
    "elements": {
        "type": list,
        "elements": {
            "type": str
        }
    }
}

EARLIEST_DATES = {
    "": "2023-06-12",
    "_sports": "2024-09-18",
}

http = urllib3.PoolManager()

connections_data = {}

@authenticate
def get_connections_route(event, user_data, body):
    return get_connections(event, user_data, body, "")


@authenticate
def get_guesses_route(event, user_data, body):
    return get_guesses(event, user_data, body, "")


@authenticate
def set_guesses_route(event, user_data, body):
    return set_guesses(event, user_data, body, "")


@authenticate
def get_connections_sports_route(event, user_data, body):
    return get_connections(event, user_data, body, "_sports")


@authenticate
def get_guesses_sports_route(event, user_data, body):
    return get_guesses(event, user_data, body, "_sports")


@authenticate
def set_guesses_sports_route(event, user_data, body):
    return set_guesses(event, user_data, body, "_sports")


def get_connections(event, user_data, body, connections_type):
    global connections_data

    date_value = validate_date(body["date"])

    if not date_value:
        return format_response(
            event=event,
            http_code=400,
            body="Improper date format, must be yyyy-MM-dd",
            user_data=user_data,
        )

    earliest_date = EARLIEST_DATES[connections_type]

    if date_value < earliest_date:
        return format_response(
            event=event,
            http_code=400,
            body=f"Too early, the first connections puzzle was on {earliest_date}",
            user_data=user_data,
        )

    if connections_data and connections_type in connections_data and date_value in connections_data[connections_type]:
        log("connections cache hit", user_data)
        return format_response(
            event=event,
            http_code=200,
            body=connections_data[connections_type][date_value],
            user_data=user_data,
        )

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj(
            {
                "key1": f"connections{connections_type}",
                "key2": date_value,
            }
        ),
    )

    if "Item" in response:
        log("connections db hit", user_data)
        connections_data_from_db = dynamo_obj_to_python_obj(response["Item"])
        if connections_type not in connections_data:
            connections_data[connections_type] = {}
        connections_data[connections_type][date_value] = connections_data_from_db['puzzle']
        return format_response(
            event=event,
            http_code=200,
            body=connections_data[connections_type][date_value],
            user_data=user_data,
        )

    log("connections db miss", user_data)
    http_code, response_body = fetch_and_store_connections(date_value, connections_type)

    return format_response(
        event=event,
        http_code=http_code,
        body=response_body,
        user_data=user_data,
    )


def fetch_and_store_connections(date_value, connections_type):
    if connections_type == "_sports":
        connections_uri = f"https://api-prd-nyt.theathletic.com/graphql"

        response = http.request(
            method="POST",
            url=connections_uri,
            body=json.dumps({
                "operationName": "GetPuzzleByIdOrDate",
                "query": "query GetPuzzleByIdOrDate($puzzleId: String, $date: String, $puzzleType: String) { getPuzzleByIdOrDate(puzzle_id: $puzzleId, date: $date, puzzle_type: $puzzleType) { categories { title cards { content position img } } printDate: print_date id hint_url editor } }",
                "variables": {"date": date_value, "puzzleType": "sports-connections"}
            }),
            headers={
                "accept": "application/graphql-response+json,application/json;q=0.9",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "origin": "https://www.nytimes.com",
                "pragma": "no-cache",
                "priority": "u=1, i",
                "referer": "https://www.nytimes.com/",
            },
        )
    else:
        connections_uri = f"https://www.nytimes.com/svc/connections/v2/{date_value}.json"

        response = http.request(
            "GET",
            connections_uri,
        )

    try:
        response_text = response.data.decode("utf-8")
        response_json = json.loads(response_text, parse_float=str, parse_int=str)
    except:
        return 400, "bad data for some reason"

    if not isinstance(response_json, dict) or response_json.get('errors'):
        return 404, "Puzzle not found"

    if response_json.get('data') and response_json.get('data').get('getPuzzleByIdOrDate'):
        response_json = response_json['data']['getPuzzleByIdOrDate']

    token_data = {
        "key1": f"connections{connections_type}",
        "key2": date_value,
        "puzzle": response_json,
    }
    dynamo_data = python_obj_to_dynamo_obj(token_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    return 200, response_json


def puzzle_exists(date_value, connections_type):
    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj(
            {
                "key1": f"connections{connections_type}",
                "key2": date_value,
            }
        ),
    )
    return "Item" in response


def utc_today():
    return datetime.datetime.now(datetime.timezone.utc).date()


# Invoked directly by EventBridge Scheduler (no API Gateway, no auth). Each
# call makes at most one upstream request per connections type, walking a
# per-type cursor from the first puzzle up to today. Once caught up, the
# same payload picks up each new day's puzzle as it appears
def run_connections_backfill(payload):
    payload = payload or {}
    types = payload.get("types", list(EARLIEST_DATES.keys()))
    results = {}
    for connections_type in types:
        if connections_type not in EARLIEST_DATES:
            results[connections_type] = {"status": "invalid_type"}
            continue
        try:
            results[connections_type] = backfill_one(connections_type)
        except Exception:
            traceback.print_exc()
            results[connections_type] = {"status": "error"}
    print(json.dumps({"connections_backfill_results": results}))
    return results


def cursor_key(connections_type):
    return {"key1": f"connections_backfill_cursor{connections_type}", "key2": "cursor"}


def read_cursor(connections_type):
    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj(cursor_key(connections_type)),
    )
    if "Item" in response:
        stored = validate_date(dynamo_obj_to_python_obj(response["Item"]).get("cursor"))
        if stored:
            return datetime.datetime.strptime(stored, "%Y-%m-%d").date()
    return datetime.datetime.strptime(EARLIEST_DATES[connections_type], "%Y-%m-%d").date()


def write_cursor(connections_type, cursor):
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj({**cursor_key(connections_type), "cursor": cursor.isoformat()}),
    )


def backfill_one(connections_type):
    one_day = datetime.timedelta(days=1)
    today = utc_today()
    start = read_cursor(connections_type)
    cursor = start
    result = {"status": "caught_up"}

    while cursor <= today:
        date_value = cursor.isoformat()
        if puzzle_exists(date_value, connections_type):
            cursor += one_day
            continue

        http_code, body = fetch_and_store_connections(date_value, connections_type)
        if http_code == 200:
            result = {"status": "fetched", "date": date_value}
            cursor += one_day
        elif cursor < today:
            # A past date that won't load isn't going to start working, so
            # skip it rather than blocking every later date behind it
            result = {"status": "skipped", "date": date_value, "code": http_code, "message": body}
            cursor += one_day
        else:
            # Today's puzzle may just not be published yet; retry next run
            result = {"status": "not_ready", "date": date_value, "code": http_code, "message": body}
        break

    if cursor != start:
        write_cursor(connections_type, cursor)
    result["cursor"] = cursor.isoformat()
    return result


def get_guesses(event, user_data, body, connections_type):
    date_value = validate_date(body.get("date"))

    if not date_value:
        return format_response(
            event=event,
            http_code=400,
            body="Improper date format, must be yyyy-MM-dd",
            user_data=user_data,
        )

    earliest_date = EARLIEST_DATES[connections_type]

    if date_value < earliest_date:
        return format_response(
            event=event,
            http_code=400,
            body=f"Too early, the first connections puzzle was on {earliest_date}",
            user_data=user_data,
        )

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj(
            {
                "key1": f"connections_guess{connections_type}_{user_data["key2"]}",
                "key2": date_value,
            }
        ),
    )

    if "Item" in response:
        guesses_data_from_db = dynamo_obj_to_python_obj(response["Item"])
        return format_response(
            event=event,
            http_code=200,
            body=guesses_data_from_db['guesses'],
            user_data=user_data,
        )

    return format_response(
        event=event,
        http_code=200,
        body=[],
        user_data=user_data,
    )


def set_guesses(event, user_data, body, connections_type):
    date_value = validate_date(body.get("date"))

    if not date_value:
        return format_response(
            event=event,
            http_code=400,
            body="Improper date format, must be yyyy-MM-dd",
            user_data=user_data,
        )

    guesses = validate_schema(body.get("guesses"), CONNECTIONS_SCHEMA)

    if not guesses:
        return format_response(
            event=event,
            http_code=400,
            body=f"Improper guesses format, must be {CONNECTIONS_SCHEMA}",
            user_data=user_data,
        )

    guess_data = {
        "key1": f"connections_guess{connections_type}_{user_data["key2"]}",
        "key2": date_value,
        "guesses": guesses,
    }
    dynamo_data = python_obj_to_dynamo_obj(guess_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    return format_response(
        event=event,
        http_code=200,
        body=f"Wrote guess data for {date_value} to database",
        user_data=user_data,
    )
