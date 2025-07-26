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

from .input_validation import (
    validate_date,
    validate_schema,
    validate_unix_time,
    validate_money,
)

TRANSACTION_SCHEMA = {
    "type": dict,
    "fields": [
        {"name": "timestamp", "type": validate_unix_time},
        {"name": "type", "type": str},
        {"name": "amount", "type": validate_money},
        {"name": "recurring", "type": dict, "optional": True, "fields": [
            {"name": "frequency", "type": str},
            {"name": "amount", "type": int},
        ]},
    ],
}


@authenticate
def add_transaction(event, user_data, body):
    body = body["quantity"]
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
