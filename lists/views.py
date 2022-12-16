from dumbphoneapps.settings import LOGIN_URL
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .listmanager import get_list, delete_item, add_item


# Create your views here.
@login_required(login_url=LOGIN_URL)
def index(request):
    # read list from file
    list_content = get_list(request.user)
    return render(request, 'list-template.html', context={'list': list_content})


@login_required(login_url=LOGIN_URL)
def delete(request):
    group = request.GET.get('group', '')
    name = request.GET.get('name', '')
    delete_item(request.user, group, name)
    return JsonResponse({'group': group, 'name': name})


@login_required(login_url=LOGIN_URL)
def add(request):
    # get arguments
    group = request.GET.get('group', 'Groceries').strip()
    name = request.GET.get('name', '').strip()
    add_item(request.user, group, name)
    return JsonResponse({'group': group, 'name': name})


@login_required(login_url=LOGIN_URL)
def move(request):
    direction = request.GET.get('direction', 'up')
    group = request.GET.get('group', '')
    list_content = get_list()
    groups = list(list_content.keys())
    if group not in groups:
        return JsonResponse({})
    group_index = groups.index(group)
    if 'up' == direction:
        if 0 == group_index:
            return JsonResponse({})
        target_group = groups[group_index - 1]
        groups[group_index - 1] = group
        groups[group_index] = target_group
        output = {'groups': [group, target_group]};
    else:
        if len(groups) - 1 == group_index:
            return JsonResponse({})
        target_group = groups[group_index + 1]
        groups[group_index + 1] = group
        groups[group_index] = target_group
        output = {'groups': [target_group, group]}
    reordered_list = {}
    for item in groups:
        reordered_list[item] = list_content[item]
    return JsonResponse(output)
