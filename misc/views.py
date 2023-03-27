import datetime
import logging
from zoneinfo import ZoneInfo

import phonenumbers
from django.contrib.auth.models import User
from django.http import HttpRequest
from django.shortcuts import render, redirect
from phonenumbers import NumberParseException, PhoneNumber
from django.contrib.auth import login, logout as django_logout
import math

import home
from dumbphoneapps.settings import OTP_CODE_TIMEOUT, OTP_RETRY_LIMIT, DEBUG
from .code_manager import generate_verification_code, generate_numeric_verification_code
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
    return render(request, 'misc/login.html', context={'error': error, 'success': success, 'tel': tel, })


def send_otp(user, phone):
    verification_code = generate_numeric_verification_code()

    otp = OneTimePassCode.objects.filter(user=user, ).first()
    if not otp:
        otp = OneTimePassCode()
        otp.user = user
    otp.otp = verification_code
    otp.time_stamp = datetime.datetime.now(tz=ZoneInfo("America/New_York"))
    otp.save()

    message = str(verification_code) + ' is your dumbphoneapps.com verification code' + '\n\n' + '@dumbphoneapps.com #' + str(verification_code)

    if DEBUG:
        logger.info(message)
    else:
        send_sms(body=message, recipients=['+1' + str(phone.national_number)], fail_silently=False)


def signup_with_phone(request: HttpRequest):
    phone_string = request.POST.get('tel', '')
    try:
        phone: PhoneNumber = phonenumbers.parse(phone_string, 'US')
        if not phonenumbers.is_possible_number(phone):
            raise NumberParseException(1, 'invalid phone number')
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
        phone: PhoneNumber = phonenumbers.parse(phone_string, 'US')
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
        if difference < OTP_RETRY_LIMIT:
            request.session['otp'] = True
            request.session['tel'] = phone.national_number
            request.session['error'] = 'You\'re trying that too soon, please try again in {diff:.0f} seconds'.format(
                diff=math.ceil((OTP_RETRY_LIMIT - difference).total_seconds()))
            return redirect('/accounts/login')

    otp = request.POST.get('otp', '')
    otp_obj = OneTimePassCode.objects.filter(user=user, otp__iexact=otp).first()

    if otp_obj is not None and current_time - otp_obj.time_stamp > OTP_CODE_TIMEOUT:
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
    msg = 'Invalid passcode supplied, please try again in {timeout:.0f} seconds'.format(timeout=OTP_RETRY_LIMIT.total_seconds())
    request.session['error'] = msg
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
