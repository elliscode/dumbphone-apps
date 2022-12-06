import os
from pathlib import Path
from os.path import isfile
import datetime


def get_list_path():
    # read list from file
    home = Path.home()
    return home / 'dumbphone-apps' / 'grocery-list' / 'list.txt'


def get_list():
    output = {}
    list_path = get_list_path()
    if not isfile(list_path):
        write_list({'Example': ['Item 1', 'Item 2']})
    list_file = open(list_path, 'r', encoding='utf-8')
    lines = list_file.readlines()
    for line in lines:
        if line.startswith('//'):
            continue
        parts = line.split(',', 2)
        if 2 > len(parts):
            continue
        key = parts[0]
        value = parts[1]
        if key not in output:
            output[key] = []
        output[key].append(value.strip())
    return output


def write_list(list_content):
    current_time = datetime.datetime.now()
    list_path = get_list_path()
    if list_path.exists():
        os.rename(list_path, list_path.parent / (current_time.strftime('%Y_%m_%d__%H_%M_%S_%f') + '.txt'))
    list_file = open(list_path, 'w', encoding='utf-8')
    list_file.write('// This file was created on ' + current_time.strftime('%b/%d/%Y %H:%M:%S.%f') + '\n')
    for group, items in list_content.items():
        for item in items:
            list_file.write(group + ',' + item + '\n')
    list_file.close()


def determine_group_name(list_content, group):
    for item in list_content.keys():
        if item.lower() == group.lower():
            return item
    return group


def determine_item_name(list_content, group, name):
    for item in list_content[group]:
        if item.lower() == name.lower():
            return ''
    return name
