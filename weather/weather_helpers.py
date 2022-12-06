import datetime
import json
import os
from pathlib import Path
import logging
from dumbphoneapps.settings import USER_FOLDER_NAME

logger = logging.getLogger("mylogger")
SECONDS_LIMIT = 60


def get_api_key():
    home = Path.home()
    weather_folder = home / USER_FOLDER_NAME / 'weather'
    if not os.path.exists(weather_folder):
        os.makedirs(weather_folder)
    api_path = weather_folder / 'api-key.txt'
    if not os.path.isfile(api_path):
        api_file = open(api_path, 'w')
        api_file.write('Please place your API key for https://openweathermap.org/ in this file')
        api_file.close()
    api_file = open(api_path, 'r')
    return api_file.readline()

