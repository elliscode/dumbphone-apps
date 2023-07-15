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
    digits,
    lowercase_letters,
    uppercase_letters,
    dynamo_obj_to_python_obj,
    parse_body,
    ADMIN_PHONE,
)
import re
import secrets


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
        QueueUrl="https://sqs.us-east-1.amazonaws.com/646933935516/smsQueue",
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

    new_userlist = body["list_ids"]
    old_userlist = get_userlist_data(phone)["lists"]
    print(new_userlist)
    print(old_userlist)
    if not all(x in old_userlist for x in new_userlist):
        return format_response(
            event=event,
            http_code=500,
            body="You sent me some weird data, this is not all of your lists",
        )
    set_userlist_data(phone, body["list_ids"])

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
    all_target_user_lists = get_list_data(target_user_list_ids)
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
        target_user_list_ids.append(list_id)
        set_userlist_data(target_user, target_user_list_ids)
        return format_response(
            event=event,
            http_code=200,
            body=f"Successfully merged list {source_list['name']}",
        )
    else:
        target_user_list_ids.append(list_id)
        set_userlist_data(target_user, target_user_list_ids)
        return format_response(
            event=event,
            http_code=200,
            body=f"Successfully shared list {source_list['name']}",
        )


@authenticate
def setcrossedoff_route(event, user_data, body):
    phone = user_data["key2"]
    item = body["item"].strip()

    userlist_data = get_userlist_data(phone)
    if userlist_data is None:
        userlist_data = create_userlist_data(phone)

    list_data = get_list_data(userlist_data["lists"])

    found_list = None

    for this_list in list_data:
        if this_list["key2"] == body["list_id"]:
            found_list = this_list
            break
    if found_list is None:
        return format_response(
            event=event,
            http_code=404,
            body="Provided list does not exist",
        )

    items = found_list["items"]

    if items is None:
        items = {}

    if item not in items:
        return format_response(
            event=event,
            http_code=200,
            body="Item already exists",
        )

    items[item] = body["crossed_off"]

    set_list_data(found_list["key2"], found_list["name"], items)

    return format_response(
        event=event,
        http_code=200,
        body="Item successfully added",
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
    list_name = body["name"].strip()

    userlist_data = get_userlist_data(phone)
    if userlist_data is None:
        userlist_data = create_userlist_data(phone)

    list_data = get_list_data(userlist_data["lists"])

    found_list = None

    for list in list_data:
        if list["name"].lower() == list_name.lower():
            found_list = list
            break
    if found_list is None:
        return format_response(
            event=event, http_code=404, body="Provided list does not exist"
        )

    delete_list(found_list["key2"])

    return format_response(event=event, http_code=200, body="List successfully deleted")


@authenticate
def deleteitem_route(event, user_data, body):
    phone = user_data["key2"]
    list_name = body["name"].strip()

    userlist_data = get_userlist_data(phone)
    if userlist_data is None:
        userlist_data = create_userlist_data(phone)

    list_data = get_list_data(userlist_data["lists"])

    found_list = None

    for this_list in list_data:
        if this_list["name"].lower() == list_name.lower():
            found_list = this_list
            break
    if found_list is None:
        return format_response(
            event=event, http_code=404, body="Provided list does not exist"
        )

    item = body["item"]
    if item not in found_list["items"]:
        return format_response(event=event, http_code=200, body="Item already deleted")

    found_list["items"].pop(item)

    set_list_data(found_list["key2"], found_list["name"], found_list["items"])

    return format_response(event=event, http_code=200, body="Item successfully deleted")


@authenticate
def additem_route(event, user_data, body):
    phone = user_data["key2"]
    list_name = body["name"].strip()
    item = body["item"].strip()

    userlist_data = get_userlist_data(phone)
    if userlist_data is None:
        userlist_data = create_userlist_data(phone)
    list_data = get_list_data(userlist_data["lists"])
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
        lists.append(found_list["key2"])
        userlist_data = set_userlist_data(phone, lists)

    items = found_list["items"]

    if items is None:
        items = {}

    if item.lower() in {k.lower(): v for k, v in items.items()}:
        return format_response(event=event, http_code=200, body="Item already exists")

    items[item] = False

    set_list_data(found_list["key2"], found_list["name"], items)

    return format_response(
        event=event,
        http_code=200,
        body={
            "message": "Item successfully added",
            "group": {"hash": found_list["key2"], "name": found_list["name"]},
            "item": {"name": item, "crossed_off": False, "hash": create_id(32)},
        },
    )


def create_id(length):
    return "".join(
        secrets.choice(digits + lowercase_letters + uppercase_letters)
        for i in range(length)
    )


@authenticate
def getlist_route(event, user_data, body):
    phone = user_data["key2"]

    userlist_data = get_userlist_data(phone)
    if userlist_data is None:
        userlist_data = create_userlist_data(phone)

    list_data = get_list_data(userlist_data["lists"])

    formatted_list_data = format_list_data(list_data)

    return format_response(event=event, http_code=200, body=formatted_list_data)


def format_list_data(list_data):
    output = {}
    for list in list_data:
        list_id = list["key2"]
        list_name = list["name"]
        items = []
        for key, value in list["items"].items():
            items.append(
                {"name": key, "crossed_off": value, "hash": (list_id + str(len(items)))}
            )
        output[list_name] = {"hash": list_id, "name": list_name, "items": items}
    return output


def get_list_data(list_ids):
    output = []
    for list_id in list_ids:
        list_data_boto = dynamo.get_item(
            Key=python_obj_to_dynamo_obj({"key1": "list", "key2": list_id}),
            TableName=TABLE_NAME,
        )
        if "Item" in list_data_boto:
            output.append(dynamo_obj_to_python_obj(list_data_boto["Item"]))
    return output


def set_userlist_data(phone, lists):
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
        output = dynamo_obj_to_python_obj(user_data_boto["Item"])
    return output


def login_route(event):
    body = parse_body(event["body"])
    phone = body["phone"]
    submitted_otp = body["otp"]

    print(phone)
    print(submitted_otp)

    # get user data
    user_data = get_user_data(phone)
    if user_data is None:
        return format_response(event=event, http_code=500, body="No user exists")

    # get otp
    otp_data = get_otp(phone)
    if otp_data is None or otp_data["expiration"] < int(time.time()):
        return format_response(
            event=event,
            http_code=500,
            body="OTP expired, please wait 30 seconds and try to log in again",
        )
    diff = otp_data["last_failure"] + 30 - int(time.time())
    if diff > 0:
        return format_response(
            event=event,
            http_code=403,
            body=f"Please wait {diff} seconds before trying to log in again",
        )

    if submitted_otp != otp_data["otp"]:
        otp_data["last_failure"] = int(time.time())
        set_otp(phone, otp_data)
        return format_response(
            event=event, http_code=403, body="Incorrect OTP, please try again"
        )

    # delete the OTP
    delete_otp(phone)
    # log in the user and send them the data
    token_data = create_token(phone)

    # generate the date_string
    date_string = time.strftime(
        "%a, %d %b %Y %H:%M:%S GMT", time.gmtime(time.time() + (4 * 30 * 24 * 60 * 60))
    )

    return format_response(
        event=event,
        http_code=200,
        body="successfully logged in",
        headers={
            "x-csrf-token": token_data["csrf"],
            "Set-Cookie": f'dumbphoneapps-auth-token={token_data["key2"]}; Domain=.dumbphoneapps.com; Expires={date_string}; Secure; HttpOnly',
        },
    )


def otp_route(event):
    body = parse_body(event["body"])
    phone = str(body["phone"])

    if not re.match(r"^\d{10}$", phone):
        return format_response(
            event=event,
            http_code=500,
            body="Invalid phone supplied, must be 10 digits USA phone number",
        )

    # get or create user data
    user_data = get_user_data(phone)
    if user_data is None:
        user_data = create_user_data(phone)
        alert_admin_of_new_user(phone)
    print(user_data)

    # generate and set OTP
    otp_data = get_otp(phone)
    body_text = f"OTP already exists for {phone}, please log in"
    if otp_data is None or otp_data["expiration"] < int(time.time()):
        otp_value = "".join(secrets.choice(digits) for i in range(7))
        otp_data = create_otp(phone, otp_value)

        # generate and send message if you are creating a new otp
        message = {
            "phone": phone,
            "message": f"{otp_data['otp']} is your dumbphoneapps.com one-time passcode\n\n@dumbphoneapps.com #{otp_data['otp']}",
        }
        print(message)
        sqs.send_message(
            QueueUrl="https://sqs.us-east-1.amazonaws.com/646933935516/smsQueue",
            MessageBody=json.dumps(message),
        )
        body_text = f"Successfully sent OTP to {phone}"
    print(otp_data)

    return format_response(event=event, http_code=200, body=body_text)


def alert_admin_of_new_user(phone):
    # generate and send message if you are creating a new otp
    message = {
        "phone": ADMIN_PHONE,
        "message": f"A new user has joined dumbphoneapps!\n\nPhone: {phone}",
    }
    print(message)
    sqs.send_message(
        QueueUrl="https://sqs.us-east-1.amazonaws.com/646933935516/smsQueue",
        MessageBody=json.dumps(message),
    )


def create_token(phone):
    python_data = {
        "key1": "token",
        "key2": create_id(32),
        "csrf": create_id(32),
        "user": phone,  # m    d    h    m    s
        "expiration": int(time.time()) + (4 * 30 * 24 * 60 * 60),
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data


def set_otp(phone, python_data):
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data


def create_otp(phone, otp_value):
    python_data = {
        "key1": "otp",
        "key2": phone,
        "otp": otp_value,
        "expiration": int(time.time()) + (5 * 60),
        "last_failure": 0,
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data


def get_otp(phone):
    user_data_boto = dynamo.get_item(
        Key=python_obj_to_dynamo_obj({"key1": "otp", "key2": phone}),
        TableName=TABLE_NAME,
    )
    output = None
    if "Item" in user_data_boto:
        output = dynamo_obj_to_python_obj(user_data_boto["Item"])
    return output


def delete_otp(phone):
    dynamo.delete_item(
        Key=python_obj_to_dynamo_obj({"key1": "otp", "key2": phone}),
        TableName=TABLE_NAME,
    )


def create_user_data(phone):
    python_data = {
        "key1": "user",
        "key2": phone,
    }
    dynamo_data = python_obj_to_dynamo_obj(python_data)
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
    return python_data


def set_list_data(list_id, name, items):
    dynamo_data = python_obj_to_dynamo_obj(
        {
            "key1": "list",
            "key2": list_id,
            "name": name,
            "items": items,
        }
    )
    dynamo.put_item(
        TableName=TABLE_NAME,
        Item=dynamo_data,
    )
