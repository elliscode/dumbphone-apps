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

    return format_response(
        event=event,
        http_code=501,
        body=f"Not implemented :)",
        user_data=user_data,
    )
