import datetime
import time

from .utils import (
    authenticate,
    format_response,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    dynamo_obj_to_python_obj,
)


@authenticate
def set_timestamps_route(event, user_data, body):
    phone = user_data["key2"]

    timestamps_entry = {
        "key1": f"timestamp_events_{phone}",
        "key2": f"{int(time.time())}",
        "events": body["events"],
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
            body={"values": {}},
        )

    values = dynamo_obj_to_python_obj(response["Item"])

    if "values" not in values:
        return format_response(
            event=event,
            http_code=200,
            body={"values": {}},
        )

    return format_response(
        event=event,
        http_code=200,
        body={"values": values["values"]},
    )


@authenticate
def get_report_data_route(event, user_data, body):
    phone = user_data["key2"]

    if "date" not in body:
        return format_response(
            event=event,
            http_code=400,
            body="You need to supply a date in your POST body",
        )
    date_obj = datetime.datetime.strptime(body["date"], "%Y-%m-%d")
    keys = []
    for i in range(-6, 1):
        new_date_obj = date_obj + datetime.timedelta(days=i)
        keys.append(python_obj_to_dynamo_obj({"key1": f"timestamp_values_{phone}", "key2": new_date_obj.strftime("%Y-%m-%d")}))
        keys.append(
            python_obj_to_dynamo_obj(
                {
                    "key1": f"timestamp_events_{user_data['key2']}",
                    "key2": new_date_obj.strftime("%Y-%m-%d"),
                }
            )
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
    output_diary = []
    for response_item in responses:
        python_item = dynamo_obj_to_python_obj(response_item)
        if "values" in python_item:
            output_values.append({"date": python_item["key2"], "values": python_item["values"]})
        elif "entries" in python_item:
            output_diary.append({"date": python_item["key2"], "entries": python_item["entries"]})
    return format_response(
        event=event,
        http_code=200,
        body={"values": output_values, "foodDiary": output_diary},
    )


@authenticate
def set_values_route(event, user_data, body):
    phone = user_data["key2"]

    if "values" not in body or not body["values"]:
        return format_response(
            event=event,
            http_code=400,
            body="You need to provide a list of values",
        )

    values = body["values"]

    if "date" not in body:
        date = datetime.date.today()
    else:
        date = body["date"]

    python_data = {
        "key1": f"timestamp_values_{phone}",
        "key2": date,
        "values": values,
    }
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
