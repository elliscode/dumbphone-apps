from django.shortcuts import render
from django.http import HttpResponse
from .listmanager import get_list

# Create your views here.
def index(request):
    # read list from file
    # list_path = get_list_path()
    # print(list_path)
    list_content = get_list() 
    return render(request, 'list-template.html', context={'list': list_content})