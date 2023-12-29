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


def determine_tokens(food_id, food_name):
    food_tokens = {}
    food_key = food_name.lower()
    split_food_key = food_key.split()
    for i in range(0, len(split_food_key)):
        food_token = ""
        for j in range(i, len(split_food_key)):
            if food_token:
                food_token += " "
            food_token += split_food_key[j]
        if food_token not in food_tokens:
            food_tokens[food_token] = []
        food_tokens[food_token].append({"hash": food_id, "name": food_name})
    return food_tokens


def remove_all_tokens(food_id, food_name):
    items = []
    token_map = determine_tokens(food_id, food_name)
    for token, value in token_map.items():
        for token_value in value:
            response = dynamo.get_item(
                TableName=TABLE_NAME,
                Key=python_obj_to_dynamo_obj({"key1": "food_token", "key2": token}),
            )
            if "Item" not in response:
                continue
            json_data = dynamo_obj_to_python_obj(response["Item"])
            found_index = 0
            while found_index < len(json_data["food_ids"]):
                current_data = json_data["food_ids"][found_index]
                print(current_data)
                print(food_id)
                print(food_name)
                if (
                    current_data["hash"] == food_id
                    and current_data["name"] == food_name
                ):
                    print("matches!")
                    break
                found_index = found_index + 1
            if found_index < len(json_data["food_ids"]):
                json_data["food_ids"].pop(found_index)
            if len(json_data["food_ids"]) == 0:
                json_data.pop("food_ids")
                items.append(
                    {"DeleteRequest": {"Key": python_obj_to_dynamo_obj(json_data)}}
                )
            else:
                items.append(
                    {"PutRequest": {"Item": python_obj_to_dynamo_obj(json_data)}}
                )
            if len(items) >= 25:
                print(items)
                response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
                items = []
                print(response)
    if len(items) > 0:
        print(items)
        response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
        items = []
        print(response)


def add_all_tokens(food_id, food_name):
    items = []
    token_map = determine_tokens(food_id, food_name)
    for token, value in token_map.items():
        for token_value in value:
            response = dynamo.get_item(
                TableName=TABLE_NAME,
                Key=python_obj_to_dynamo_obj({"key1": "food_token", "key2": token}),
            )
            if "Item" not in response:
                json_data = {"key1": "food_token", "key2": token, "food_ids": []}
            else:
                json_data = dynamo_obj_to_python_obj(response["Item"])
            json_data["food_ids"].append(token_value)
            items.append({"PutRequest": {"Item": python_obj_to_dynamo_obj(json_data)}})
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
                items = []
    if len(items) > 0:
        response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
        items = []


@authenticate
def set_food_route(event, user_data, body):
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
    if body["name"]:
        print(f'modifying {food["name"]} to {body["name"]}')
        remove_all_tokens(food["key2"], food["name"])
        food["name"] = body["name"]
        add_all_tokens(food["key2"], food["name"])
        diary_entry["name"] = food["name"]
    if body["alcohol"]:
        food["metadata"]["alcohol"] = body["alcohol"]
    if body["caffeine"]:
        food["metadata"]["caffeine"] = body["caffeine"]
    if body["calories"]:
        food["metadata"]["calories"] = body["calories"]
    if body["carbs"]:
        food["metadata"]["carbs"] = body["carbs"]
    if body["fat"]:
        food["metadata"]["fat"] = body["fat"]
    if body["protein"]:
        food["metadata"]["protein"] = body["protein"]
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(food),
    )
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(diary_entry),
    )
    return format_response(
        event=event,
        http_code=200,
        body=f'Successfully updated {food["key2"]}',
    )


@authenticate
def get_food_route(event, user_data, body):
    food_response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "food", "key2": body["hash"]}),
    )
    food = dynamo_obj_to_python_obj(food_response["Item"])
    food["hash"] = food["key2"]
    food.pop("key1")
    food.pop("key2")
    print(food)
    return format_response(
        event=event,
        http_code=200,
        body=food,
    )


@authenticate
def create_serving_route(event, user_data, body):
    food_response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "food", "key2": body["hash"]}),
    )
    food = dynamo_obj_to_python_obj(food_response["Item"])

    body_quantity = body["quantity"]
    body_unit = body["name"].strip()
    body_calories = body["calories"]

    multiplier = float(body_calories) / float(food["metadata"]["calories"])

    found_serving = None
    for food_serving in food["metadata"]["servings"]:
        if food_serving["name"].endswith(body_unit):
            found_serving = food_serving
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
        if body_unit.strip() == food_serving["name"].strip():
            found_food_serving = food_serving
            break
    if not found_food_serving:
        if body_unit == "kcal":
            found_food_serving = {
                "multiplier": "1",
                "amount": food["metadata"]["calories"],
                "name": "kcal",
            }
        else:
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
    print(determined_multiplier)
    if "calculated_values" not in diary_entry:
        diary_entry["calculated_values"] = {}
    diary_entry["calculated_values"]["calories"] = f"{determined_multiplier * float(food['metadata']['calories'])}"
    diary_entry["calculated_values"]["serving_amount"] = f"{body_amount}"
    diary_entry["calculated_values"]["serving_name"] = f"{found_food_serving['name']}"
    diary_entry["multiplier"] = f"{determined_multiplier}"
    diary_entry["unit"] = body_unit
    print(diary_entry)

    serving_entry = {
        "key1": f"serving_{user_data['key2']}",
        "key2": body["hash"],
        "multiplier": f"{determined_multiplier}",
        "unit": body_unit,
        "expiration": int(time.time()) + (30 * 24 * 60 * 60),
    }

    items = [
        {"PutRequest": {"Item": python_obj_to_dynamo_obj(diary_entry)}},
        {"PutRequest": {"Item": python_obj_to_dynamo_obj(serving_entry)}},
    ]

    dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
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
        food_key = {"key1": "food", "key2": body["hash"]}
        previous_serving_key = {
            "key1": f"serving_{user_data['key2']}",
            "key2": body["hash"],
        }
        response = dynamo.batch_get_item(
            RequestItems={
                TABLE_NAME: {
                    "Keys": [
                        python_obj_to_dynamo_obj(food_key),
                        python_obj_to_dynamo_obj(previous_serving_key),
                    ]
                }
            }
        )
        responses = response["Responses"][TABLE_NAME]
        print(responses)
        food_item = None
        serving_entry = None
        for response_item in responses:
            python_response_item = dynamo_obj_to_python_obj(response_item)
            if python_response_item["key1"] == "food":
                food_item = python_response_item
            elif python_response_item["key1"] == f"serving_{user_data['key2']}":
                serving_entry = python_response_item
        if not serving_entry:
            serving_entry = {
                "key1": f"serving_{user_data['key2']}",
                "key2": body["hash"],
                "multiplier": f"{1}",
                "unit": "kcal",
            }
        
        actual_serving = None
        for food_serving in food_item["metadata"]["servings"]:
            if "name" in food_serving and food_serving["name"].strip() == serving_entry["unit"].strip():
                actual_serving = food_serving
                break
        if actual_serving is None:
            actual_serving = {
                "multiplier": "1",
                "amount": food_item["metadata"]["calories"],
                "name": "kcal",
            }
            serving_entry = {
                "key1": f"serving_{user_data['key2']}",
                "key2": body["hash"],
                "multiplier": f"{1}",
                "unit": "kcal",
            }
            

        serving_entry["expiration"] = int(time.time()) + (30 * 24 * 60 * 60)

        calculated_values = {}
        for value_key in ['alcohol', 'caffeine', 'calories', 'carbs', 'fat', 'protein',]:
            calculated_values[value_key] = f"{float(food_item['metadata'][value_key]) * float(serving_entry['multiplier'])}"
        serving_amount = float(actual_serving['amount']) * float(serving_entry['multiplier']) / float(actual_serving['multiplier'])
        calculated_values["serving_amount"] = f"{serving_amount:g}"
        calculated_values["serving_name"] = f"{serving_entry['unit']}"

        diary_entry = {
            "key1": f'diary_{user_data["key2"]}_{body["date"]}',
            "key2": f"{time.mktime(time.gmtime())}",
            "name": f'{food_item["name"]}',
            "calculated_values": calculated_values,
            "food_id": f'{body["hash"]}',
            "multiplier": f"{serving_entry['multiplier']}",
            "unit": f"{serving_entry['unit']}",
        }

        items = [
            {"PutRequest": {"Item": python_obj_to_dynamo_obj(diary_entry)}},
            {"PutRequest": {"Item": python_obj_to_dynamo_obj(serving_entry)}},
        ]

        dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
        return format_response(
            event=event,
            http_code=200,
            body="Saved a diary entry",
        )
    else:
        re_match = re.search(r"^(\d+\.*\d*)(.*)$", body["serving"])
        serving_amount = re_match.group(1)
        serving_name = re_match.group(2).strip()
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

        calculated_values = {}
        for value_key in ['alcohol', 'caffeine', 'calories', 'carbs', 'fat', 'protein',]:
            calculated_values[value_key] = new_food['metadata'][value_key]

        new_diary_entry = {
            "key1": f"diary_{user_data['key2']}_{body['date']}",
            "key2": f"{time.mktime(time.gmtime())}",
            "calculated_values": calculated_values,
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
        add_all_tokens(new_food["key2"], new_food["name"])
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
    total = 0
    for item in response["Items"]:
        python_item = dynamo_obj_to_python_obj(item)
        result = {}
        result["food"] = {"hash": python_item["food_id"], "name": python_item["name"]}
        if "calculated_values" in python_item:
            result["calculated_values"] = python_item["calculated_values"]
        elif "calories" in python_item:
            result["calculated_values"] = {"calories": python_item["calories"]}
        result["timestamp"] = python_item["key2"]
        total = total + float(result["calculated_values"]["calories"])
        entries.append(result)
    return format_response(
        event=event,
        http_code=200,
        body={"entries": entries, "key": key1, "total": int(total)},
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
