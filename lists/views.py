from django.contrib.auth.models import User
from django.core.mail import send_mail

from dumbphoneapps.settings import LOGIN_URL
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .listmanager import get_list, delete_item, add_item
from .models import ListGroup, UserGroupRelation
from urllib.parse import quote


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
    return HttpResponse(status=204)


@login_required(login_url=LOGIN_URL)
def add_group(request):
    group_hash = request.GET.get('hash')
    groups: ListGroup = ListGroup.objects.filter(hash=group_hash, )
    for group in groups:
        ugr = UserGroupRelation(user=request.user, group=group, )
        ugr.save()
    return redirect('/grocery-list')


@login_required(login_url=LOGIN_URL)
def unadd_group(request):
    group_hash = request.GET.get('hash')
    groups: ListGroup = ListGroup.objects.filter(hash=group_hash, )
    for group in groups:
        relations: UserGroupRelation = UserGroupRelation.objects.filter(user=request.user, group=group)
        for relation in relations:
            relation.delete()
    return redirect('/grocery-list')


@login_required(login_url=LOGIN_URL)
def share(request):
    current_user_name = request.user.email
    other_user_name = request.GET.get('user', None)
    group_hash = request.GET.get('group_hash', None)
    group = None
    groups = ListGroup.objects.filter(hash=group_hash)
    for found_group in groups:
        group = found_group
    if group is None:
        return JsonResponse({})
    other_users = User.objects.filter(email=other_user_name)
    for other_user in other_users:
        send_mail(subject=(current_user_name + ' wants to share the ' + group.name + ' list with you!'),
                  message=(current_user_name + ' wants to share the ' + group.name +
                           ' list with you, if you want to accept, please click this link' + '\n' +
                           'https://dumbphoneapps.com/grocery-list/add_group?hash=' + str(group.hash) + '\n\n' +
                           'If you wish to remove this group in the future, please click this link:' + '\n' +
                           'https://dumbphoneapps.com/grocery-list/unadd_group?hash=' + str(group.hash)),
                  from_email='dumbphoneapps@gmail.com',
                  recipient_list=[other_user.email], fail_silently=False, )
    return JsonResponse({})
