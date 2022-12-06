from django.contrib.auth.models import User
from django.http import HttpResponse, HttpRequest
from django.shortcuts import render


def hello(request):
    return render(request, 'hello-twilio.html', )


def signup(request):
    return render(request, 'signup.html', )


def signup_with_phone(request: HttpRequest):
    print(request.POST['phone'])
    return HttpResponse(status=204)


def signup_with_email(request: HttpRequest):
    print(request.POST['email'])
    return HttpResponse(status=204)


def signup_with_username_and_password(request: HttpRequest):
    print(request.POST['username'])
    print(request.POST['password'])
    user = User.objects.create_user(username=request.POST['username'],
                                    password=request.POST['password'],)
    return HttpResponse(status=204)
