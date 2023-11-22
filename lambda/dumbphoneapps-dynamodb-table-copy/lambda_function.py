import json
import csv
import boto3
import secrets
from boto3.dynamodb.types import TypeDeserializer, TypeSerializer
from decimal import Decimal

SOURCE_TABLE = 'dumbphoneapps-test015'
DESTINATION_TABLE = 'dumbphoneapps-test016'


def lambda_handler(event, context):
    hash_key_list = ['list', 'userlist', 'user', 'token']
    dynamo = boto3.client('dynamodb')
    for hash_key in hash_key_list:
        response = dynamo.query(
            TableName=SOURCE_TABLE,
            KeyConditions={
                'key1': {
                    'AttributeValueList': [
                        {
                            'S': hash_key
                        }
                    ],
                    'ComparisonOperator': 'EQ'
                },
            },
        )
        items = []
        for item in response['Items']:
            items.append({
                'PutRequest': {
                    'Item': item
                }
            })
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={
                    DESTINATION_TABLE: items
                })
                items = []
                print(response)
        if len(items) > 0:
            response = dynamo.batch_write_item(RequestItems={
                DESTINATION_TABLE: items
            })
            items = []
            print(response)

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