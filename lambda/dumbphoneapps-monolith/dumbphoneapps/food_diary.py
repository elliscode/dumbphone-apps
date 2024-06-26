import json
import time

from .utils import (
    format_response,
    authenticate,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    dynamo_obj_to_python_obj,
    create_id,
    ADMIN_PHONE,
)

ALL_VALUE_KEYS = ["alcohol", "caffeine", "calories", "carbs", "fat", "protein"]


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
            if current_data["hash"] == food_id and current_data["name"] == food_name:
                print("matches!")
                break
            found_index = found_index + 1
        if found_index < len(json_data["food_ids"]):
            json_data["food_ids"].pop(found_index)
        if len(json_data["food_ids"]) == 0:
            json_data.pop("food_ids")
            items.append({"DeleteRequest": {"Key": python_obj_to_dynamo_obj(json_data)}})
        else:
            items.append({"PutRequest": {"Item": python_obj_to_dynamo_obj(json_data)}})
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
    if user_data["key2"] != ADMIN_PHONE:
        return format_response(
            event=event,
            http_code=401,
            body="You are not authorized to modify foods in the database",
        )
    diary_response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": f"diary_{user_data['key2']}", "key2": body["date"]}),
    )
    diary_entry = dynamo_obj_to_python_obj(diary_response["Item"])
    food_response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": "food", "key2": body["hash"]}),
    )
    food = dynamo_obj_to_python_obj(food_response["Item"])
    if body.get("name"):
        print(f'modifying {food["name"]} to {body["name"]}')
        remove_all_tokens(food["key2"], food["name"])
        food["name"] = body["name"]
        add_all_tokens(food["key2"], food["name"])
        diary_entry["entries"][body["timestamp"]]["name"] = food["name"]
    if body.get("ingredients"):
        print(f"Setting {food['name']} to a recipe!")
        food_keys = []
        for ingredient in body["ingredients"]:
            key = python_obj_to_dynamo_obj(
                {
                    "key1": "food",
                    "key2": ingredient["hash"],
                }
            )
            if key not in food_keys:
                food_keys.append(key)
        response = dynamo.batch_get_item(
            RequestItems={
                TABLE_NAME: {
                    "Keys": food_keys,
                }
            }
        )
        food_map = {}
        responses = response["Responses"][TABLE_NAME]
        for food_item_dynamo in responses:
            food_item = dynamo_obj_to_python_obj(food_item_dynamo)
            food_map[food_item["key2"]] = food_item

        totals = {}
        for ingredient in body["ingredients"]:
            food_hash = ingredient["hash"]
            food_item = food_map[food_hash]
            for value_key in ALL_VALUE_KEYS:
                if food_item["metadata"][value_key]:
                    totals[value_key] = totals.get(value_key, 0) + (
                        float(ingredient["multiplier"])
                        * float(ingredient["serving"]["multiplier"])
                        * float(food_item["metadata"][value_key])
                    )

        food["metadata"]["ingredients"] = body["ingredients"]
        for value_key in ALL_VALUE_KEYS:
            this_value = totals[value_key]
            string_value = f"{totals[value_key]:.3g}"
            if this_value > 100:
                string_value = f"{round(totals[value_key])}"
            food["metadata"][value_key] = string_value

        food["metadata"]["servings"] = [
            {
                "amount": f"1",
                "multiplier": f"{1}",
                "name": "recipe",
            },
            {
                "amount": f"1",
                "multiplier": f"{1}",
                "name": "serving",
            },
        ]
    else:
        for value_key in ALL_VALUE_KEYS:
            if body[value_key]:
                food["metadata"][value_key] = body[value_key]
    print(food)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(food),
    )
    print(diary_entry)
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
    if user_data["key2"] != ADMIN_PHONE:
        return format_response(
            event=event,
            http_code=401,
            body="You are not authorized to add servings to the database",
        )
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
        if food_serving["name"].lower() == body_unit.lower():
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
        Key=python_obj_to_dynamo_obj({"key1": f"diary_{user_data['key2']}", "key2": body["date"]}),
    )
    diary_entry = dynamo_obj_to_python_obj(diary_response["Item"])
    serving_item = diary_entry["entries"][body["timestamp"]]
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
        float(found_food_serving["multiplier"]) * float(body_amount) / float(found_food_serving["amount"])
    )
    if "calculated_values" not in serving_item:
        serving_item["calculated_values"] = {}
    for value_key in ALL_VALUE_KEYS:
        serving_item["calculated_values"][value_key] = f"{determined_multiplier * float(food['metadata'][value_key])}"
    serving_item["calculated_values"]["serving_amount"] = f"{body_amount}"
    serving_item["calculated_values"]["serving_name"] = f"{found_food_serving['name']}".strip()
    serving_item["multiplier"] = f"{determined_multiplier}"
    serving_item["unit"] = body_unit
    diary_entry["entries"][body["timestamp"]] = serving_item

    serving_entry = {
        "key1": f"serving_{user_data['key2']}",
        "key2": body["hash"],
        "multiplier": f"{determined_multiplier}",
        "unit": body_unit,
        "expiration": int(time.time()) + (365 * 24 * 60 * 60),
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
    if user_data["key2"] != ADMIN_PHONE:
        return format_response(
            event=event,
            http_code=401,
            body="You are not authorized to delete foods from the database",
        )
    partition_key = f"diary_{user_data['key2']}"
    sort_key = body["date"]
    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": partition_key, "key2": sort_key}),
    )
    if "Item" not in response:
        return format_response(
            event=event,
            http_code=404,
            body="Item not found",
        )
    diary_entry = dynamo_obj_to_python_obj(response["Item"])
    deleted_item = diary_entry["entries"].pop(body["timestamp"])
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(diary_entry),
    )
    return format_response(
        event=event,
        http_code=200,
        body=f"Successfully deleted item {json.dumps(deleted_item)}",
    )


@authenticate
def add_route(event, user_data, body):
    sort_key = body["date"]
    partition_key = f'diary_{user_data["key2"]}'
    # get todays diary, if none exists, create it
    diary_response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": partition_key, "key2": sort_key}),
    )
    if "Item" not in diary_response:
        current_entry = {
            "key1": partition_key,
            "key2": sort_key,
            "entries": {},
        }
    else:
        current_entry = dynamo_obj_to_python_obj(diary_response["Item"])
    # if no food hash, lets check if this token exists, case-insensitive,
    # then check if the full food name exists in that token, this prevents
    # duplocate values that I have seen in the past, when the user presses
    # the "Add" button instead of clicking on the relevant food
    food_hashes = []
    if "hash" in body:
        food_hashes = [body.get("hash")]
    elif "hashes" in body:
        food_hashes = body.get("hashes")
    if not food_hashes:
        return format_response(
            event=event,
            http_code=400,
            body="Missing food hash",
        )
    food_hashes = sorted(set(food_hashes))
    items_to_write = []
    for food_index, food_hash in enumerate(food_hashes):
        food_key = {"key1": "food", "key2": food_hash}
        previous_serving_key = {
            "key1": f"serving_{user_data['key2']}",
            "key2": food_hash,
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
                "key2": food_hash,
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
                "key2": food_hash,
                "multiplier": f"{1}",
                "unit": "kcal",
            }

        serving_entry["expiration"] = int(time.time()) + (30 * 24 * 60 * 60)

        calculated_values = {}
        for value_key in ALL_VALUE_KEYS:
            calculated_values[value_key] = (
                f"{float(food_item['metadata'][value_key]) * float(serving_entry['multiplier'])}"
            )
        serving_amount = (
            float(actual_serving["amount"]) * float(serving_entry["multiplier"]) / float(actual_serving["multiplier"])
        )
        calculated_values["serving_amount"] = f"{serving_amount:g}"
        calculated_values["serving_name"] = f"{serving_entry['unit']}".strip()

        new_diary_entry = {
            "name": f'{food_item["name"]}',
            "calculated_values": calculated_values,
            "food_id": f"{food_hash}",
            "multiplier": f"{serving_entry['multiplier']}",
            "unit": f"{serving_entry['unit']}",
        }

        print(current_entry)
        current_entry["entries"][f"{time.mktime(time.gmtime())}{food_index:0>3}"] = new_diary_entry
        print(current_entry)

        items_to_write.append({"PutRequest": {"Item": python_obj_to_dynamo_obj(serving_entry)}})

        if len(items_to_write) >= 25:
            print(json.dumps(items_to_write))
            dynamo.batch_write_item(RequestItems={TABLE_NAME: items_to_write})
            items_to_write = []
    items_to_write.append({"PutRequest": {"Item": python_obj_to_dynamo_obj(current_entry)}})
    if len(items_to_write) > 0:
        print(json.dumps(items_to_write))
        dynamo.batch_write_item(RequestItems={TABLE_NAME: items_to_write})
        items_to_write = []
    return format_response(
        event=event,
        http_code=200,
        body="Saved the diary entries",
    )


@authenticate
def create_food_route(event, user_data, body):
    sort_key = body["date"]
    partition_key = f'diary_{user_data["key2"]}'
    # get todays diary, if none exists, create it
    diary_response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": partition_key, "key2": sort_key}),
    )
    if "Item" not in diary_response:
        current_entry = {
            "key1": partition_key,
            "key2": sort_key,
            "entries": {},
        }
    else:
        current_entry = dynamo_obj_to_python_obj(diary_response["Item"])
    # if no food hash, lets check if this token exists, case-insensitive,
    # then check if the full food name exists in that token, this prevents
    # duplocate values that I have seen in the past, when the user presses
    # the "Add" button instead of clicking on the relevant food
    food_hash = body.get("hash")
    if not food_hash:
        full_food_token = body.get("name").lower().strip()
        food_token_response = dynamo.get_item(
            TableName=TABLE_NAME,
            Key=python_obj_to_dynamo_obj({"key1": "food_token", "key2": full_food_token}),
        )
        if "Item" in food_token_response:
            food_token_result = dynamo_obj_to_python_obj(food_token_response["Item"])
            for food_id_token in food_token_result["food_ids"]:
                if food_id_token["name"].lower().strip() == full_food_token:
                    food_hash = food_id_token["hash"]
    if food_hash:
        return format_response(
            event=event,
            http_code=400,
            body="This food already exists in the database",
        )
    else:
        if user_data["key2"] != ADMIN_PHONE:
            return format_response(
                event=event,
                http_code=401,
                body="You are not authorized to add foods to the database",
            )
        metadata = {
            "servings": [
                {
                    "amount": f"{1}",
                    "multiplier": f"{1}",
                    "name": "serving",
                },
            ],
        }
        for value_key in ALL_VALUE_KEYS:
            food_value_string = f"{body.get(value_key, 0)}"
            if not food_value_string:
                food_value_string = "0.0"
            try:
                float(food_value_string)
            except:
                food_value_string = "0.0"
            metadata[value_key] = food_value_string
        new_food = {
            "key1": "food",
            "key2": create_id(32),
            "name": body["name"],
            "metadata": metadata,
        }

        calculated_values = {}
        for value_key in ALL_VALUE_KEYS:
            calculated_values[value_key] = new_food["metadata"][value_key]

        new_diary_entry = {
            "calculated_values": calculated_values,
            "food_id": new_food["key2"],
            "multiplier": f"{1}",
            "name": new_food["name"],
            "unit": "serving",
        }
        print(current_entry)
        current_entry["entries"][f"{time.mktime(time.gmtime())}"] = new_diary_entry
        print(current_entry)
        dynamo.put_item(
            TableName=TABLE_NAME,
            Item=python_obj_to_dynamo_obj(new_food),
        )
        dynamo.put_item(
            TableName=TABLE_NAME,
            Item=python_obj_to_dynamo_obj(current_entry),
        )
        add_all_tokens(new_food["key2"], new_food["name"])
        return format_response(
            event=event,
            http_code=200,
            body=f"Successfully added food {new_food['key2']}",
        )


@authenticate
def get_day_route(event, user_data, body):
    sort_key = body["date"]
    partition_key = f'diary_{user_data["key2"]}'
    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": partition_key, "key2": sort_key}),
    )

    food_diary_entries = {}
    if "Item" in response:
        python_item = dynamo_obj_to_python_obj(response["Item"])
        food_diary_entries = python_item["entries"]

    totals = {}
    for timestamp, food_diary_entry in food_diary_entries.items():
        for vk in ALL_VALUE_KEYS:
            totals[vk] = totals.get(vk, 0) + float(food_diary_entry.get("calculated_values", {}).get(vk, 0))

    return format_response(
        event=event,
        http_code=200,
        body={
            "entries": food_diary_entries,
            "diary_key": partition_key,
            "date": sort_key,
            "totals": totals,
        },
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
