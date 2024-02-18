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

    if 'questions' not in body or not body['questions']:
        return format_response(
            event=event,
            http_code=400,
            body="You need to provide a list of questions to get the answers to",
        )

    questions = body['questions']
    sort_keys = []
    for i in range (0, len(questions)):
        question = questions[i]
        hash_value = get_question_hash(question)
        questions[i]['hash'] = hash_value
        sort_keys.append({"S": hash_value})

    if 'date' not in body:
        date = datetime.date.today()
    else:
        date = body['date']

    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            "key1": {
                "AttributeValueList": [{"S": f"answers_{phone}_{date}"}],
                "ComparisonOperator": "EQ",
            },
            "key2": {
                "AttributeValueList": sort_keys,
                "ComparisonOperator": "EQ",
            }
        },
    )

    answers = []
    if "Items" in response:
        for item in response["Items"]:
            python_item = dynamo_obj_to_python_obj(item)
            print(python_item)
            answers.append(python_item["answer"])

    return format_response(
        event=event,
        http_code=200,
        body={"questions": questions, "answers": answers},
    )


@authenticate
def add_answer_route(event, user_data, body):
    phone = user_data["key2"]

    if 'question' not in body or not body['question']:
        return format_response(
            event=event,
            http_code=400,
            body="You need to provide a question that you are answering",
        )

    if 'answer' not in body or not body['answer']:
        return format_response(
            event=event,
            http_code=400,
            body="You need to provide an answer to the question",
        )

    question = body['question']
    answer = body['answer']
    hash_value = get_question_hash(question)

    if 'date' not in body:
        date = datetime.date.today()
    else:
        date = body['date']

    python_data = {
        "key1": f"answers_{phone}_{date}",
        "key2": hash_value,
        "answer": answer,
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )

    return format_response(
        event=event,
        http_code=201,
        body={"hash": hash_value, "message": f"Successfully added question with id {hash_value}"},
    )


def get_question_hash(question):
    return str(hash(question['question'].lower()))
