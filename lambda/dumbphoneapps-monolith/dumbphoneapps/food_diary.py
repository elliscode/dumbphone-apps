import time
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
def add_route(event, user_data, body):
    if 'hash' in body:
        response = dynamo.get_item(
            TableName=TABLE_NAME,
            Key=python_obj_to_dynamo_obj({
                'key1': 'food',
                'key2': body['hash']
            }),
        )
        food_item = dynamo_obj_to_python_obj(response['Item'])
        dynamo.put_item(
            TableName=TABLE_NAME,
            Item=python_obj_to_dynamo_obj({
                'key1': f'diary_{user_data["key2"]}_{body["date"]}',
                'key2': f'{time.gmtime()}',
                'name': f'{food_item["name"]}',
                'calories': f'{food_item["metadata"]["calories"]}',
                'food_id': f'{body["hash"]}',
                'multiplier': f'1',
                'unit': f'kcal',
            }),
        )
        return format_response(
            event=event,
            http_code=200,
            body='Saved a diary entry',
        )
    else:
        return format_response(
            event=event,
            http_code=500,
            body='Unimplemented',
        )


@authenticate
def get_day_route(event, user_data, body):
    entries = []
    date = body['date']
    key1 = f'diary_{user_data["key2"]}_{date}'
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            'key1': {
                'AttributeValueList': [
                    {
                        'S': key1
                    }
                ],
                'ComparisonOperator': 'EQ'
            },
        },
    )
    for item in response['Items']:
        python_item = dynamo_obj_to_python_obj(item)
        result = {}
        result['food'] = {'hash': python_item['food_id'], 'name': python_item['name']}
        result['derived_values'] = {'calories': python_item['calories']}
        entries.append(result)
    return format_response(
        event=event,
        http_code=200,
        body={'entries': entries, 'key': key1},
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
                        'S': 'food_token'
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
    )
    items = []
    ids = []
    for item in response['Items']:
        python_item = dynamo_obj_to_python_obj(item)
        for result in python_item['food_ids']:
            if result['hash'] in ids:
                continue
            items.append(result)
            ids.append(result['hash'])

    sorted_items = sorted(items, key=lambda d: d['name'].lower())

    return format_response(
        event=event,
        http_code=200,
        body=sorted_items,
    )