import time

import requests
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render

from dumbphoneapps.settings import LOGIN_URL
from weather.weather_helpers import get_api_key


# Create your views here.
@login_required(login_url=LOGIN_URL)
def index(request):
    return render(request, 'weather/index.html', context={})


@login_required(login_url=LOGIN_URL)
def get_weather(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    api_key = get_api_key()
    r = requests.get('https://api.openweathermap.org/data/2.5/weather',
                     params={'lat': lat, 'lon': lon, 'appid': api_key})
    result = r.json()
    return JsonResponse(result, safe=False)
