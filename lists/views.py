from dumbphoneapps.settings import LOGIN_URL
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .listmanager import get_list, write_list, determine_group_name, determine_item_name


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
    return JsonResponse({'group': group, 'name': name}, safe=False)


@login_required(login_url=LOGIN_URL)
def add(request):
    # get arguments
    group = request.GET.get('group', 'Groceries').strip()
    name = request.GET.get('name', '').strip()

    # verify arguments
    list_content = get_list()
    group = determine_group_name(list_content, group)
    if group not in list_content:
        list_content[group] = []
    name = determine_item_name(list_content, group, name)

    if not name:
        return JsonResponse({}, safe=False)
    list_content[group].append(name)
    write_list(list_content)
    return JsonResponse({'group': group, 'name': name}, safe=False)


@login_required(login_url=LOGIN_URL)
def move(request):
    direction = request.GET.get('direction', 'up')
    group = request.GET.get('group', '')
    list_content = get_list()
    groups = list(list_content.keys())
    if group not in groups:
        return JsonResponse({}, safe=False)
    group_index = groups.index(group)
    if 'up' == direction:
        if 0 == group_index:
            return JsonResponse({}, safe=False)
        target_group = groups[group_index - 1]
        groups[group_index - 1] = group
        groups[group_index] = target_group
        output = {'groups': [group, target_group]};
    else:
        if len(groups) - 1 == group_index:
            return JsonResponse({}, safe=False)
        target_group = groups[group_index + 1]
        groups[group_index + 1] = group
        groups[group_index] = target_group
        output = {'groups': [target_group, group]}
    reordered_list = {}
    for item in groups:
        reordered_list[item] = list_content[item]
    write_list(reordered_list)
    return JsonResponse(output, safe=False)
