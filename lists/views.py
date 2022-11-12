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

def add(request):
    group = request.GET.get('group', 'Groceries')
    name = request.GET.get('name', '')
    list_content = get_list()
    if group not in list_content:
        list_content[group] = []
    list_content[group].append(name)
    write_list(list_content)
    return HttpResponse('Succesfully added')

def move(request):
    direction = request.GET.get('direction', 'up')
    group = request.GET.get('group', '')
    list_content = get_list()
    groups = list(list_content.keys())
    if group not in groups:
        return HttpResponse('Group does not exist')
    index = groups.index(group)
    if 'up' == direction:
        if 0 == index:
            return HttpResponse('Group cannot go any higher')
        temp = groups[index - 1]
        groups[index - 1] = group
        groups[index] = temp
    else:
        if len(groups) - 1 == index:
            return HttpResponse('Group cannot go any lower')
        temp = groups[index + 1]
        groups[index + 1] = group
        groups[index] = temp
    reordered_list = {}
    for group in groups:
        reordered_list[group] = list_content[group]
    write_list(reordered_list)
    return HttpResponse('Succesfully moved')
