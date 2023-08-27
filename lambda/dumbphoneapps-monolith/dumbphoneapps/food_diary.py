import time
import re
from .utils import (
    format_response,
    authenticate,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    dynamo_obj_to_python_obj,
    create_id,
)


@authenticate
def create_serving_route(event, user_data, body):
    food_response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "food", "key2": body["hash"]}),
    )
    food = dynamo_obj_to_python_obj(food_response["Item"])

    body_quantity = body["quantity"]
    body_unit = body["name"]
    body_calories = body["calories"]

    multiplier = float(body_calories) / float(food["metadata"]["calories"])

    found_serving = None
    for food_serving in food["metadata"]["servings"]:
        if body_unit == food_serving["name"]:
            found_food_serving = food_serving
            break

    if found_serving:
        return format_response(
            event=event,
            http_code=500,
            body=f"Unit already exists for {body_unit}",
        )

    print(body_calories)
    print(multiplier)
    print(body_unit)
    print(body_quantity)

    new_serving = {
        "amount": f"{body_quantity}",
        "multiplier": f"{multiplier}",
        "name": f"{body_unit}",
    }

    food["metadata"]["servings"].append(new_serving)

    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(food),
    )

    return format_response(
        event=event,
        http_code=200,
        body=f"Created unit {body_unit} on food {food['key2']}",
    )


@authenticate
def set_serving_route(event, user_data, body):
    diary_response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": body["key"], "key2": body["timestamp"]}),
    )
    diary_entry = dynamo_obj_to_python_obj(diary_response["Item"])
    food_response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "food", "key2": body["hash"]}),
    )
    food = dynamo_obj_to_python_obj(food_response["Item"])
    body_amount = body["amount"]
    body_unit = body["name"]
    found_food_serving = None
    for food_serving in food["metadata"]["servings"]:
        if body_unit == food_serving["name"]:
            found_food_serving = food_serving
            break
    if not found_food_serving:
        return format_response(
            event=event,
            http_code=404,
            body=f"No unit found for {body_unit}",
        )
    determined_multiplier = (
        float(found_food_serving["multiplier"])
        * float(body_amount)
        / float(found_food_serving["amount"])
    )
    diary_entry[
        "calories"
    ] = f"{determined_multiplier * float(food['metadata']['calories'])}"
    diary_entry["multiplier"] = f"{determined_multiplier}"
    diary_entry["unit"] = body_unit
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(diary_entry),
    )
    return format_response(
        event=event,
        http_code=200,
        body=f"Updated {body['key']} {body['timestamp']}",
    )


@authenticate
def get_serving_route(event, user_data, body):
    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "food", "key2": body["hash"]}),
    )
    output = dynamo_obj_to_python_obj(response["Item"])
    output["hash"] = output["key2"]
    output.pop("key1")
    output.pop("key2")
    print(output)
    return format_response(
        event=event,
        http_code=200,
        body=output,
    )


@authenticate
def delete_route(event, user_data, body):
    dynamo.delete_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": body["key"], "key2": body["timestamp"]}),
    )
    return format_response(
        event=event,
        http_code=200,
        body="Successfully deleted entry",
    )


@authenticate
def add_route(event, user_data, body):
    if "hash" in body:
        response = dynamo.get_item(
            TableName=TABLE_NAME,
            Key=python_obj_to_dynamo_obj({"key1": "food", "key2": body["hash"]}),
        )
        food_item = dynamo_obj_to_python_obj(response["Item"])
        dynamo.put_item(
            TableName=TABLE_NAME,
            Item=python_obj_to_dynamo_obj(
                {
                    "key1": f'diary_{user_data["key2"]}_{body["date"]}',
                    "key2": f"{time.mktime(time.gmtime())}",
                    "name": f'{food_item["name"]}',
                    "calories": f'{food_item["metadata"]["calories"]}',
                    "food_id": f'{body["hash"]}',
                    "multiplier": f"1",
                    "unit": f"kcal",
                }
            ),
        )
        return format_response(
            event=event,
            http_code=200,
            body="Saved a diary entry",
        )
    else:
        re_match = re.search(r"^(\d+\.*\d*)(.*)$", body["serving"])
        serving_amount = re_match.group(1)
        serving_name = re_match.group(2)
        new_food = {
            "key1": "food",
            "key2": create_id(32),
            "name": body["foodName"],
            "metadata": {
                "alcohol": f"{body['alcohol']}",
                "caffeine": f"{body['caffeine']}",
                "calories": f"{body['calories']}",
                "carbs": f"{body['carbs']}",
                "fat": f"{body['fat']}",
                "protein": f"{body['protein']}",
                "servings": [
                    {
                        "amount": f"{serving_amount}",
                        "multiplier": f"{1}",
                        "name": serving_name,
                    },
                ],
            },
        }
        new_diary_entry = {
            "key1": f"diary_{user_data['key2']}_{body['date']}",
            "key2": f"{time.mktime(time.gmtime())}",
            "calories": f"{new_food['metadata']['calories']}",
            "food_id": new_food["key2"],
            "multiplier": f"{1}",
            "name": new_food["name"],
            "unit": serving_name,
        }
        dynamo.put_item(
            TableName=TABLE_NAME,
            Item=python_obj_to_dynamo_obj(new_food),
        )
        dynamo.put_item(
            TableName=TABLE_NAME,
            Item=python_obj_to_dynamo_obj(new_diary_entry),
        )
        return format_response(
            event=event,
            http_code=200,
            body=f"Successfully added food {new_food['key2']}",
        )


@authenticate
def get_day_route(event, user_data, body):
    entries = []
    date = body["date"]
    key1 = f'diary_{user_data["key2"]}_{date}'
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            "key1": {"AttributeValueList": [{"S": key1}], "ComparisonOperator": "EQ"},
        },
    )
    for item in response["Items"]:
        python_item = dynamo_obj_to_python_obj(item)
        result = {}
        result["food"] = {"hash": python_item["food_id"], "name": python_item["name"]}
        result["derived_values"] = {"calories": python_item["calories"]}
        result["timestamp"] = python_item["key2"]
        entries.append(result)
    return format_response(
        event=event,
        http_code=200,
        body={"entries": entries, "key": key1},
    )


@authenticate
def search_route(event, user_data, body):
    search_term = body["query"].lower().strip()
    if not search_term:
        return format_response(
            event=event,
            http_code=200,
            body=[],
        )
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            "key1": {
                "AttributeValueList": [{"S": "food_token"}],
                "ComparisonOperator": "EQ",
            },
            "key2": {
                "AttributeValueList": [
                    {
                        "S": search_term,
                    }
                ],
                "ComparisonOperator": "BEGINS_WITH",
            },
        },
    )
    items = []
    ids = []
    for item in response["Items"]:
        python_item = dynamo_obj_to_python_obj(item)
        for result in python_item["food_ids"]:
            if result["hash"] in ids:
                continue
            items.append(result)
            ids.append(result["hash"])

    sorted_items = sorted(items, key=lambda d: d["name"].lower())

    return format_response(
        event=event,
        http_code=200,
        body=sorted_items,
    )
