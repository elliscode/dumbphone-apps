import logging

import phonenumbers
from django.contrib.auth.models import User
from django.core.mail import send_mail
from phonenumbers import NumberParseException
from sms import send_sms

from dumbphoneapps.settings import LOGIN_URL
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse

from dumbphoneapps.utils import parse_phone_number
from .listmanager import get_list, delete_item, add_item
from .models import ListGroup, UserGroupRelation, ListItem
from urllib.parse import quote

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)8.8s] %(message)s",
    handlers=[logging.StreamHandler(), ],
)
logger = logging.getLogger(__name__)


# Create your views here.
@login_required(login_url=LOGIN_URL)
def index(request):
    added = request.session.get('added', '')
    request.session['added'] = None
    removed = request.session.get('removed', '')
    request.session['removed'] = None
    list_content = get_list(request.user)
    return render(request, 'list-template.html', context={'list': list_content, 'added': added, 'removed': removed, })


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
    if not name or not group:
        return JsonResponse({})
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
        # now check and see if you have a group assigned to you with
        # that name already, and if you do, just add everything from
        # that group to your new group
        same_name_groups: list[ListGroup] = ListGroup.objects.filter(name__iexact=group.name, )
        for same_name_group in same_name_groups:
            other_group_relation = UserGroupRelation.objects.filter(user=request.user, group=same_name_group, )
            if other_group_relation:
                if same_name_group.hash == group.hash:
                    request.session['added'] = '"{group_name}" already exists in your lists'.format(
                        group_name=group.name, )
                    return redirect('/grocery-list')
                items_to_switch: list[ListItem] = ListItem.objects.filter(group=same_name_group, )
                for item in items_to_switch:
                    new_item = ListItem(name=item.name, group=group, time_stamp=item.time_stamp,
                                        crossed_off=item.crossed_off)
                    new_item.save()
                other_group_relation.delete()
                all_other_relations = UserGroupRelation.objects.filter(group=same_name_group)
                if not all_other_relations:
                    same_name_group.delete()
        ugr = UserGroupRelation(user=request.user, group=group, )
        ugr.save()
        request.session['added'] = 'Successfully added "{group_name}" to your lists'.format(group_name=group.name, )
    return redirect('/grocery-list')


@login_required(login_url=LOGIN_URL)
def unadd_group(request):
    group_hash = request.GET.get('hash')
    groups: ListGroup = ListGroup.objects.filter(hash=group_hash, )
    for group in groups:
        relations: UserGroupRelation = UserGroupRelation.objects.filter(user=request.user, group=group)
        for relation in relations:
            relation.delete()
            request.session['removed'] = 'Successfully removed "{group_name}" from your lists'.format(
                group_name=group.name, )
    return redirect('/grocery-list')


@login_required(login_url=LOGIN_URL)
def delete_group(request):
    group_hash = request.GET.get('hash')
    groups: list[ListGroup] = ListGroup.objects.filter(hash=group_hash, )
    for group in groups:
        relations: list[UserGroupRelation] = UserGroupRelation.objects.filter(user=request.user, group=group)
        for relation in relations:
            relation.delete()
            request.session['removed'] = 'Successfully removed "{group_name}" from your lists'.format(
                group_name=group.name, )
            all_relations = UserGroupRelation.objects.filter(user=request.user, group=group)
            if all_relations is None:
                group.delete()
                request.session['removed'] = 'Successfully deleted "{group_name}" from the database'.format(
                    group_name=group.name, )
    return redirect('/grocery-list')


@login_required(login_url=LOGIN_URL)
def share(request):
    group_hash = request.GET.get('group_hash', None)
    group = None
    groups = ListGroup.objects.filter(hash=group_hash)
    for found_group in groups:
        group = found_group
    if group is None:
        return JsonResponse({'message': 'invalid group {hash}'.format(hash=group_hash), })

    current_phone_number = parse_phone_number(request.user.username)
    other_phone_number = parse_phone_number(request.GET.get('tel', None))
    if current_phone_number is None:
        error_message = 'Invalid phone {phone}'.format(phone=request.user.username)
        return JsonResponse({'message': error_message, })
    if other_phone_number is None:
        error_message = 'Invalid phone {phone}'.format(phone=request.GET.get('tel', None))
        return JsonResponse({'message': error_message, })

    found_other_user = None
    other_users = User.objects.filter(username=other_phone_number.national_number)
    for other_user in other_users:
        found_other_user = other_user

    if not found_other_user:
        error_message = 'User {phone} not found'.format(phone=request.GET.get('tel', None))
        return JsonResponse({'message': error_message, })

    message = '{current_user} wants to share "{group_name}" the list with you, ' \
              'if you want to accept, please click this link' '\n' \
              'https://dumbphoneapps.com/grocery-list/add_group?hash={group_hash}' '\n\n' \
              'If you wish to remove this group in the future, please click this link:' '\n' \
              'https://dumbphoneapps.com/grocery-list/unadd_group?hash={group_hash}'
    message = message.format(current_user=current_phone_number.national_number, group_hash=group.hash,
                             group_name=group.name, )
    logger.info(message)
    send_sms(body=message, recipients=['+1' + str(other_phone_number.national_number)], fail_silently=False)

    success_message = 'Successfully invited {user} to the {group} list'.format(
        user=other_phone_number.national_number,
        group=group.name)
    return JsonResponse({'message': success_message})
