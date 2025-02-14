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
    global connections_data

    date_value = validate_date(body["date"])

    if not date_value:
        return format_response(
            event=event,
            http_code=400,
            body="Improper date format, must be yyyy-MM-dd",
        )

    if connections_data and date_value in connections_data:
        print("connections cache hit")
        return format_response(
            event=event,
            http_code=200,
            body=connections_data[date_value],
        )

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj(
            {
                "key1": "connections",
                "key2": date_value,
            }
        ),
    )

    if "Item" in response:
        print("connections db hit")
        connections_data_from_db = dynamo_obj_to_python_obj(response["Item"])
        connections_data[date_value] = connections_data_from_db['puzzle']
        return format_response(
            event=event,
            http_code=200,
            body=connections_data[date_value],
        )

    print("connections db miss")

    connections_uri = f"https://www.nytimes.com/svc/connections/v2/{date_value}.json"

    response = http.request(
        "GET",
        connections_uri,
    )

    try:
        response_text = response.data.decode("utf-8")
        response_json = json.loads(response_text, parse_float=str, parse_int=str)
    except:
        return None

    token_data = {
        "key1": "connections",
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
    )


@authenticate
def get_guesses_route(event, user_data, body):

    date_value = validate_date(body.get("date"))

    if not date_value:
        return format_response(
            event=event,
            http_code=400,
            body="Improper date format, must be yyyy-MM-dd",
        )

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj(
            {
                "key1": f"connections_guess_{user_data["key2"]}",
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
        )

    return format_response(
        event=event,
        http_code=200,
        body=[],
    )


@authenticate
def set_guesses_route(event, user_data, body):

    date_value = validate_date(body.get("date"))

    if not date_value:
        return format_response(
            event=event,
            http_code=400,
            body="Improper date format, must be yyyy-MM-dd",
        )

    guesses = validate_schema(body.get("guesses"), CONNECTIONS_SCHEMA)

    if not guesses:
        return format_response(
            event=event,
            http_code=400,
            body=f"Improper guesses format, must be {CONNECTIONS_SCHEMA}",
        )

    guess_data = {
        "key1": f"connections_guess_{user_data["key2"]}",
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
    )
