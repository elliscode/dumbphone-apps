import json

import requests
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
from requests import Response
import json_stream.requests

from dumbphoneapps.settings import LOGIN_URL, REDDIT_USERNAME
from reddit.helpers import get_token, read_cache, cache, extract_image_data


# Create your views here.
@login_required(login_url=LOGIN_URL)
def index(request):
    url = request.GET.get('url', 'r/all')
    before = request.GET.get('before', '')
    after = request.GET.get('after', '')
    count = int(request.GET.get('count', 0))
    value = read_cache()
    if not value:
        token = get_token()
        headers = {"Authorization": token['token_type'] + ' ' + token['access_token'],
                   "User-Agent": "dpa by " + REDDIT_USERNAME}
        req_url = "https://oauth.reddit.com/{url}?limit=10&raw_json=1".format(url=url)
        if count:
            req_url = req_url + "&count=" + str(count)
            if before:
                req_url = req_url + "&before=" + before
            if after:
                req_url = req_url + "&after=" + after
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
        post = {'title': data['title'], 'subreddit': data['subreddit_name_prefixed'], 'score': data['score'], }
        extract_image_data(post, data)
        post['num_comments'] = data['num_comments']
        post['url'] = data['url']
        post['permalink'] = data['permalink']
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
            'num_comments': data['num_comments'], 'subreddit': data['subreddit_name_prefixed'],
            'selftext': data.get('selftext', '') }
    extract_image_data(post, data)
    comments = value[1]['data']['children']
    return render(request, 'reddit/post.html', context={'post': post, 'comments': comments})


@login_required(login_url=LOGIN_URL)
def view_img(request):
    url = request.GET.get('url', '')
    if not url:
        return HttpResponseBadRequest('you need to provide a url for this to work')
    return render(request, 'reddit/img.html', context={'href': url})


@login_required(login_url=LOGIN_URL)
def get_more(request):
    input_id = request.GET.get('id', '')
    url = request.GET.get('url', '')
    if not input_id:
        return HttpResponseBadRequest('you need to provide an id for this to work')
    value = read_cache()
    if not value:
        token = get_token()
        headers = {"Authorization": token['token_type'] + ' ' + token['access_token'],
                   "User-Agent": "dpa by " + REDDIT_USERNAME}
        # req_url = "https://oauth.reddit.com/api/morechildren?link_id={id}&raw_json=1".format(id=input_id, url=url )
        req_url = "https://oauth.reddit.com/{url}{id}&raw_json=1".format(id=input_id, url=url)
        response: Response = requests.get(req_url, headers=headers)
        if response.status_code == 401:
            token = get_token(force=True)
            headers["Authorization"] = token['token_type'] + ' ' + token['access_token']
            response: Response = requests.get(req_url, headers=headers)
        value = response.json()
        # cache(value)
    return JsonResponse({'value': value, })