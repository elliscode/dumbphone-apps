from django.shortcuts import render
from django.http import HttpResponse
from .listmanager import get_list, write_list

# Create your views here.
def index(request):
    # read list from file
    # list_path = get_list_path()
    # print(list_path)
    list_content = get_list() 
    return render(request, 'list-template.html', context={'list': list_content})

def delete(request):
    group = request.GET.get('group', '')
    name = request.GET.get('name', '')
    list_content = get_list()
    if group in list_content:
        list_content[group].remove(name)
    write_list(list_content)
    return HttpResponse('Succesfully deleted')
