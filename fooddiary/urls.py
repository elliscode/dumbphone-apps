from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('delete', views.delete, name='delete'),
    path('add', views.add, name='add'),
    path('search', views.search, name='search'),
    path('get_serving', views.get_serving, name='get_serving'),
    path('set_serving', views.set_serving, name='set_serving'),
]