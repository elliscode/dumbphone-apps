from dumbphoneapps.settings import LOGIN_URL
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse
from .listmanager import get_list, write_list


# Create your views here.
@login_required(login_url=LOGIN_URL)
def index(request):
    # read list from file
    # list_path = get_list_path()
    # print(list_path)
    list_content = get_list()
    return render(request, 'list-template.html', context={'list': list_content})


@login_required(login_url=LOGIN_URL)
def delete(request):
    group = request.GET.get('group', '')
    name = request.GET.get('name', '')
    list_content = get_list()
    if group in list_content:
        list_content[group].remove(name)
    write_list(list_content)
    return HttpResponse('Successfully deleted')


@login_required(login_url=LOGIN_URL)
def add(request):
    group = request.GET.get('group', 'Groceries')
    name = request.GET.get('name', '')
    list_content = get_list()
    if group not in list_content:
        list_content[group] = []
    list_content[group].append(name)
    write_list(list_content)
    return HttpResponse('Successfully added')


@login_required(login_url=LOGIN_URL)
def move(request):
    direction = request.GET.get('direction', 'up')
    group = request.GET.get('group', '')
    list_content = get_list()
    groups = list(list_content.keys())
    if group not in groups:
        return HttpResponse('Group does not exist')
    group_index = groups.index(group)
    if 'up' == direction:
        if 0 == group_index:
            return HttpResponse('Group cannot go any higher')
        temp = groups[group_index - 1]
        groups[group_index - 1] = group
        groups[group_index] = temp
    else:
        if len(groups) - 1 == group_index:
            return HttpResponse('Group cannot go any lower')
        temp = groups[group_index + 1]
        groups[group_index + 1] = group
        groups[group_index] = temp
    reordered_list = {}
    for group in groups:
        reordered_list[group] = list_content[group]
    write_list(reordered_list)
    return HttpResponse('Successfully moved')
