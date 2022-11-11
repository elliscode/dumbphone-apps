from pathlib import Path
from os.path import isfile

def get_list_path():
    # read list from file
    home = Path.home()
    return home / 'dumbphone-apps' / 'grocery-list' / 'list.txt'

def get_list():
    output = {}
    list_path = get_list_path()
    if not isfile(list_path):
        list_file = open(list_path, 'w')
        list_file.write('Example List,Item 1' + '\n')
        list_file.write('Example List,Item 2' + '\n')
        list_file.close()
    list_file = open(list_path, 'r')
    Lines = list_file.readlines()
    for line in Lines:
        parts = line.split(',', 2)
        if 2 > len(parts):
            continue
        key = parts[0]
        value = parts[1]
        if key not in output:
            output[key] = []
        output[key].append(value.strip())
    return output