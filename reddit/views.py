import json

import requests
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render
from requests import Response

from dumbphoneapps.settings import LOGIN_URL, REDDIT_USERNAME
from reddit.helpers import get_token, read_cache, cache


# Create your views here.
@login_required(login_url=LOGIN_URL)
def index(request):
    url = request.GET.get('url', 'r/all/rising')
    before = request.GET.get('before', '')
    after = request.GET.get('after', '')
    count = int(request.GET.get('count', 0))
    value = read_cache()
    if not value:
        token = get_token()
        headers = {"Authorization": token['token_type'] + ' ' + token['access_token'],
                   "User-Agent": "dpa by " + REDDIT_USERNAME}
        req_url = "https://oauth.reddit.com/{url}?limit=10&raw_json=1".format(url=url)
        if before:
            req_url = req_url + "&before=" + before
        if after:
            req_url = req_url + "&after=" + after
        if count:
            req_url = req_url + "&count=" + str(count)
        response: Response = requests.get(req_url, headers=headers)
        value = response.json()
        # cache(value)
    posts = []
    for item in value['data']['children']:
        post = {'title': item['data']['title'], 'url': item['data']['permalink'], 'score': item['data']['score'],
                'num_comments': item['data']['num_comments'], 'subreddit': item['data']['subreddit_name_prefixed'], }
        if 'preview' in item['data'] and 'images' in item['data']['preview']:
            post['thumb'] = item['data']['preview']['images'][0]['resolutions'][0]['url']
            if 'secure_media' in item['data'] and item['data']['secure_media'] and 'reddit_video' in item['data'][
                'secure_media']:
                post['media_url'] = item['data']['secure_media']['reddit_video']['fallback_url']
            else:
                post['media_url'] = item['data']['preview']['images'][0]['source']['url']
        posts.append(post)
    return render(request, 'reddit/index.html',
                  context={'posts': posts, 'url': url, 'after': value['data']['after'],
                           'before': value['data']['before'], 'count_after': str(count + 10), 'count_before': str(count - 10), })
