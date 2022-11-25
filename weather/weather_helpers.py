import datetime
import json
import os
from pathlib import Path
import logging

logger = logging.getLogger("mylogger")
SECONDS_LIMIT = 60


def get_api_key():
    home = Path.home()
    api_path = home / 'dumbphone-apps' / 'weather' / 'api-key.txt'
    if not os.path.isfile(api_path):
        api_file = open(api_path, 'w')
        api_file.write('Please place your API key for https://openweathermap.org/ in this file')
        api_file.close()
    api_file = open(api_path, 'r')
    return api_file.readline()


def get_from_file_if_recent_enough():
    home = Path.home()
    weather_path = home / 'dumbphone-apps' / 'weather' / 'weather.txt'
    if not os.path.isfile(weather_path):
        return None
    weather_file = open(weather_path, 'r')
    top_line = weather_file.readline().strip()
    file_date = None
    try:
        file_date = datetime.datetime.strptime(top_line, "%Y-%m-%dT%H:%M:%S.%f")
    except:
        logger.info(top_line + " is an invalid date!")
    if file_date is None:
        return None
    time_delta: datetime.timedelta = datetime.datetime.now() - file_date
    if time_delta.seconds > SECONDS_LIMIT:
        return None
    weather_json = weather_file.read()
    try:
        logger.info("Reading from file, to avoid hitting the free https://openweathermap.org/ API limit")
        logger.info("You can read again in " + (SECONDS_LIMIT - time_delta.seconds).__str__() + " seconds")
        return json.loads(weather_json)
    except:
        return None


def write_result(result):
    home = Path.home()
    weather_path = home / 'dumbphone-apps' / 'weather' / 'weather.txt'
    weather_file = open(weather_path, 'w')
    weather_file.write(datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f"))
    weather_file.write('\n')
    weather_file.write(json.dumps(result))
    weather_file.close()
