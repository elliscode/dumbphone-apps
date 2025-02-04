import datetime

from .utils import (
    authenticate,
    format_response,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    dynamo_obj_to_python_obj,
)


def parse_message_as_note(msg_text, user_data, from_number):
    current_date_with_dots = datetime.datetime.now().strftime("%Y.%m.%d.%H.%M.%S")
    phone = user_data["key2"]
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj({"key1": f"note_{phone}", "key2": current_date_with_dots, "note": msg_text}),
    )
    return {
        "phone": from_number,
        "message": f"Added a note to your account named {current_date_with_dots}",
    }


@authenticate
def get_notes_route(event, user_data, body):
    phone = user_data["key2"]
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            "key1": {
                "AttributeValueList": [{"S": f"note_{phone}"}],
                "ComparisonOperator": "EQ",
            },
        },
    )

    output = []

    if "Items" in response:
        for item in response["Items"]:
            python_item = dynamo_obj_to_python_obj(item)
            note_name = python_item["key2"]
            note_text = python_item["note"]
            output.append({"name": note_name, "text": note_text})

    return format_response(
        event=event,
        http_code=200,
        body={"notes": output},
    )


@authenticate
def set_note_route(event, user_data, body):
    note_id = body["note_id"]
    previous_note_id = body["previous_note_id"]
    phone = user_data["key2"]
    response = dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj({"key1": f"note_{phone}", "key2": note_id, "note": body["note"]}),
    )
    if previous_note_id != note_id:
        response = dynamo.delete_item(
            TableName=TABLE_NAME,
            Key=python_obj_to_dynamo_obj({"key1": f"note_{phone}", "key2": previous_note_id}),
        )

    return format_response(
        event=event,
        http_code=200,
        body=f"Successfully set note with ID {note_id}",
    )


@authenticate
def delete_note_route(event, user_data, body):
    note_id = body["note_id"]
    phone = user_data["key2"]
    response = dynamo.delete_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": f"note_{phone}", "key2": note_id}),
    )

    return format_response(
        event=event,
        http_code=200,
        body=f"Successfully deleted note with ID {note_id}",
    )
