from pathlib import Path

def get_list_path():
    # read list from file
    home = Path.home()
    return home / 'dumbphone-apps' / 'grocery-list' / 'list.txt'

def get_list():
    output = {}
    list_path = get_list_path()
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