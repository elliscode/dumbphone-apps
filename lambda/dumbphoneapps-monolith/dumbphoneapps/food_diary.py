from .utils import (
    DOMAIN_NAME,
    get_user_data,
    format_response,
    sqs,
    authenticate,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    digits,
    lowercase_letters,
    uppercase_letters,
    dynamo_obj_to_python_obj,
    parse_body,
    ADMIN_PHONE,
    create_id,
)


@authenticate
def get_day_route(event, user_data, body):
    return format_response(
        event=event,
        http_code=200,
        body={'entries': []},
    )


@authenticate
def search_route(event, user_data, body):
    search_term = body['query'].lower().strip()
    if not search_term:
        return format_response(
            event=event,
            http_code=200,
            body=[],
        )
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            'key1': {
                'AttributeValueList': [
                    {
                        'S': 'food'
                    }
                ],
                'ComparisonOperator': 'EQ'
            },
            'key2': {
                'AttributeValueList': [
                    {
                        'S': search_term,
                    }
                ],
                'ComparisonOperator': 'BEGINS_WITH'
            },
        },
        Limit=10,
    )
    items = []
    for item in response['Items']:
        python_item = dynamo_obj_to_python_obj(item)
        items.append({'hash': python_item['key2'], 'name': python_item['name']})

    return format_response(
        event=event,
        http_code=200,
        body=items,
    )