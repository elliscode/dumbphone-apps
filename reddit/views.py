import json

import requests
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponseBadRequest
from django.shortcuts import render
from requests import Response
import json_stream.requests

from dumbphoneapps.settings import LOGIN_URL, REDDIT_USERNAME
from reddit.helpers import get_token, read_cache, cache, iterate_for_key_until


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
        if response.status_code == 401:
            token = get_token(force=True)
            headers["Authorization"] = token['token_type'] + ' ' + token['access_token']
            response: Response = requests.get(req_url, headers=headers)
        value = response.json()
        # cache(value)
    posts = []
    for item in value['data']['children']:
        data = item['data']
        post = {'title': data['title'], 'subreddit': data['subreddit_name_prefixed'], 'score': data['score'],
                'thumb': data['thumbnail'], }
        [found, found_value] = iterate_for_key_until(data, 'preview', 'num_comments')
        if found:
            post['media_url'] = found_value['images'][0]['source']['url']
            post['num_comments'] = data['num_comments']
        else:
            post['num_comments'] = found_value
        post['url'] = data['permalink']
        # if 'preview' in data and 'images' in data['preview']:
        #     post['thumb'] = data['preview']['images'][0]['resolutions'][0]['url']
        #     if 'secure_media' in data and data['secure_media'] and 'reddit_video' in data['secure_media']:
        #         post['media_url'] = data['secure_media']['reddit_video']['fallback_url']
        #     else:
        #         post['media_url'] = data['preview']['images'][0]['source']['url']
        posts.append(post)
    return render(request, 'reddit/index.html',
                  context={'posts': posts, 'url': url, 'after': value['data']['after'],
                           'before': value['data']['before'], 'count_after': str(count + 10),
                           'count_before': str(count - 10), })


@login_required(login_url=LOGIN_URL)
def view_post(request):
    url = request.GET.get('url', '')
    if not url:
        return HttpResponseBadRequest('you need to provide a url for this to work')
    value = read_cache()
    if not value:
        token = get_token()
        headers = {"Authorization": token['token_type'] + ' ' + token['access_token'],
                   "User-Agent": "dpa by " + REDDIT_USERNAME}
        req_url = "https://oauth.reddit.com/{url}?raw_json=1".format(url=url)
        response: Response = requests.get(req_url, headers=headers)
        value = response.json()
        # cache(value)
    data = value[0]['data']['children'][0]['data']
    post = {'title': data['title'], 'url': data['permalink'], 'score': data['score'],
            'num_comments': data['num_comments'], 'subreddit': data['subreddit_name_prefixed'], }
    comments = value[1]['data']['children']
    return render(request, 'reddit/post.html', context={'post': post, 'comments': comments})