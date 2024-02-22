from .utils import (
    authenticate,
    format_response,
    python_obj_to_dynamo_obj,
    dynamo,
    TABLE_NAME,
    dynamo_obj_to_python_obj,
)
import time
import datetime


@authenticate
def set_questions_route(event, user_data, body):
    phone = user_data["key2"]

    questions_entry = {
        "key1": f"questions_{phone}",
        "key2": f"{int(time.time())}",
        "questions": body['questions'],
    }

    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=python_obj_to_dynamo_obj(questions_entry),
    )

    return format_response(
        event=event,
        http_code=201,
        body="Successfully wrote questions to database",
    )


@authenticate
def get_questions_route(event, user_data, body):
    phone = user_data["key2"]

    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            "key1": {
                "AttributeValueList": [{"S": f"questions_{phone}"}],
                "ComparisonOperator": "EQ",
            },
        },
        ScanIndexForward=False,
    )

    latest_questions = []
    for item in response["Items"]:
        python_item = dynamo_obj_to_python_obj(item)
        print(python_item)
        latest_questions = python_item["questions"]
        break

    return format_response(
        event=event,
        http_code=200,
        body={"questions": latest_questions},
    )


@authenticate
def get_answers_route(event, user_data, body):
    phone = user_data["key2"]

    if 'date' not in body:
        date = datetime.date.today()
    else:
        date = body['date']

    response = dynamo.get_item(
        TableName=TABLE_NAME,
        Key=python_obj_to_dynamo_obj({"key1": f"answers_{phone}", "key2": date}),
    )

    if "Item" not in response:
        return format_response(
            event=event,
            http_code=200,
            body={"answers": {}},
        )

    answers = dynamo_obj_to_python_obj(response["Item"])

    if "answers" not in answers:
        return format_response(
            event=event,
            http_code=200,
            body={"answers": {}},
        )

    return format_response(
        event=event,
        http_code=200,
        body={"answers": answers["answers"]},
    )


@authenticate
def get_report_data_route(event, user_data, body):
    phone = user_data["key2"]

    if 'date' not in body:
        return format_response(
            event=event,
            http_code=400,
            body="You need to supploy a date in your POST body",
        )
    date_obj = datetime.datetime.strptime(body['date'], '%Y-%m-%d')
    keys = []
    for i in range(-6, 1):
        new_date_obj = date_obj + datetime.timedelta(days=i)
        keys.append(python_obj_to_dynamo_obj({
            'key1': f'answers_{phone}',
            'key2': new_date_obj.strftime('%Y-%m-%d')
        }))
    response = dynamo.batch_get_item(
        RequestItems={
            TABLE_NAME: {
                "Keys": keys,
            }
        }
    )
    responses = response["Responses"][TABLE_NAME]
    output = []
    for response_item in responses:
        python_item = dynamo_obj_to_python_obj(response_item)
        output.append({'date': python_item['key2'], 'answers': python_item['answers']})
    return format_response(
        event=event,
        http_code=200,
        body=output,
    )

@authenticate
def set_answers_route(event, user_data, body):
    phone = user_data["key2"]

    if 'answers' not in body or not body['answers']:
        return format_response(
            event=event,
            http_code=400,
            body="You need to provide a list of answers",
        )

    answers = body['answers']

    if 'date' not in body:
        date = datetime.date.today()
    else:
        date = body['date']

    python_data = {
        "key1": f"answers_{phone}",
        "key2": date,
        "answers": answers,
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    return format_response(
        event=event,
        http_code=201,
        body="Successfully wrote all answers to the database",
    )
