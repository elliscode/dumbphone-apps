from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from dumbphoneapps.settings import LOGIN_REDIRECT_URL
from fooddiary.models import Food, DiaryEntry
import json


# Create your views here.
@login_required(login_url=LOGIN_REDIRECT_URL)
def index(request):
    return render(request, 'food-diary-template.html', context={})


@login_required(login_url=LOGIN_REDIRECT_URL)
def add(request):
    food_name = request.GET.get('foodName')
    food = Food.objects.filter(name=food_name).first()
    if food is None:
        food = Food(name=food_name, metadata=json.dumps({}), )
    food.save()

    current_user = request.user
    diary_entry = DiaryEntry(food_hash=food, user_hash=current_user, )
    diary_entry.save()

    return HttpResponse('Saved a diary entry')


@login_required(login_url=LOGIN_REDIRECT_URL)
def delete(request):
    return HttpResponse('not implemented')
