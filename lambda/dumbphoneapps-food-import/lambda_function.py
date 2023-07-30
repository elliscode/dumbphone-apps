import json
import csv
import boto3
import secrets
import os
from boto3.dynamodb.types import TypeDeserializer, TypeSerializer
from decimal import Decimal

# TABLE_NAME = 'dumbphoneapps-test011'
TABLE_NAME = os.environ["TABLE_NAME"]

digits = "0123456789"
lowercase_letters = "abcdefghijklmnopqrstuvwxyz"
uppercase_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def lambda_handler(event, context):
    # import_foods()
    # import_diary()
    # query_foods()
    import_foods_with_tokens()



def query_foods():
    dynamo = boto3.client('dynamodb')
    response = dynamo.query(
        TableName=TABLE_NAME,
        IndexName='name-index',
        KeyConditions={
            'key1': {
                'AttributeValueList': [
                    {
                        'S': 'food'
                    }
                ],
                'ComparisonOperator': 'EQ'
            },
            'name': {
                'AttributeValueList': [
                    {
                        'S': 'chicken'
                    }
                ],
                'ComparisonOperator': 'BEGINS_WITH'
            },
        },
        AttributesToGet=[
            'name',
            'displayName',
            'key1',
            'key2',
        ],
    )
    print(response)
    output = {}
    for item in response['Items']:
        python_obj = dynamo_obj_to_python_obj(item)
        output[python_obj['name']] = python_obj
    print(output)
    

    
def query_foods_legacy():
    dynamo = boto3.client('dynamodb')
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
            }
        },
        QueryFilter={
            'name': {
                'AttributeValueList': [
                    {
                        'S': 'chicken'
                    }
                ],
                'ComparisonOperator': 'CONTAINS'
            }
        },
        AttributesToGet=[
            'name',
            'displayName',
            'key1',
            'key2',
        ],
    )
    print(response)
    output = {}
    for item in response['Items']:
        python_obj = dynamo_obj_to_python_obj(item)
        output[python_obj['name']] = python_obj
    print(output)
    
    
def get_all_foods(all_food_names):
    pass
    
    
    
def import_diary():
    s3 = boto3.client('s3')
    s3.download_file('daniel-townsend-dumbphoneapps-dev', 'diaryentry_join.csv', '/tmp/diaryentry_join.csv')

    dynamo = boto3.client('dynamodb')
    items = []
    
    with open('/tmp/diaryentry_join.csv') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            try:
                print(f'{row[0]} {row[1]} {row[2]} {row[3]} {row[4]} {row[5]}')
            except Exception as e:
                print(e)
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={
                    TABLE_NAME: items
                })
                items = []
                print(response)
        if len(items) > 0:
            response = dynamo.batch_write_item(RequestItems={
                TABLE_NAME: items
            })
            items = []
            print(response)
            
            

    
def import_foods_with_tokens():
    s3 = boto3.client('s3')
    s3.download_file('daniel-townsend-dumbphoneapps-dev', 'food.csv', '/tmp/food.csv')
    
    dynamo = boto3.client('dynamodb')
    items = []
    
    tokens = {}
    
    with open('/tmp/food.csv') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            try:
                food_id = create_id(32)
                food_name = row[1]
                items.append({
                    'PutRequest': {
                        'Item': python_obj_to_dynamo_obj({
                            'key1': 'food',
                            'key2': food_id,
                            'name': food_name,
                            'metadata': json.loads(row[2], parse_float=Decimal),
                        })
                    }
                })
                for token in food_name.split():
                    lower_token = token.lower().strip(', ()/')
                    if not lower_token:
                        continue
                    if lower_token not in tokens:
                        tokens[lower_token] = {}
                    if food_name not in tokens[lower_token]:
                        tokens[lower_token][food_name] = food_id
            except Exception as e:
                print(e)
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={
                    TABLE_NAME: items
                })
                items = []
                print(response)
                pass
        if len(items) > 0:
            response = dynamo.batch_write_item(RequestItems={
                TABLE_NAME: items
            })
            items = []
            print(response)
            pass
        print(json.dumps(tokens))
        
    items = []
    added_token_keys = {}
    added_tokens = {}
        
    for token, value in tokens.items():
        for food_name, food_id in value.items():
            token_key = f'token_{token}'
            if token_key not in added_tokens:
                items.append({
                    'PutRequest': {
                        'Item': python_obj_to_dynamo_obj({
                            'key1': f'token',
                            'key2': token,
                        })
                    }
                })
                added_tokens[token_key] = ''
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={
                    TABLE_NAME: items
                })
                items = []
                print(response)
                pass
            token_food_key = f'token_{token}_{food_id}'
            if token_food_key not in added_token_keys:
                items.append({
                    'PutRequest': {
                        'Item': python_obj_to_dynamo_obj({
                            'key1': f'token_{token}',
                            'key2': food_id,
                            'name': food_name,
                        })
                    }
                })
                added_token_keys[token_food_key] = ''
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={
                    TABLE_NAME: items
                })
                items = []
                print(response)
                pass
    if len(items) > 0:
        response = dynamo.batch_write_item(RequestItems={
            TABLE_NAME: items
        })
        items = []
        print(response)
        pass
            
    
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

    
def import_foods():
    s3 = boto3.client('s3')
    s3.download_file('daniel-townsend-dumbphoneapps-dev', 'food.csv', '/tmp/food.csv')
    
    dynamo = boto3.client('dynamodb')
    items = []
    
    with open('/tmp/food.csv') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            try:
                food_id = create_id(32)
                items.append({
                    'PutRequest': {
                        'Item': python_obj_to_dynamo_obj({
                            'key1': 'food',
                            'key2': food_id,
                            'name': row[1].lower(),
                            'displayName': row[1],
                            'metadata': json.loads(row[2], parse_float=Decimal),
                        })
                    }
                })
            except Exception as e:
                print(e)
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={
                    TABLE_NAME: items
                })
                items = []
                print(response)
        if len(items) > 0:
            response = dynamo.batch_write_item(RequestItems={
                TABLE_NAME: items
            })
            items = []
            print(response)
            
    
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }


def dynamo_obj_to_python_obj(dynamo_obj: dict) -> dict:
    deserializer = TypeDeserializer()
    return {k: deserializer.deserialize(v) for k, v in dynamo_obj.items()}


def python_obj_to_dynamo_obj(python_obj: dict) -> dict:
    serializer = TypeSerializer()
    return {k: serializer.serialize(v) for k, v in python_obj.items()}


def create_id(length):
    return "".join(
        secrets.choice(digits + lowercase_letters + uppercase_letters)
        for i in range(length)
    )
