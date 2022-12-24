import datetime
import secrets
import string
from zoneinfo import ZoneInfo

import phonenumbers
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import HttpResponse, HttpRequest
from django.shortcuts import render, redirect
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from phonenumbers import PhoneNumber, NumberParseException
from django.contrib.auth import login, logout as django_logout

import home
from .code_manager import generate_verification_code
from .models import OneTimePassCode
from sms import send_sms


def index(request: HttpRequest):
    error = request.session.get('error', '')
    request.session['error'] = None
    success = request.session.get('otp', '')
    request.session['otp'] = None
    # email = request.session.get('email', '')
    # request.session['email'] = None
    tel = request.session.get('tel', '')
    request.session['tel'] = None
    return render(request, 'login.html', context={'error': error, 'success': success, 'tel': tel, })


def signup_with_email(request: HttpRequest):
    # email_address = request.POST.get('email', '')
    # try:
    #     validate_email(email_address)
    # except ValidationError as e:
    #     request.session['error'] = 'Invalid email {email}'.format(email=email_address)
    #     return redirect('/accounts/login')

    phone_string = request.POST.get('tel', '')
    try:
        phone = phonenumbers.parse(phone_string, 'US')
        if not phonenumbers.is_possible_number(phone):
            raise Exception('invalid phone number')
    except NumberParseException as e:
        request.session['error'] = 'Invalid phone {phone}'.format(phone=phone_string)
        return redirect('/accounts/login')

    phone_string = str(phone.national_number)

    verification_code = generate_verification_code()

    user = User.objects.filter(username=phone_string).first()
    if not user:
        user = User.objects.create_user(username=phone_string,
                                        password=User.objects.make_random_password(length=26))

    otp = OneTimePassCode.objects.filter(user=user, ).first()
    if not otp:
        otp = OneTimePassCode()
        otp.user = user
    otp.otp = verification_code
    otp.time_stamp = datetime.datetime.now(tz=ZoneInfo("America/New_York"))
    otp.save()

    message = str(verification_code) + ' is your dumbphoneapps.com verification code'

    # send_mail(subject='Your dumbphoneapps.com verification code',
    #           message=message,
    #           from_email='dumbphoneapps@gmail.com',
    #           recipient_list=[email_address], fail_silently=False, )

    # send_sms(body=message, recipients=['+1' + str(phone.national_number)], fail_silently=False)

    request.session['otp'] = True
    # request.session['email'] = email_address
    request.session['tel'] = phone.national_number
    return redirect('/accounts/login')


def login_with_otp(request: HttpRequest):
    # email_address = request.POST.get('email', '')
    # try:
    #     validate_email(email_address)
    # except ValidationError as e:
    #     request.session['error'] = 'Invalid email {email}'.format(email=email_address)
    #     return redirect('/accounts/login')

    phone_string = request.POST.get('tel', '')
    try:
        phone = phonenumbers.parse(phone_string, 'US')
        if not phonenumbers.is_possible_number(phone):
            raise Exception('invalid phone number')
    except NumberParseException as e:
        request.session['error'] = 'Invalid phone {phone}'.format(phone=phone_string)
        return redirect('/accounts/login')

    otp = request.POST.get('otp', '')
    user = User.objects.filter(username=phone_string).first()
    otp_obj = OneTimePassCode.objects.filter(user=user, otp=otp).first()
    if otp_obj:
        login(request, user)
        return redirect(home.views.index)

    request.session['otp'] = True
    # request.session['email'] = email_address
    request.session['tel'] = phone.national_number
    return redirect('/accounts/login')


def logout(request: HttpRequest):
    django_logout(request)
    return redirect('/accounts/login')
