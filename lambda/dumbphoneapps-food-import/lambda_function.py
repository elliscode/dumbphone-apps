import json
import csv
import boto3
import secrets
import re
import time
from boto3.dynamodb.types import TypeDeserializer, TypeSerializer
from decimal import Decimal

TABLE_NAME = "dumbphoneapps-test016"
digits = "0123456789"
lowercase_letters = "abcdefghijklmnopqrstuvwxyz"
uppercase_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

food_map = {}


def lambda_handler(event, context):
    # import_foods()
    # import_diary()
    # query_foods()
    # import_foods_with_tokens()
    # query_tokens()

    # import_foods_v2()
    # query_foods_v2()

    # import_foods_v3()
    # query_foods_v3()
    import_diary_v3()


def import_diary_v3():
    s3 = boto3.client("s3")
    s3.download_file(
        "daniel-townsend-dumbphoneapps-dev",
        "diaryentry_join.csv",
        "/tmp/diaryentry_join.csv",
    )

    dynamo = boto3.client("dynamodb")

    items = []

    user = "7325676361"

    with open("/tmp/diaryentry_join.csv") as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            try:
                food_name = row[0]
                token = re.sub("\\s+", " ", food_name.lower().strip())
                multiplier = row[1]
                unit = row[2]
                timestamp = row[3]

                time_value = None
                date_string = None
                if not time_value:
                    try:
                        time_value = time.strptime(timestamp, "%Y-%m-%d %H:%M:%S.%f-04")
                    except Exception as e:
                        pass
                    finally:
                        pass
                if not time_value:
                    try:
                        time_value = time.strptime(timestamp, "%Y-%m-%d %H:%M:%S-04")
                    except Exception as e:
                        pass
                    finally:
                        pass
                if not time_value:
                    try:
                        time_value = time.strptime(timestamp, "%Y-%m-%d %H:%M:%S.%f-05")
                    except Exception as e:
                        pass
                    finally:
                        pass
                if not time_value:
                    try:
                        time_value = time.strptime(timestamp, "%Y-%m-%d %H:%M:%S-05")
                    except Exception as e:
                        pass
                    finally:
                        pass

                if token not in food_map:
                    response = dynamo.query(
                        TableName=TABLE_NAME,
                        KeyConditions={
                            "key1": {
                                "AttributeValueList": [{"S": "food_token"}],
                                "ComparisonOperator": "EQ",
                            },
                            "key2": {
                                "AttributeValueList": [{"S": token}],
                                "ComparisonOperator": "EQ",
                            },
                        },
                    )
                    # print(response)
                    for item in response["Items"]:
                        python_item = dynamo_obj_to_python_obj(item)
                        # print(python_item)
                        for food_id_thing in python_item["food_ids"]:
                            if re.sub("\\s+", " ", food_id_thing["name"].lower().strip()) == token:
                                response = dynamo.get_item(
                                    TableName=TABLE_NAME,
                                    Key=python_obj_to_dynamo_obj({"key1": "food", "key2": food_id_thing["hash"]}),
                                )
                                food_map[token] = dynamo_obj_to_python_obj(response["Item"])
                                break
                found_item = food_map.get(token)
                if not found_item:
                    print(f"No item found {token}!")
                    continue

                food_id = found_item["key2"]

                # print(found_item)

                found_serving = None
                servings_item = found_item["metadata"]["servings"]

                # print(servings_item)
                if unit == "kcal":
                    found_serving = {"multiplier": float(1) / float(multiplier)}
                elif unit == "serving":
                    found_serving = {"multiplier": float(1)}
                else:
                    for serving_item in servings_item:
                        if serving_item["name"] == unit:
                            found_serving = serving_item
                            break

                    if not found_serving:
                        print(f"No serving found {token} {unit}!")
                        continue

                calories = (
                    float(multiplier) * float(found_serving["multiplier"]) * float(found_item["metadata"]["calories"])
                )

                date_string = time.strftime("%Y-%m-%d", time_value)
                timestamp = time.mktime(time_value)
                # find food by name
                entry = {
                    "PutRequest": {
                        "Item": python_obj_to_dynamo_obj(
                            {
                                "key1": f"diary_{user}_{date_string}",
                                "key2": f"{timestamp}",
                                "name": f"{food_name}",
                                "calories": f"{calories}",
                                "food_id": f"{food_id}",
                                "multiplier": f"{multiplier}",
                                "unit": f"{unit}",
                            }
                        )
                    }
                }

                print(entry)

                # print('---------------------')

                items.append(entry)
            except Exception as e:
                print(e)
                pass
            if len(items) >= 25:
                # print(items)
                response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
                items = []
        if len(items) > 0:
            # print(items)
            response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
            items = []


def query_foods_v3():
    dynamo = boto3.client("dynamodb")
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            "key1": {
                "AttributeValueList": [{"S": "food_token"}],
                "ComparisonOperator": "EQ",
            },
            "key2": {
                "AttributeValueList": [{"S": "chee"}],
                "ComparisonOperator": "BEGINS_WITH",
            },
        },
    )
    # print(response)
    for item in response["Items"]:
        python_item = dynamo_obj_to_python_obj(item)
        print(python_item)


def import_foods_v3():
    s3 = boto3.client("s3")
    s3.download_file("daniel-townsend-dumbphoneapps-dev", "food.csv", "/tmp/food.csv")

    dynamo = boto3.client("dynamodb")
    items = []

    food_tokens = {}

    with open("/tmp/food.csv") as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            try:
                food_id = create_id(32)
                food_name = row[1]
                food_key = food_name.lower()
                split_food_key = food_key.split()
                for i in range(0, len(split_food_key)):
                    food_token = ""
                    for j in range(i, len(split_food_key)):
                        if food_token:
                            food_token += " "
                        food_token += split_food_key[j]
                    if food_token not in food_tokens:
                        food_tokens[food_token] = []
                    food_tokens[food_token].append({"hash": food_id, "name": food_name})
                items.append(
                    {
                        "PutRequest": {
                            "Item": python_obj_to_dynamo_obj(
                                {
                                    "key1": "food",
                                    "key2": food_id,
                                    "name": food_name,
                                    "metadata": json.loads(row[2], parse_float=Decimal),
                                }
                            )
                        }
                    }
                )
            except Exception as e:
                print(e)
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
                items = []
                print(response)
        if len(items) > 0:
            response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
            items = []
            print(response)

    for food_token, food_ids in food_tokens.items():
        try:
            items.append(
                {
                    "PutRequest": {
                        "Item": python_obj_to_dynamo_obj(
                            {
                                "key1": "food_token",
                                "key2": food_token,
                                "food_ids": food_ids,
                            }
                        )
                    }
                }
            )
        except Exception as e:
            print(e)
        if len(items) >= 25:
            response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
            items = []
            print(response)
    if len(items) > 0:
        response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
        items = []
        print(response)


def query_foods_v2():
    dynamo = boto3.client("dynamodb")
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            "key1": {"AttributeValueList": [{"S": "food"}], "ComparisonOperator": "EQ"},
            "key2": {
                "AttributeValueList": [{"S": "wen"}],
                "ComparisonOperator": "BEGINS_WITH",
            },
        },
    )
    print(response)
    for item in response["Items"]:
        python_item = dynamo_obj_to_python_obj(item)
        print(python_item)


def import_foods_v2():
    s3 = boto3.client("s3")
    s3.download_file("daniel-townsend-dumbphoneapps-dev", "food.csv", "/tmp/food.csv")

    dynamo = boto3.client("dynamodb")
    items = []

    with open("/tmp/food.csv") as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            try:
                food_name = row[1]
                food_key = food_name.lower()
                items.append(
                    {
                        "PutRequest": {
                            "Item": python_obj_to_dynamo_obj(
                                {
                                    "key1": "food",
                                    "key2": food_key,
                                    "name": food_name,
                                    "metadata": json.loads(row[2], parse_float=Decimal),
                                }
                            )
                        }
                    }
                )
            except Exception as e:
                print(e)
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
                items = []
                print(response)
                pass
        if len(items) > 0:
            response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
            items = []
            print(response)
            pass


def query_tokens():
    dynamo = boto3.client("dynamodb")
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={
            "key1": {
                "AttributeValueList": [{"S": "food_token"}],
                "ComparisonOperator": "EQ",
            },
            "key2": {
                "AttributeValueList": [{"S": "en"}],
                "ComparisonOperator": "BEGINS_WITH",
            },
        },
    )
    primary_tokens = []
    # for item in response['Items']:
    #     python_item = dynamo_obj_to_python_obj(item)
    #     subkey = f'{python_item["key1"]}_{python_item["key2"]}'
    #     print(subkey)
    #     primary_tokens.append({'key1': {'S': subkey}})

    # print(primary_tokens)
    # response = dynamo.batch_get_item(
    #     RequestItems={
    #         TABLE_NAME:{
    #             'Keys':primary_tokens
    #         }
    #     }
    # )

    # key_condition_expression = ''
    # expression_attribute_values = {}
    # i = 0
    # for item in response['Items']:
    #     python_item = dynamo_obj_to_python_obj(item)
    #     subkey = f'{python_item["key1"]}_{python_item["key2"]}'
    #     print(subkey)
    #     if not key_condition_expression:
    #         key_condition_expression += 'key1 IN ('
    #     else:
    #         key_condition_expression += ', '
    #     key_condition_expression += f':i{i}'
    #     expression_attribute_values[f':i{i}'] = {'S': subkey}
    #     i = i + 1
    # key_condition_expression += ')'

    # print(key_condition_expression)
    # response = dynamo.query(
    #     TableName=TABLE_NAME,
    #     ExpressionAttributeValues=expression_attribute_values,
    #     KeyConditionExpression=key_condition_expression,
    # )

    items = []
    quit_loops = False
    for item in response["Items"]:
        if quit_loops:
            break
        python_item = dynamo_obj_to_python_obj(item)
        subkey = f'{python_item["key1"]}_{python_item["key2"]}'
        response = dynamo.query(
            TableName=TABLE_NAME,
            KeyConditions={
                "key1": {
                    "AttributeValueList": [{"S": subkey}],
                    "ComparisonOperator": "EQ",
                },
            },
            ReturnConsumedCapacity="TOTAL",
        )
        print(response["ConsumedCapacity"])
        print(response["ConsumedCapacity"]["CapacityUnits"])
        for item in response["Items"]:
            python_item = dynamo_obj_to_python_obj(item)
            items.append(item)
            if len(items) > 99:
                quit_loops = True
                break
    print(items)
    print(len(items))

    # subkeys = []
    # for item in response['Items']:
    #     python_item = dynamo_obj_to_python_obj(item)
    #     subkey = f'{python_item["key1"]}_{python_item["key2"]}'
    #     subkeys.append({'S': subkey})
    # response = dynamo.query(
    #     TableName=TABLE_NAME,
    #     KeyConditions={
    #         'key1': {
    #             'AttributeValueList': subkeys,
    #             'ComparisonOperator': 'IN'
    #         },
    #     },
    # )
    # for item in response['Items']:
    #     python_item = dynamo_obj_to_python_obj(item)
    #     print(item)


def query_foods():
    dynamo = boto3.client("dynamodb")
    response = dynamo.query(
        TableName=TABLE_NAME,
        IndexName="name-index",
        KeyConditions={
            "key1": {"AttributeValueList": [{"S": "food"}], "ComparisonOperator": "EQ"},
            "name": {
                "AttributeValueList": [{"S": "chicken"}],
                "ComparisonOperator": "BEGINS_WITH",
            },
        },
        AttributesToGet=[
            "name",
            "displayName",
            "key1",
            "key2",
        ],
    )
    print(response)
    output = {}
    for item in response["Items"]:
        python_obj = dynamo_obj_to_python_obj(item)
        output[python_obj["name"]] = python_obj
    print(output)


def query_foods_legacy():
    dynamo = boto3.client("dynamodb")
    response = dynamo.query(
        TableName=TABLE_NAME,
        KeyConditions={"key1": {"AttributeValueList": [{"S": "food"}], "ComparisonOperator": "EQ"}},
        QueryFilter={
            "name": {
                "AttributeValueList": [{"S": "chicken"}],
                "ComparisonOperator": "CONTAINS",
            }
        },
        AttributesToGet=[
            "name",
            "displayName",
            "key1",
            "key2",
        ],
    )
    print(response)
    output = {}
    for item in response["Items"]:
        python_obj = dynamo_obj_to_python_obj(item)
        output[python_obj["name"]] = python_obj
    print(output)


def get_all_foods(all_food_names):
    pass


def import_diary():
    s3 = boto3.client("s3")
    s3.download_file(
        "daniel-townsend-dumbphoneapps-dev",
        "diaryentry_join.csv",
        "/tmp/diaryentry_join.csv",
    )

    dynamo = boto3.client("dynamodb")
    items = []

    with open("/tmp/diaryentry_join.csv") as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            try:
                print(f"{row[0]} {row[1]} {row[2]} {row[3]} {row[4]} {row[5]}")
            except Exception as e:
                print(e)
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
                items = []
                print(response)
        if len(items) > 0:
            response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
            items = []
            print(response)


def import_foods_with_tokens():
    s3 = boto3.client("s3")
    s3.download_file("daniel-townsend-dumbphoneapps-dev", "food.csv", "/tmp/food.csv")

    dynamo = boto3.client("dynamodb")
    items = []

    tokens = {}

    with open("/tmp/food.csv") as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            try:
                food_id = create_id(32)
                food_name = row[1]
                items.append(
                    {
                        "PutRequest": {
                            "Item": python_obj_to_dynamo_obj(
                                {
                                    "key1": "food",
                                    "key2": food_id,
                                    "name": food_name,
                                    "metadata": json.loads(row[2], parse_float=Decimal),
                                }
                            )
                        }
                    }
                )
                for token in food_name.split():
                    lower_token = token.lower().strip(", ()/")
                    if not lower_token:
                        continue
                    if lower_token not in tokens:
                        tokens[lower_token] = {}
                    if food_name not in tokens[lower_token]:
                        tokens[lower_token][food_name] = food_id
            except Exception as e:
                print(e)
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
                items = []
                print(response)
                pass
        if len(items) > 0:
            response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
            items = []
            print(response)
            pass
        print(json.dumps(tokens))

    items = []
    added_token_keys = {}
    added_tokens = {}

    for token, value in tokens.items():
        for food_name, food_id in value.items():
            token_key = f"food_token_{token}"
            if token_key not in added_tokens:
                items.append(
                    {
                        "PutRequest": {
                            "Item": python_obj_to_dynamo_obj(
                                {
                                    "key1": f"food_token",
                                    "key2": token,
                                }
                            )
                        }
                    }
                )
                added_tokens[token_key] = ""
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
                items = []
                print(response)
                pass
            token_food_key = f"food_token_{token}_{food_id}"
            if token_food_key not in added_token_keys:
                items.append(
                    {
                        "PutRequest": {
                            "Item": python_obj_to_dynamo_obj(
                                {
                                    "key1": f"food_token_{token}",
                                    "key2": food_id,
                                    "name": food_name,
                                }
                            )
                        }
                    }
                )
                added_token_keys[token_food_key] = ""
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
                items = []
                print(response)
                pass
    if len(items) > 0:
        response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
        items = []
        print(response)
        pass

    # TODO implement
    return {"statusCode": 200, "body": json.dumps("Hello from Lambda!")}


def import_foods():
    s3 = boto3.client("s3")
    s3.download_file("daniel-townsend-dumbphoneapps-dev", "food.csv", "/tmp/food.csv")

    dynamo = boto3.client("dynamodb")
    items = []

    with open("/tmp/food.csv") as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            try:
                food_id = create_id(32)
                items.append(
                    {
                        "PutRequest": {
                            "Item": python_obj_to_dynamo_obj(
                                {
                                    "key1": "food",
                                    "key2": food_id,
                                    "name": row[1].lower(),
                                    "displayName": row[1],
                                    "metadata": json.loads(row[2], parse_float=Decimal),
                                }
                            )
                        }
                    }
                )
            except Exception as e:
                print(e)
            if len(items) >= 25:
                response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
                items = []
                print(response)
        if len(items) > 0:
            response = dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
            items = []
            print(response)

    # TODO implement
    return {"statusCode": 200, "body": json.dumps("Hello from Lambda!")}


def dynamo_obj_to_python_obj(dynamo_obj: dict) -> dict:
    deserializer = TypeDeserializer()
    return {k: deserializer.deserialize(v) for k, v in dynamo_obj.items()}


def python_obj_to_dynamo_obj(python_obj: dict) -> dict:
    serializer = TypeSerializer()
    return {k: serializer.serialize(v) for k, v in python_obj.items()}


def create_id(length):
    return "".join(secrets.choice(digits + lowercase_letters + uppercase_letters) for i in range(length))
