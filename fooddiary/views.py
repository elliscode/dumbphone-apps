from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from dumbphoneapps.settings import LOGIN_REDIRECT_URL


# Create your views here.
@login_required(login_url=LOGIN_REDIRECT_URL)
def index(request):
    return render(request, 'food-diary-template.html', context={})


@login_required(login_url=LOGIN_REDIRECT_URL)
def add(request):
    return HttpResponse('not implemented')


@login_required(login_url=LOGIN_REDIRECT_URL)
def delete(request):
    return HttpResponse('not implemented')
