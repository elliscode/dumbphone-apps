from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from dumbphoneapps.settings import LOGIN_URL


# Create your views here.
@login_required(login_url=LOGIN_URL)
def index(request):
    return render(request, 'securenotes/index.html')