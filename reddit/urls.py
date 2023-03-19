from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('view_post/', views.view_post, name='view_post'),
    path('view_img/', views.view_img, name='view_img'),
    path('get_more/', views.get_more, name='get_more'),
]