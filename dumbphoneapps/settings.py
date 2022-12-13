"""
Django settings for dumbphoneapps project.

Generated by 'django-admin startproject' using Django 4.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os
import secrets
from warnings import filterwarnings

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# this is the name of the directory that will be used in the USER area
USER_FOLDER_NAME = 'd2mbphone-apps'
home = Path.home()
if not os.path.exists(home / USER_FOLDER_NAME):
    os.makedirs(home / USER_FOLDER_NAME)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# We will check if there exists a secret, if not, write out a
# randomly generated key, and use it
home = Path.home()
secret_path = home / USER_FOLDER_NAME / 'secret-key.txt'
if not os.path.isfile(secret_path):
    secret_file = open(secret_path, 'w')
    secret_file.write(secrets.token_urlsafe())
    secret_file.close()
secret_file = open(secret_path, 'r')
SECRET_KEY = secret_file.readline()

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', 'dumbphoneapps.com']

CSRF_TRUSTED_ORIGINS = ['https://*.dumbphoneapps.com']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'fooddiary',
    'home',
    'lists'
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

LOGIN_URL = '/accounts/login/'

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

# email
home = Path.home()
email_path = home / USER_FOLDER_NAME / 'email-credentials.txt'
if not os.path.isfile(email_path):
    email_file = open(email_path, 'w')
    email_file.write("EMAIL_BACKEND=" + "\n")
    email_file.write("EMAIL_HOST=" + "\n")
    email_file.write("EMAIL_PORT=" + "\n")
    email_file.write("EMAIL_HOST_USER=" + "\n")
    email_file.write("EMAIL_HOST_PASSWORD=" + "\n")
    email_file.write("EMAIL_USE_TLS=" + "\n")
    email_file.write("EMAIL_USE_SSL=" + "\n")
    email_file.close()
email_file = open(email_path, 'r')
for line in email_file.readlines():
    if line.startswith("EMAIL_BACKEND="):
        value = line[len("EMAIL_BACKEND="):].strip()
        if value:
            EMAIL_BACKEND = value
    if line.startswith("EMAIL_HOST="):
        value = line[len("EMAIL_HOST="):].strip()
        if value:
            EMAIL_HOST = value
    elif line.startswith("EMAIL_PORT="):
        value = line[len("EMAIL_PORT="):].strip()
        if value:
            EMAIL_PORT = value
    elif line.startswith("EMAIL_HOST_USER="):
        value = line[len("EMAIL_HOST_USER="):].strip()
        if value:
            EMAIL_HOST_USER = value
    elif line.startswith("EMAIL_HOST_PASSWORD="):
        value = line[len("EMAIL_HOST_PASSWORD="):].strip()
        if value:
            EMAIL_HOST_PASSWORD = value
    elif line.startswith("EMAIL_USE_TLS="):
        value = line[len("EMAIL_USE_TLS="):].strip()
        if value:
            EMAIL_USE_TLS = ("True" == value)
    elif line.startswith("EMAIL_USE_SSL="):
        value = line[len("EMAIL_USE_SSL="):].strip()
        if value:
            EMAIL_USE_SSL = ("True" == value)

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
SESSION_COOKIE_AGE = 1 * 60 * 60 * 24 * 365

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
