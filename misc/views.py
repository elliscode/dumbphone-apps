import datetime
import logging
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
from dumbphoneapps.settings import OTP_CODE_TIMEOUT
from .code_manager import generate_verification_code
from .models import OneTimePassCode, PreviousLoginFailure
from sms import send_sms

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)8.8s] %(message)s",
    handlers=[logging.StreamHandler(), ],
)
logger = logging.getLogger(__name__)


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


def send_otp(user, phone):
    verification_code = generate_verification_code()

    otp = OneTimePassCode.objects.filter(user=user, ).first()
    if not otp:
        otp = OneTimePassCode()
        otp.user = user
    otp.otp = verification_code
    otp.time_stamp = datetime.datetime.now(tz=ZoneInfo("America/New_York"))
    otp.save()

    message = str(verification_code) + ' is your dumbphoneapps.com verification code'

    logger.info(message)
    send_sms(body=message, recipients=['+1' + str(phone.national_number)], fail_silently=False)


def signup_with_email(request: HttpRequest):
    phone_string = request.POST.get('tel', '')
    try:
        phone = phonenumbers.parse(phone_string, 'US')
        if not phonenumbers.is_possible_number(phone):
            raise Exception('invalid phone number')
    except NumberParseException as e:
        request.session['error'] = 'Invalid phone {phone}'.format(phone=phone_string)
        return redirect('/accounts/login')

    phone_string = str(phone.national_number)

    user = User.objects.filter(username=phone_string).first()
    if not user:
        user = User.objects.create_user(username=phone_string,
                                        password=User.objects.make_random_password(length=26))

    send_otp(user, phone)

    request.session['otp'] = True
    request.session['tel'] = phone.national_number
    return redirect('/accounts/login')


def login_with_otp(request: HttpRequest):
    phone_string = request.POST.get('tel', '')
    try:
        phone = phonenumbers.parse(phone_string, 'US')
        if not phonenumbers.is_possible_number(phone):
            raise Exception('invalid phone number')
    except NumberParseException as e:
        request.session['error'] = 'Invalid phone {phone}'.format(phone=phone_string)
        return redirect('/accounts/login')

    user = User.objects.filter(username=phone_string).first()
    current_time = datetime.datetime.now(tz=ZoneInfo("America/New_York"))
    previous_failure = PreviousLoginFailure.objects.filter(user=user, )
    if previous_failure:
        difference = (current_time - previous_failure.first().time_stamp)
        if difference < datetime.timedelta(seconds=15):
            request.session['otp'] = True
            request.session['tel'] = phone.national_number
            request.session['error'] = 'You\'re trying that too soon, please try again in {diff} seconds'.format(
                diff=(datetime.timedelta(seconds=15) - difference).seconds)
            return redirect('/accounts/login')

    otp = request.POST.get('otp', '')
    otp_obj = OneTimePassCode.objects.filter(user=user, otp__iexact=otp).first()

    if current_time - otp_obj.time_stamp > OTP_CODE_TIMEOUT:
        request.session['otp'] = True
        request.session['tel'] = phone.national_number
        request.session['error'] = 'Your OTP has expired, we are sending you a new one, please use the new one instead'
        send_otp(user, phone)
        return redirect('/accounts/login')
    if otp_obj:
        login(request, user)
        otp_obj.delete()
        return redirect(home.views.index)

    request.session['otp'] = True
    request.session['tel'] = phone.national_number
    request.session['error'] = 'Invalid passcode supplied, please try again in 15 seconds'
    if previous_failure:
        current_failure = previous_failure.first()
        current_failure.time_stamp = current_time
    else:
        current_failure = PreviousLoginFailure(user=user, time_stamp=current_time, )
    current_failure.save()
    return redirect('/accounts/login')


def logout(request: HttpRequest):
    django_logout(request)
    return redirect('/accounts/login')
