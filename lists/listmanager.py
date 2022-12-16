import os
from pathlib import Path
from os.path import isfile
import datetime
from zoneinfo import ZoneInfo

from dumbphoneapps.settings import USER_FOLDER_NAME
from lists.models import ListItem, ListGroup, UserGroupRelation


def get_list(user):
    output = {}
    relations: UserGroupRelation = UserGroupRelation.objects.filter(user=user, )
    for relation in relations:
        if relation.group.group not in output:
            output[relation.group.group] = []
        items: ListItem = ListItem.objects.filter(group=relation.group, )
        for item in items:
            output[relation.group.group].append(item.name)
    return output


def delete_item(user, group, item):
    groups: ListGroup = ListGroup.objects.filter(group=group, )
    if not groups:
        return
    found_group = None
    for group in groups:
        relation: UserGroupRelation = UserGroupRelation.objects.filter(user=user, group=group)
        if relation:
            found_group = group
            break
    if not found_group:
        return
    item: ListItem = ListItem.objects.filter(group=group, name=item, )
    if not item:
        return
    item.delete()


def add_item(user, group, item):
    groups: ListGroup = ListGroup.objects.filter(group__iexact=group, )
    found_group = None
    for group in groups:
        relation: UserGroupRelation = UserGroupRelation.objects.filter(user=user, group=group).first()
        if relation:
            found_group = group
            break
    if not found_group:
        found_group = ListGroup(group=group, )
        found_group.save()
        relation = UserGroupRelation(user=user, group=found_group, )
        relation.save()
    item_obj: ListItem = ListItem.objects.filter(group=found_group, name__iexact=item, ).first()
    if not item_obj:
        item_obj = ListItem(group=found_group, name=item,
                            time_stamp=datetime.datetime.now(tz=ZoneInfo("America/New_York")), )
        item_obj.save()
