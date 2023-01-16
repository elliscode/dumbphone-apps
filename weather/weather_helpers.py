import datetime
import json
import os
from pathlib import Path
import logging
from dumbphoneapps.settings import USER_FOLDER_NAME


logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)8.8s] %(message)s",
    handlers=[logging.StreamHandler(), ],
)
logger = logging.getLogger(__name__)

SECONDS_LIMIT = 60


def get_api_key():
    home = Path.home()
    user_folder = home / USER_FOLDER_NAME
    if not os.path.exists(user_folder):
        os.makedirs(user_folder)
    api_path = user_folder / 'weather-key.txt'
    if not os.path.isfile(api_path):
        api_file = open(api_path, 'w')
        api_file.write('Please place your API key for https://openweathermap.org/ in this file')
        api_file.close()
    api_file = open(api_path, 'r')
    return api_file.readline()

