from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('delete', views.delete, name='delete'),
    path('add', views.add, name='add'),
    path('move', views.move, name='move'),
    path('share', views.share, name='share'),
    path('add_group', views.add_group, name='add_group'),
    path('unadd_group', views.unadd_group, name='unadd_group'),
]