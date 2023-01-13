from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('delete', views.delete, name='delete'),
    path('delete_food', views.delete_food, name='delete_food'),
    path('add', views.add, name='add'),
    path('search', views.search, name='search'),
    path('get_serving', views.get_serving, name='get_serving'),
    path('set_serving', views.set_serving, name='set_serving'),
    path('get_food', views.get_food, name='get_food'),
    path('set_food', views.set_food, name='set_food'),
    path('get_day', views.get_day, name='get_day'),
]