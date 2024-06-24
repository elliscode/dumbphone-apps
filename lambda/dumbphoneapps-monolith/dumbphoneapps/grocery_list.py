import json
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
    dynamo_obj_to_python_obj,
    create_id,
    SMS_SQS_QUEUE_URL,
)


@authenticate
def sendsharelist_route(event, user_data, body):
    phone = user_data["key2"]
    target_user = body["user"]
    list_id = body["list_id"]

    # first figure out if the target user exists in our database
    target_user_data = get_user_data(target_user)
    if target_user_data is None:
        return format_response(
            event=event,
            http_code=500,
            body="Target user does not exist in our database",
        )

    source_list = get_list_data([list_id])[0]

    link = f"{DOMAIN_NAME}/grocery-list/index.html?share={list_id}"
    message = {
        "phone": target_user,
        "message": f"{phone} wants to share the list '{source_list['name']}' with you, follow this link to accept\n\n{link}",
    }
    print(message)
    sqs.send_message(
        QueueUrl=SMS_SQS_QUEUE_URL,
        MessageBody=json.dumps(message),
    )
    return format_response(
        event=event,
        http_code=200,
        body="Successfully shared the list",
    )


@authenticate
def setlistorder_route(event, user_data, body):
    phone = user_data["key2"]

    new_userlist_data = []
    userlist_data = get_userlist_data(phone)
    for userlist in body['list_ids']:
        if userlist["id"] in [ul['id'] for ul in userlist_data["lists"]]:
            new_userlist_data.append(userlist)

    set_userlist_data(phone, new_userlist_data)

    return format_response(
        event=event,
        http_code=200,
        body="Successfully set the order of the lists",
    )


@authenticate
def acceptsharelist_route(event, user_data, body):
    target_user = user_data["key2"]
    list_id = body["list_id"]

    # first figure out if the target user exists in our database
    target_user_data = get_user_data(target_user)
    if target_user_data is None:
        return format_response(
            event=event,
            http_code=500,
            body="Target user does not exist in our database",
        )

    # first figure out what lists the target user has defined
    target_userlist_data = get_userlist_data(target_user)
    if target_userlist_data is None:
        target_user_list_ids = []
    else:
        target_user_list_ids = target_userlist_data["lists"]
    if list_id in target_user_list_ids:
        return format_response(
            event=event,
            http_code=500,
            body="List is already shared with this user",
        )

    # next figure out if the target user has a list with the same name, if they
    # do, delete the current users list and combine all the items together
    found_list = None
    source_list = get_list_data([list_id])[0]
    all_target_user_lists = get_list_data([userlist['id'] for userlist in target_user_list_ids["lists"]])
    for target_user_list in all_target_user_lists:
        if target_user_list["name"] == source_list["name"]:
            found_list = target_user_list
            break

    if found_list is not None:
        for key, value in source_list["items"].items():
            if key in found_list["items"].keys():
                continue
            found_list["items"][key] = source_list["items"][key]
        delete_list(list_id)
        set_list_data(found_list["key2"], found_list["name"], found_list["items"])
        target_user_list_ids.append(create_default_userlist_dict(list_id))
        set_userlist_data(target_user, target_user_list_ids)
        return format_response(
            event=event,
            http_code=200,
            body=f"Successfully merged list {source_list['name']}",
        )
    else:
        target_user_list_ids.append(create_default_userlist_dict(list_id))
        set_userlist_data(target_user, target_user_list_ids)
        return format_response(
            event=event,
            http_code=200,
            body=f"Successfully shared list {source_list['name']}",
        )


@authenticate
def setcrossedoff_route(event, user_data, body):
    phone = user_data["key2"]
    userlist_data = get_userlist_data(phone)
    if userlist_data is None:
        userlist_data = create_userlist_data(phone)

    list_data = get_list_data([userlist['id'] for userlist in userlist_data["lists"]])

    found_lists = {}
    for data_item in body["data"]:

        item = data_item["item"].strip()

        found_list = None

        for this_list in list_data:
            if this_list["key2"] == data_item["list_id"]:
                found_list = this_list
                break

        if found_list is None:
            continue

        if found_list["items"] is None:
            found_list["items"] = {}

        if item not in found_list["items"]:
            continue

        found_list["items"][item] = data_item["crossed_off"]

        found_lists[data_item["list_id"]] = found_list

    if found_lists:
        set_list_data_multiple(found_lists)
        return format_response(
            event=event,
            http_code=200,
            body=f"Successfully toggled {len(body["data"])} items on {len(found_lists.keys())} lists",
        )

    return format_response(
        event=event,
        http_code=201,
        body=f"Didn't do anything",
    )


@authenticate
def cleanuplist_route(event, user_data, body):
    phone = user_data["key2"]

    userlist_data = get_userlist_data(phone)
    if userlist_data is None:
        userlist_data = create_userlist_data(phone)

    list_data = get_list_data([userlist['id'] for userlist in userlist_data["lists"]])

    found_lists = {}
    for list_id in body['list_ids']:
        found_list = None
        for this_list in list_data:
            if this_list["key2"] == list_id:
                found_list = this_list
                break
        if found_list is None:
            return format_response(
                event=event,
                http_code=404,
                body="Provided list does not exist",
            )

        if found_list["items"] is None:
            found_list["items"] = {}

        found_list["items"] = {k: v for k, v in found_list["items"].items() if not v}

        found_lists[list_id] = found_list

    if found_lists:
        set_list_data_multiple(found_lists)
        return format_response(
            event=event,
            http_code=200,
            body=f"Successfully cleaned up {len(body["list_ids"])} items on {len(found_lists.keys())} lists",
        )

    return format_response(
        event=event,
        http_code=201,
        body=f"Didn't do anything",
    )


def delete_list(list_id):
    dynamo_data = python_obj_to_dynamo_obj(
        {
            "key1": "list",
            "key2": list_id,
        }
    )
    dynamo.delete_item(
        TableName=TABLE_NAME,
        Key=dynamo_data,
    )


@authenticate
def deletelist_route(event, user_data, body):

    phone = user_data["key2"]
    list_id = body["list_id"]

    userlist_data = get_userlist_data(phone)
    if userlist_data is None:
        userlist_data = create_userlist_data(phone)

    found_index = None
    for i in range(0, len(userlist_data['lists'])):
        if userlist_data['lists'][i]['id'] == list_id:
            found_index = i
            break
    if not found_index:
        return format_response(event=event, http_code=404, body="Provided list does not exist")

    userlist_data["lists"].pop(found_index)

    set_userlist_data(phone, userlist_data["lists"])

    return format_response(event=event, http_code=200, body="List successfully deleted")


@authenticate
def deleteitem_route(event, user_data, body):
    phone = user_data["key2"]
    list_name = body["name"].strip()

    userlist_data = get_userlist_data(phone)
    if userlist_data is None:
        userlist_data = create_userlist_data(phone)

    list_data = get_list_data([userlist['id'] for userlist in userlist_data["lists"]])

    found_list = None

    for this_list in list_data:
        if this_list["name"].lower() == list_name.lower():
            found_list = this_list
            break
    if found_list is None:
        return format_response(event=event, http_code=404, body="Provided list does not exist")

    item = body["item"]
    if item not in found_list["items"]:
        return format_response(event=event, http_code=200, body="Item already deleted")

    found_list["items"].pop(item)

    set_list_data(found_list["key2"], found_list["name"], found_list["items"])

    return format_response(event=event, http_code=200, body="Item successfully deleted")


@authenticate
def additem_route(event, user_data, body):
    return additem(event, user_data, body)


def additem(event, user_data, body):
    phone = user_data["key2"]
    list_name = body["name"].strip()
    item = body["item"].strip()

    userlist_data = get_userlist_data(phone)
    if userlist_data is None:
        userlist_data = create_userlist_data(phone)
    list_data = get_list_data([userlist['id'] for userlist in userlist_data["lists"]])
    found_list = None

    for this_list in list_data:
        if this_list["name"].lower() == list_name.lower():
            found_list = this_list
            break
    if found_list is None:
        found_list = {
            "key": "list",
            "key2": create_id(32),
            "name": list_name,
            "items": {},
        }
        lists = userlist_data["lists"]
        lists.append(create_default_userlist_dict(found_list["key2"]))
        userlist_data = set_userlist_data(phone, lists)

    items = found_list["items"]

    if items is None:
        items = {}

    if item.lower() in {k.lower(): v for k, v in items.items()}:
        return format_response(event=event, http_code=200, body="Item already exists")

    items[item] = False

    set_list_data(found_list["key2"], found_list["name"], items)

    userlist = next(ul for ul in userlist_data['lists'] if ul['id'] == found_list["key2"])

    return format_response(
        event=event,
        http_code=200,
        body={
            "message": "Item successfully added",
            "group": {"hash": found_list["key2"], "name": found_list["name"], "cluster": userlist["cluster"], "visible": userlist["visible"]},
            "item": {"name": item, "crossed_off": False, "hash": create_id(32)},
        },
    )


@authenticate
def getlist_route(event, user_data, body):
    phone = user_data["key2"]

    userlist_data = get_userlist_data(phone)
    if userlist_data is None:
        userlist_data = create_userlist_data(phone)

    ids = [userlist['id'] for userlist in userlist_data["lists"]]

    list_data = get_list_data(ids)

    formatted_list_data = format_list_data(list_data, userlist_data["lists"])

    return format_response(event=event, http_code=200, body=formatted_list_data)


def format_list_data(list_data, userlist_data):
    output = {}
    for list_dict in list_data:
        list_id = list_dict["key2"]
        userlist = next(userlist for userlist in userlist_data if userlist['id'] == list_id)
        list_name = list_dict["name"]
        items = []
        for key, value in list_dict["items"].items():
            items.append({"name": key, "crossed_off": value, "hash": (list_id + str(len(items)))})
        output[list_name] = {"hash": list_id, "name": list_name, "items": items, "cluster": userlist["cluster"], "visible": userlist["visible"]}
    return output


def get_list_data(list_ids):
    keys = []
    for list_id in list_ids:
        keys.append(
            python_obj_to_dynamo_obj(
                {
                    "key1": "list",
                    "key2": list_id,
                }
            )
        )
    output = []
    if len(keys) == 0:
        return output
    response = dynamo.batch_get_item(RequestItems={TABLE_NAME: {"Keys": keys}})
    result_map = {}
    for item in response["Responses"][TABLE_NAME]:
        python_obj = dynamo_obj_to_python_obj(item)
        result_map[python_obj["key2"]] = python_obj
    for list_id in list_ids:
        output.append(result_map[list_id])
    return output


def set_userlist_data(phone, lists):
    if isinstance(lists, dict):
        raise Exception("lists parameter must be of type list")
    python_data = {
        "key1": "userlist",
        "key2": phone,
        "lists": lists,
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data


def create_userlist_data(phone):
    python_data = {
        "key1": "userlist",
        "key2": phone,
        "lists": [],
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data


def get_userlist_data(username):
    user_data_boto = dynamo.get_item(
        Key=python_obj_to_dynamo_obj({"key1": "userlist", "key2": username}),
        TableName=TABLE_NAME,
    )
    output = None
    if "Item" in user_data_boto:
        required_keys = create_default_userlist_dict('').keys()
        output = dynamo_obj_to_python_obj(user_data_boto["Item"])
        if isinstance(output['lists'], dict):
            # we want to convert it to a list
            new_list = []
            for key in output['lists'].keys():
                new_list.append(output['lists'][key])
            output['lists'] = new_list
        elif isinstance(output['lists'], list):
            # esnure its the right kind of list, a list of dicts, not a list of strings
            new_list = []
            for list_dict in output['lists']:
                if isinstance(list_dict, dict):
                    new_list.append(list_dict)
                elif isinstance(list_dict, str):
                    new_list.append(create_default_userlist_dict(list_dict))
            output['lists'] = new_list
    return output


def create_default_userlist_dict(key: str):
    return {
        "id": key,
        "visible": True,
        "cluster": "General",
    }


def set_list_data(list_id, name, items):
    dynamo_data = python_obj_to_dynamo_obj(
        {
            "key1": "list",
            "key2": list_id,
            "name": name,
            "items": items,
            "expiration": int(time.time()) + (365 * 24 * 60 * 60),
        }
    )
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )


def set_list_data_multiple(lists):
    items = []
    for whole_list in lists.values():
        whole_list["expiration"] = int(time.time()) + (365 * 24 * 60 * 60)
        items.append({"PutRequest": {"Item": python_obj_to_dynamo_obj(whole_list)}})

    return dynamo.batch_write_item(RequestItems={TABLE_NAME: items})
