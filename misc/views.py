import datetime
import secrets
import string
from zoneinfo import ZoneInfo

from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import HttpResponse, HttpRequest
from django.shortcuts import render, redirect
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

import home
from .code_manager import generate_verification_code
from .models import OneTimePassCode
from django.contrib.auth import login


def hello(request):
    return render(request, 'hello-twilio.html', )


def signup_with_email(request: HttpRequest):
    email_address = request.POST['email']
    try:
        validate_email(email_address)
    except ValidationError as e:
        return HttpResponse(status=500)

    verification_code = generate_verification_code()

    user = User.objects.filter(email=email_address).first()
    if not user:
        user = User.objects.create_user(username=''.join(secrets.choice(string.ascii_letters) for i in range(26)),
                                        email=email_address,
                                        password=User.objects.make_random_password(length=26))

    otp = OneTimePassCode.objects.filter(user=user, ).first()
    if not otp:
        otp = OneTimePassCode()
        otp.user = user
    otp.otp = verification_code
    otp.time_stamp = datetime.datetime.now(tz=ZoneInfo("America/New_York"))
    otp.save()

    send_mail(subject='Your dumbphoneapps.com verification code',
              message=(str(verification_code) + '\n\n' + 'Your dumbphoneapps.com verification code is: ' + str(verification_code)),
              from_email='dumbphoneapps@gmail.com',
              recipient_list=[email_address], fail_silently=False, )

    return HttpResponse(status=204)


def login_with_otp(request: HttpRequest):
    email_address = request.POST['email']
    otp = request.POST['otp']
    user = User.objects.filter(email=email_address).first()
    otp_obj = OneTimePassCode.objects.filter(user=user, otp=otp).first()
    if otp_obj:
        login(request, user)
    return redirect(home.views.index)
