import os
from pathlib import Path
from os.path import isfile
import datetime
from zoneinfo import ZoneInfo

from dumbphoneapps.settings import USER_FOLDER_NAME
from lists.models import ListItem, ListGroup, UserGroupRelation


def get_list(user):
    output = {}
    relations: UserGroupRelation = UserGroupRelation.objects.filter(user=user, ).order_by('index')
    for relation in relations:
        if relation.group.name not in output:
            output[relation.group.name] = {'name': relation.group.name, 'hash': relation.group.hash, 'items': [], }
        items: ListItem = ListItem.objects.filter(group=relation.group, ).order_by('name')
        for item in items:
            output[relation.group.name]['items'].append({'name': item.name, 'hash': item.hash, })
    return output


def delete_item(user, group, item):
    groups: ListGroup = ListGroup.objects.filter(name=group, )
    if not groups:
        return

    for group in groups:
        relation: UserGroupRelation = UserGroupRelation.objects.filter(user=user, group=group)
        if relation:
            item_record: ListItem = ListItem.objects.filter(group=group, name=item, )
            if not item_record:
                continue
            item_record.delete()


def add_item(user, group, item):
    groups: ListGroup = ListGroup.objects.filter(name__iexact=group, )
    for group in groups:
        relation: UserGroupRelation = UserGroupRelation.objects.filter(user=user, group=group).first()
        if relation:
            found_group = group
            break
    if not found_group:
        found_group = ListGroup(name=group.name, )
        found_group.save()
        relation = UserGroupRelation(user=user, group=found_group, )
        relation.save()
    item_obj: ListItem = ListItem.objects.filter(group=found_group, name__iexact=item, ).first()
    if not item_obj:
        item_obj = ListItem(group=found_group, name=item,
                            time_stamp=datetime.datetime.now(tz=ZoneInfo("America/New_York")), )
        item_obj.save()
    return {'group': found_group, 'item': item_obj, }
