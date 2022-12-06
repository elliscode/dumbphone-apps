"""dumbphoneapps URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
    path('', include('home.urls')),
    path("accounts/", include("django.contrib.auth.urls")),
    path("accounts/signup", views.signup, name='signup'),
    path("accounts/signup/phone", views.signup_with_phone, name='signup_with_phone'),
    path("accounts/signup/email", views.signup_with_email, name='signup_with_email'),
    path("accounts/signup/user", views.signup_with_username_and_password, name='signup_with_username_and_password'),
    path('grocery-list/', include('lists.urls')),
    path('food-diary/', include('fooddiary.urls')),
    path('weather/', include('weather.urls')),
    path('admin/', admin.site.urls),
    path('hello-twilio/', views.hello, name='set_food'),
]