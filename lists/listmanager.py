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
        write_list({'Example':['Item 1', 'Item 2']})
    list_file = open(list_path, 'r')
    Lines = list_file.readlines()
    for line in Lines:
        if(line.startswith('//')):
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
    list_file = open(list_path, 'w')
    list_file.write('// This file was created on ' + current_time.strftime('%b/%d/%Y') + '\n')
    for group, items in list_content.items():
        for item in items:
            list_file.write(group + ',' + item + '\n')
    list_file.close()