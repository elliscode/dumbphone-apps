"""
Django settings for dumbphoneapps project.

Generated by 'django-admin startproject' using Django 4.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
import datetime
from pathlib import Path
import os
import secrets
from warnings import filterwarnings

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# this is the name of the directory that will be used in the USER area
USER_FOLDER_NAME = 'dumbphone-apps'
home = Path.home()
if not os.path.exists(home / USER_FOLDER_NAME):
    os.makedirs(home / USER_FOLDER_NAME)

# We will check if there exists a secret.
#
# If not, or if it is older than 30 days,
# we will write out a new one.
home = Path.home()
secret_path = home / USER_FOLDER_NAME / 'secret-key.txt'
should_create_file = not os.path.isfile(secret_path)
if not should_create_file:
    file_age = datetime.datetime.now() - datetime.datetime.fromtimestamp(os.path.getmtime(secret_path))
    if file_age.days >= 30:
        should_create_file = True
if should_create_file:
    secret_file = open(secret_path, 'w')
    secret_file.write(secrets.token_urlsafe())
    secret_file.close()
secret_file = open(secret_path, 'r')
SECRET_KEY = secret_file.readline()

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['localhost', 'dumbphoneapps.com']

CSRF_TRUSTED_ORIGINS = ['https://*.dumbphoneapps.com']

# Application definition

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'fooddiary',
    'home',
    'lists',
    'misc',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
]

LOGIN_URL = '/accounts/login'

ROOT_URLCONF = 'dumbphoneapps.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.template.context_processors.static',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dumbphoneapps.wsgi.application'

# sms
SMS_BACKEND = 'sms.backends.twilio.SmsBackend'
twilio_path = home / USER_FOLDER_NAME / 'twilio-credentials.txt'
if not os.path.isfile(twilio_path):
    twilio_file = open(twilio_path, 'w')
    twilio_file.write("TWILIO_ACCOUNT_SID=" + "\n")
    twilio_file.write("TWILIO_AUTH_TOKEN=" + "\n")
    twilio_file.write("DEFAULT_FROM_SMS=" + "\n")
    twilio_file.close()
twilio_file = open(twilio_path, 'r')
for line in twilio_file.readlines():
    if line.startswith("TWILIO_ACCOUNT_SID="):
        value = line[len("TWILIO_ACCOUNT_SID="):].strip()
        if value:
            TWILIO_ACCOUNT_SID = value
    elif line.startswith("TWILIO_AUTH_TOKEN="):
        value = line[len("TWILIO_AUTH_TOKEN="):].strip()
        if value:
            TWILIO_AUTH_TOKEN = value
    elif line.startswith("DEFAULT_FROM_SMS="):
        value = line[len("DEFAULT_FROM_SMS="):].strip()
        if value:
            DEFAULT_FROM_SMS = value

OTP_CODE_TIMEOUT = datetime.timedelta(minutes=5)
OTP_RETRY_LIMIT = datetime.timedelta(seconds=15)

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

# Command to create a database:
# ~/pgsql/bin/initdb.exe --encoding=UTF8 --username=user --pgdata=${HOME}/pgsql-data-3

home = Path.home()
postgres_password_path = home / USER_FOLDER_NAME / 'database-password.txt'
postgres_password_file = open(secret_path, 'r')
DATABASE_PASSWORD = postgres_password_file.readline()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'user',
        'PASSWORD': DATABASE_PASSWORD,
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

# this is to stop the annoying timezone warning
filterwarnings('ignore', message=r'.*received a naive datetime')

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Session expiration stuff

SESSION_EXPIRE_AT_BROWSER_CLOSE = False
SESSION_COOKIE_AGE = 1 * 60 * 60 * 24 * 120  # four months

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_ROOT = BASE_DIR / "collected-static/"

STATIC_URL = 'static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
