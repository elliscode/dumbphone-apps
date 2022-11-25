import time

import requests
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render

from dumbphoneapps.settings import LOGIN_URL
from weather.weather_helpers import get_api_key, get_from_file_if_recent_enough, write_result


# Create your views here.
@login_required(login_url=LOGIN_URL)
def index(request):
    return render(request, 'weather-template.html', context={})


@login_required(login_url=LOGIN_URL)
def get_weather(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    api_key = get_api_key()
    # result = get_from_file_if_recent_enough()
    # if not result:
    #     r = requests.get('https://api.openweathermap.org/data/2.5/weather',
    #                      params={'lat': lat, 'lon': lon, 'appid': api_key})
    #     result = r.json()
    #     write_result(result)
    r = requests.get('https://api.openweathermap.org/data/2.5/weather',
                     params={'lat': lat, 'lon': lon, 'appid': api_key})
    result = r.json()
    return JsonResponse(result, safe=False)
