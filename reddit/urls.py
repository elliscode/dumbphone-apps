from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('view_post/', views.view_post, name='view_post'),
]