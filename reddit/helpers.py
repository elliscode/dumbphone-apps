import json
import os
from pathlib import Path

import requests

from dumbphoneapps.settings import REDDIT_USERNAME, REDDIT_SECRET, REDDIT_APP_ID, REDDIT_PASSWORD, USER_FOLDER_NAME


def get_token(force=False):
    home = Path.home()
    reddit_path = home / USER_FOLDER_NAME / 'reddit-token.json'
    current_token = None
    if os.path.isfile(reddit_path) and not force:
        try:
            reddit_file = open(reddit_path, 'r')
            current_token = json.load(reddit_file)
            reddit_file.close()
        except:
            pass
    if current_token:
        return current_token
    base_url = 'https://www.reddit.com/'
    data = {'grant_type': 'password', 'username': REDDIT_USERNAME, 'password': REDDIT_PASSWORD}
    auth = requests.auth.HTTPBasicAuth(REDDIT_APP_ID, REDDIT_SECRET)
    r = requests.post(base_url + 'api/v1/access_token',
                      data=data,
                      headers={'user-agent': 'dpa by ' + REDDIT_USERNAME},
                      auth=auth)
    current_token = r.json()

    reddit_file = open(reddit_path, 'w')
    reddit_file.write(json.dumps(current_token))
    reddit_file.close()
    return current_token


def cache(input_json):
    home = Path.home()
    reddit_path = home / USER_FOLDER_NAME / 'reddit-cache.json'
    reddit_file = open(reddit_path, 'w')
    json.dump(input_json, reddit_file)
    reddit_file.close()


def read_cache():
    home = Path.home()
    reddit_path = home / USER_FOLDER_NAME / 'reddit-cache.json'
    result = None
    if os.path.isfile(reddit_path):
        try:
            reddit_file = open(reddit_path, 'r')
            result = json.load(reddit_file)
            reddit_file.close()
        except Exception as e:
            print(e)
            pass
    return result


def extract_image_data(post, data):
    if 'preview' in data:
        if 'media' in data and data['media']:
            if 'reddit_video' in data['media']:
                post['media_url'] = data['media']['reddit_video']['fallback_url']
            elif 'oembed' in data['media']:
                if 'thumbnail_url' in data['media']['oembed']:
                    post['media_url'] = data['media']['oembed']['thumbnail_url']
                else:
                    post['media_url'] = data['media']['oembed']['url']
        else:
            post['media_url'] = data['preview']['images'][0]['source']['url']
        if 'thumbnail' in data and data['thumbnail'].startswith('http'):
            post['thumb'] = data['thumbnail']
        else:
            post['thumb'] = data['preview']['images'][0]['resolutions'][0]['url']
