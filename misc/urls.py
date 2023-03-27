from django.urls import path

from . import views

urlpatterns = [
    path("login", views.index, name='signup'),
    path("login/signup", views.signup_with_phone, name='signup'),
    path("login/otp", views.login_with_otp, name='otp'),
    path("logout", views.logout, name='logout'),
]