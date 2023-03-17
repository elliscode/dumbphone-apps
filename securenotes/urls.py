from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_encrypted_data', views.get_encrypted_data, name='get_encrypted_data'),
    path('post_encrypted_data', views.post_encrypted_data, name='post_encrypted_data'),
]
