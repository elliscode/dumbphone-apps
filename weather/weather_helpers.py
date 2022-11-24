import os
from pathlib import Path


def get_api_key():
    home = Path.home()
    api_path = home / 'dumbphone-apps' / 'weather' / 'api-key.txt'
    if not os.path.isfile(api_path):
        api_file = open(api_path, 'w')
        api_file.write('Please place your API key for https://openweathermap.org/ in this file')
        api_file.close()
    api_file = open(api_path, 'r')
    return api_file.readline()