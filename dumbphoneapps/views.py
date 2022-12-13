from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import HttpResponse, HttpRequest
from django.shortcuts import render

from dumbphoneapps.code_manager import generate_verification_code


def hello(request):
    return render(request, 'hello-twilio.html', )


def signup(request):
    return render(request, 'signup.html', )


def signup_with_phone(request: HttpRequest):
    print(request.POST['phone'])
    return HttpResponse(status=204)


def signup_with_email(request: HttpRequest):
    email_address = request.POST['email']
    verification_code = generate_verification_code()
    send_mail(subject='Your dumbphoneapps.com verification code',
              message=('Your dumbphoneapps.com verification code is: ' + str(verification_code)),
              from_email='dumbphoneapps@gmail.com',
              recipient_list=[email_address], fail_silently=False, )
    return HttpResponse(status=204)


def signup_with_username_and_password(request: HttpRequest):
    print(request.POST['username'])
    print(request.POST['password'])
    user = User.objects.create_user(username=request.POST['username'],
                                    password=request.POST['password'], )
    return HttpResponse(status=204)
