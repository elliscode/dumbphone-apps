from dumbphoneapps.settings import LOGIN_URL
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .listmanager import get_list, delete_item, add_item
from .models import ListGroup, UserGroupRelation


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
    result = add_item(request.user, group, name)
    return JsonResponse({'group': {'name': result['group'].name, 'hash': result['group'].hash},
                         'item': {'name': result['item'].name, 'hash': result['item'].hash}})


@login_required(login_url=LOGIN_URL)
def move(request):
    group_hashes = request.POST.getlist('group_hashes', [])
    i = 0
    for group_hash in group_hashes:
        groups: ListGroup = ListGroup.objects.filter(hash=group_hash, )
        for group in groups:
            relations: UserGroupRelation = UserGroupRelation.objects.filter(user=request.user, group=group)
            for relation in relations:
                relation.index = i
                relation.save()
        i = i + 1
    return JsonResponse({})
