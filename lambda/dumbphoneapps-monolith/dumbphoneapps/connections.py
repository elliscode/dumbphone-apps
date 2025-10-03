from .dumbphoneapps_logger import log
import json
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

    earliest_date = "2023-06-12"
    if connections_type == "_sports":
        earliest_date = "2024-09-18"

    if date_value < validate_date(earliest_date):
        return format_response(
            event=event,
            http_code=400,
            body="Too early, the first connections puzzle was on 2023-06-12",
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
    if connections_type == "_sports":
        connections_uri = f"https://api.theathletic.com/graphql"

        response = http.request(
            method="POST",
            url=connections_uri,
            body=json.dumps({
                "query": "query GetPuzzleById($puzzleId: String\u0021) { getPuzzleById(puzzleId: $puzzleId) { categories { title cards { content position img } } printDate id hint_url editor } }",
                "variables": {"puzzleId": date_value}
            }),
            headers={
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "origin": "https://www.nytimes.com",
                "pragma": "no-cache",
                "priority": "u=1, i",
                "referer": "https://www.nytimes.com/",
            },
        )

        try:
            response_text = response.data.decode("utf-8")
            response_json = json.loads(response_text, parse_float=str, parse_int=str)
        except:
            return format_response(
                event=event,
                http_code=400,
                body="bad data for some reason",
                user_data=user_data,
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
            return format_response(
                event=event,
                http_code=400,
                body="bad data for some reason",
                user_data=user_data,
            )

    if response_json.get('errors'):
        return format_response(
            event=event,
            http_code=404,
            body="Puzzle not found",
            user_data=user_data,
        )

    if response_json.get('data') and response_json.get('data').get('getPuzzleById'):
        response_json = response_json['data']['getPuzzleById']

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

    return format_response(
        event=event,
        http_code=200,
        body=response_json,
        user_data=user_data,
    )


def get_guesses(event, user_data, body, connections_type):
    date_value = validate_date(body.get("date"))

    if not date_value:
        return format_response(
            event=event,
            http_code=400,
            body="Improper date format, must be yyyy-MM-dd",
            user_data=user_data,
        )

    earliest_date = "2023-06-12"
    if connections_type == "_sports":
        earliest_date = "2024-09-18"

    if date_value < validate_date(earliest_date):
        return format_response(
            event=event,
            http_code=400,
            body="Too early, the first connections puzzle was on 2023-06-12",
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
