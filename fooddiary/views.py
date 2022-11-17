import datetime
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from dumbphoneapps.settings import LOGIN_REDIRECT_URL
from fooddiary.models import Food, DiaryEntry
from fooddiary.template_classes import TemplateEntry
import json


# Create your views here.
@login_required(login_url=LOGIN_REDIRECT_URL)
def index(request):
    today = datetime.datetime.today()
    tomorrow = today + datetime.timedelta(days=1)
    diary_entries = DiaryEntry.objects.filter(
        time_stamp__range=[today.strftime('%Y-%m-%d'), tomorrow.strftime('%Y-%m-%d')])
    template_entries = []
    total = 0
    for diary_entry in diary_entries:
        template_entry = TemplateEntry(diary_entry)
        if 'calories' in template_entry.food.metadata:
            total += int(template_entry.food.metadata['calories'])
        template_entries.append(template_entry)
    return render(request, 'food-diary-template.html', context={'total': total, 'entries': template_entries, })


@login_required(login_url=LOGIN_REDIRECT_URL)
def add(request):
    food_name = request.GET.get('foodName')
    food = Food.objects.filter(name=food_name).first()
    if food is None:
        calories = request.GET.get('calories', 0)
        carbs = request.GET.get('carbs', 0)
        fat = request.GET.get('fat', 0)
        protein = request.GET.get('protein', 0)
        food = Food(name=food_name,
                    metadata=json.dumps({'calories': calories, 'carbs': carbs, 'fat': fat, 'protein': protein, }), )
        food.save()

    current_user = request.user
    diary_entry = DiaryEntry(food=food, user=current_user, )
    diary_entry.save()

    return HttpResponse('Saved a diary entry')


@login_required(login_url=LOGIN_REDIRECT_URL)
def search(request):
    query = request.GET.get('query')
    foods = Food.objects.filter(name__icontains=query).order_by('name')[:10]
    output = []
    for food in foods:
        output.append(food.name)
    return JsonResponse(output, safe=False)


@login_required(login_url=LOGIN_REDIRECT_URL)
def delete(request):
    hash_to_delete = request.GET.get('hash')
    DiaryEntry.objects.filter(hash=hash_to_delete).delete()
    return HttpResponse('not implemented')
