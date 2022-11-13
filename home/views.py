from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from django.contrib.auth.models import User
from dumbphoneapps.settings import LOGIN_REDIRECT_URL


# Create your views here.
@login_required(login_url=LOGIN_REDIRECT_URL)
def index(request):
    return render(request, 'index-template.html', context={})