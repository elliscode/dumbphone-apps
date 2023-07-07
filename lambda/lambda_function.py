import json
import time
import secrets
import boto3
import traceback
import re
from urllib.parse import parse_qsl
from botocore.client import BaseClient
from boto3.dynamodb.types import TypeDeserializer, TypeSerializer

digits = '0123456789'
letters = 'abcdefghijklmnopqrstuvwxxyz'
TABLE_NAME = 'dumbphoneapps-test002'
dynamo = boto3.client('dynamodb')
sqs = boto3.client('sqs')


def lambda_handler(event, context):
    try:
        print(json.dumps(event))
        result = route(event)
        print(result)
        return result
    except Exception:
        traceback.print_exc()
        return format_response(httpCode=500, body='Internal server error')

def format_response(httpCode, body, headers={}):
    if isinstance(body, str):
        body = {'message': body}
    all_headers = {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "https://aws.dumbphoneapps.com",
        "Access-Control-Allow-Methods": "POST,GET",
        "Access-Control-Allow-Credentials": "true",
    }
    all_headers.update(headers)
    return {
        'statusCode': httpCode,
        'body': json.dumps(body),
        'headers': all_headers,
    }

    
def route(event):
    if path_equals(event=event, method='POST', path='/otp'):
        return otp_route(event)
    if path_equals(event=event, method='POST', path='/login'):
        return login_route(event)
    if path_equals(event=event, method='GET', path='/getlist'):
        return getlist_route(event)
    return format_response(httpCode=404, body='No matching route found')
    
def getlist_route(event):
    print(event)
    cookie_string = event['headers']['cookie']
    cookie = parse_cookie(cookie_string)
    
    token_data = get_token(cookie)
    if token_data is None or token_data['expiration'] < int(time.time()):
        return format_response(httpCode=403, body='your session has expired')
    user_data = get_user_data(token_data['user'])
    
    return format_response(httpCode=200, body='passed token check')
    
def parse_cookie(input):
    cookies = input.split(' ')
    for cookie in cookies:
        parts = cookie.split('=')
        return parts[1]
    
    
def login_route(event):
    body = parse_body(event['body'])
    phone = body['phone']
    submitted_otp = body['otp']
    
    print(phone)
    print(submitted_otp)

    # get user data
    user_data = get_user_data(phone)
    if user_data is None:
        return format_response(httpCode=500, body='No user exists')
    
    # get otp
    otp_data = get_otp(phone)
    if otp_data is None or otp_data['expiration'] < int(time.time()):
        return format_response(httpCode=500, body='OTP expired, please try to log in again')
        
    if submitted_otp != otp_data['otp']:
        return format_response(httpCode=403, body='Incorrect OTP, please try again')
        
    # delete the OTP
    delete_otp(phone)
    # log in the user and send them the data
    token_data = create_token(phone)
    
    return format_response(
        httpCode=200, 
        body='successfully logged in',
        headers={
            'X-CSRF-TOKEN': token_data['csrf'],
            'Set-Cookie': f'dumbphoneapps-auth-token={token_data["key2"]}; Domain=.dumbphoneapps.com; HttpOnly',
        },
    )
        
    
def otp_route(event):
    body = parse_body(event['body'])
    phone = str(body['phone'])
    
    if not re.match('^\d{10}$', phone):
        return format_response(httpCode=500, body='Invalid phone supplied, must be 10 digits USA phone number')

    # get or create user data
    user_data = get_user_data(phone)
    if user_data is None:
        user_data = create_user_data(phone)
    print(user_data)
    
    # generate and set OTP
    otp_data = get_otp(phone)
    body_text = f'OTP already exists for {phone}, please log in'
    if otp_data is None or otp_data['expiration'] < int(time.time()):
        otp_value = ''.join(secrets.choice(digits) for i in range(7))
        otp_data = create_otp(phone, otp_value)
        
        # generate and send message if you are creating a new otp
        message = {
           'phone': phone,
           'message': f"{otp_data['otp']} is your dumbphoneapps.com one-time passcode\n\n@dumbphoneapps.com #{otp_data['otp']}"
        }
        # sqs.send_message(
        #     QueueUrl="https://sqs.us-east-1.amazonaws.com/646933935516/smsQueue",
        #     MessageBody=json.dumps(message)
        # )
        body_text = f'Successfully sent OTP to {phone}'
    print(otp_data)

    return format_response(httpCode=200, body=body_text)

def parse_body(body):
    if body.startswith('{'):
        return json.loads(body)
    else:
        return dict(parse_qsl(body))
        
def path_equals(event, method, path):
    eventPath = event['path']
    eventMethod = event['httpMethod']
    return eventMethod == method and (eventPath == path or eventPath == path + '/')

def create_token(phone):
    python_data = {
        'key1': 'token',
        'key2': ''.join(secrets.choice(digits) for i in range(32)),
        'csrf': ''.join(secrets.choice(digits) for i in range(32)),
        'user': phone,  #                 m    d    h    m    s
        'expiration': int(time.time()) + (4 * 30 * 24 * 60 * 60),
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data
    
def get_token(token_string):
    user_data_boto = dynamo.get_item(
        Key=python_obj_to_dynamo_obj({'key1': 'token', 'key2': token_string}),
        TableName=TABLE_NAME,
    )
    output = None
    if 'Item' in user_data_boto:
        output = dynamo_obj_to_python_obj(user_data_boto['Item'])
    return output

def create_otp(phone, otp_value):
    python_data = {
        'key1': 'otp',
        'key2': phone,
        'otp': otp_value,
        'expiration': int(time.time()) + (5 * 60),
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data
    
def get_otp(phone):
    user_data_boto = dynamo.get_item(
        Key=python_obj_to_dynamo_obj({'key1': 'otp', 'key2': phone}),
        TableName=TABLE_NAME,
    )
    output = None
    if 'Item' in user_data_boto:
        output = dynamo_obj_to_python_obj(user_data_boto['Item'])
    return output
    
def delete_otp(phone):
    dynamo.delete_item(
        Key=python_obj_to_dynamo_obj({'key1': 'otp', 'key2': phone}),
        TableName=TABLE_NAME,
    )
    
def create_user_data(phone):
    python_data = {
        'key1': 'user',
        'key2': phone,
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data
    
def create_list_data(user_data):
    dynamo_data = python_obj_to_dynamo_obj({
        'key1': 'list',
        'key2': 'b3a64861-47e0-4a04-b70b-4499871883de',
        'name': 'Groceries',
        'items': [
            'bananas',
            'oatmeal',
            'fish',
        ],
    })
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    
def get_user_data(username):
    user_data_boto = dynamo.get_item(
        Key=python_obj_to_dynamo_obj({'key1': 'user', 'key2': username}),
        TableName=TABLE_NAME,
    )
    output = None
    if 'Item' in user_data_boto:
        output = dynamo_obj_to_python_obj(user_data_boto['Item'])
    return output

def dynamo_obj_to_python_obj(dynamo_obj: dict) -> dict:
    deserializer = TypeDeserializer()
    return {
        k: deserializer.deserialize(v) 
        for k, v in dynamo_obj.items()
    }  
  
def python_obj_to_dynamo_obj(python_obj: dict) -> dict:
    serializer = TypeSerializer()
    return {
        k: serializer.serialize(v)
        for k, v in python_obj.items()
    }