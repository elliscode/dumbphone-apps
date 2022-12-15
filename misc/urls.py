from django.urls import path

from . import views

urlpatterns = [
    path("signup/email", views.signup_with_email, name='signup_with_email'),
    path("login/otp", views.login_with_otp, name='login_with_otp'),
]