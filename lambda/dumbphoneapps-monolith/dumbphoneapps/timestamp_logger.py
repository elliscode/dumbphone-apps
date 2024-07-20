import datetime
import time

from .input_validation import (
    validate_schema,
    validate_unix_time,
    validate_id,
    validate_date,
    validate_string
)

from .utils import (
    authenticate,
    format_response,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    dynamo_obj_to_python_obj,
)

TIMESTAMPS_SCHEMA = {
    "type": list,
    "elements": {
        "type": dict,
        "fields": [
            {"type": validate_string, "name": "title"},
            {"type": validate_id, "name": "hash"},
        ]
    }
}


@authenticate
def set_timestamps_route(event, user_data, body):
    phone = user_data["key2"]
    events = validate_schema(body.get("events"), TIMESTAMPS_SCHEMA)
    if not events:
        return format_response(
            event=event,
            http_code=400,
            body=f"Improperly formatted events, must be in the format {TIMESTAMPS_SCHEMA}",
        )

    timestamps_entry = {
        "key1": f"timestamp_events_{phone}",
        "key2": f"{int(time.time())}",
        "events": events,
    }

    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(timestamps_entry),
    )

    return format_response(
        event=event,
        http_code=201,
        body="Successfully wrote timestamp events to database",
    )


@authenticate
def get_timestamps_route(event, user_data, body):
    phone = user_data["key2"]

    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            "key1": {
                "AttributeValueList": [{"S": f"timestamp_events_{phone}"}],
                "ComparisonOperator": "EQ",
            },
        },
        ScanIndexForward=False,
    )

    latest_timestamps = []
    for item in response["Items"]:
        python_item = dynamo_obj_to_python_obj(item)
        print(python_item)
        latest_timestamps = python_item["events"]
        break

    return format_response(
        event=event,
        http_code=200,
        body={"events": latest_timestamps},
    )


@authenticate
def get_values_route(event, user_data, body):
    phone = user_data["key2"]

    if "date" not in body:
        date = datetime.date.today().strftime("%Y-%m-%d")
    else:
        date = body["date"]

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": f"timestamp_values_{phone}", "key2": date}),
    )

    if "Item" not in response:
        return format_response(
            event=event,
            http_code=200,
            body={"timestamp": 0, "values": []},
        )

    values = dynamo_obj_to_python_obj(response["Item"])

    if "values" not in values:
        return format_response(
            event=event,
            http_code=200,
            body={"timestamp": 0, "values": []},
        )

    return format_response(
        event=event,
        http_code=200,
        body={"timestamp": values.get("timestamp", 0), "values": values["values"]},
    )


@authenticate
def add_value_route(event, user_data, body):
    phone = user_data["key2"]

    timestamp = validate_unix_time(body.get("timestamp"))
    hash_value = validate_id(body.get("hash"))
    date = validate_date(body.get("date"))

    if not timestamp or not hash_value or not date:
        return format_response(
            event=event,
            http_code=400,
            body=f"Improperly formatted timestamp, date, or hash_value",
        )

    key = {
        "key1": f"timestamp_values_{phone}",
        "key2": date,
    }

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj(key),
    )

    if "Item" not in response:
        python_data = key.copy()
        python_data['values'] = []
    else:
        python_data = dynamo_obj_to_python_obj(response["Item"])

    python_data['values'].append({
        "timestamp": str(body["timestamp"]),
        "hash": str(body["hash"]),
    })

    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    return format_response(
        event=event,
        http_code=201,
        body="Successfully wrote all values to the database",
    )


@authenticate
def get_timestamp_report_data_route(event, user_data, body):
    phone = user_data["key2"]

    date = validate_date(body.get("date"))
    if not date:
        return format_response(
            event=event,
            http_code=400,
            body=f"Improperly formatted date",
        )
    date_obj = datetime.datetime.strptime(body["date"], "%Y-%m-%d")
    keys = []
    for i in range(-6, 1):
        new_date_obj = date_obj + datetime.timedelta(days=i)
        keys.append(
            python_obj_to_dynamo_obj({"key1": f"timestamp_values_{phone}", "key2": new_date_obj.strftime("%Y-%m-%d")})
        )
    response = dynamo.batch_get_item(
        RequestItems={
            TABLE_NAME: {
                "Keys": keys,
            }
        }
    )
    responses = response["Responses"][TABLE_NAME]
    output_values = []
    for response_item in responses:
        python_item = dynamo_obj_to_python_obj(response_item)
        if "values" in python_item:
            output_values.append({"date": python_item["key2"], "values": python_item["values"]})
    return format_response(
        event=event,
        http_code=200,
        body={"values": output_values},
    )
