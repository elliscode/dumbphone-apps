import datetime
from zoneinfo import ZoneInfo

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from dumbphoneapps.settings import LOGIN_URL, DEBUG
from fooddiary.food_methods import parse_serving
from fooddiary.models import Food, DiaryEntry
from fooddiary.template_classes import TemplateEntry, TemplateFood, TemplateServing, TemplateMetadata
import json


# Create your views here.
@login_required(login_url=LOGIN_URL)
def index(request):
    return render(request, 'fooddiary/index.html', context={'debug': DEBUG, })


@login_required(login_url=LOGIN_URL)
def get_day(request):
    today = request.GET.get('date')
    if today:
        today = datetime.datetime.strptime(today, '%Y-%m-%d')
    else:
        today = datetime.datetime.now(tz=ZoneInfo("America/New_York"))
    today = today - datetime.timedelta(hours=today.hour) - datetime.timedelta(
        minutes=today.minute) - datetime.timedelta(seconds=today.second) - datetime.timedelta(
        microseconds=today.microsecond)
    tomorrow = today + datetime.timedelta(days=1)
    current_user = request.user
    diary_entries = DiaryEntry.objects.filter(user=current_user,
                                              time_stamp__range=[today,
                                                                 tomorrow]).order_by('time_stamp')
    template_entries = []
    total = 0
    for diary_entry in diary_entries:
        template_entry = TemplateEntry(diary_entry)
        total += template_entry.derived_values.calories
        template_entries.append(template_entry.to_dict())
    return JsonResponse({'total': round(total), 'entries': template_entries, })


@login_required(login_url=LOGIN_URL)
def add(request):
    food_name = request.GET.get('foodName')
    food = Food.objects.filter(name=food_name).first()
    if food is None:
        calories = request.GET.get('calories', 0)
        carbs = request.GET.get('carbs', 0)
        fat = request.GET.get('fat', 0)
        protein = request.GET.get('protein', 0)
        caffeine = request.GET.get('caffeine', 0)
        alcohol = request.GET.get('alcohol', 0)
        serving_string = request.GET.get('serving', '1 serving')
        serving: TemplateServing = parse_serving(serving_string)
        metadata = TemplateMetadata(
            string=json.dumps(
                {'calories': calories, 'carbs': carbs, 'fat': fat, 'protein': protein, 'caffeine': caffeine,
                 'alcohol': alcohol, }),
            serving=serving, )
        food = Food(name=food_name,
                    metadata=json.dumps(metadata.to_dict()), )
        food.save()

    current_user = request.user

    # search for previous diary entry for this food and user, and
    # if one exists, use that same serving for your new entry
    previous_entries = DiaryEntry.objects.filter(food=food, user=current_user, ).order_by('-time_stamp')
    if previous_entries is not None and previous_entries.first() is not None:
        previous_entry: DiaryEntry = previous_entries.first()
        diary_entry = DiaryEntry(food=food, user=current_user, quantity=previous_entry.quantity,
                                 serving=previous_entry.serving, )
    else:
        diary_entry = DiaryEntry(food=food, user=current_user, )
    diary_entry.save()

    return HttpResponse('Saved a diary entry')


@login_required(login_url=LOGIN_URL)
def search(request):
    query = request.GET.get('query')
    if not query:
        return JsonResponse({}, safe=False)
    foods = Food.objects.filter(name__icontains=query).order_by('name')[:1000]
    output = []
    for food in foods:
        output.append({'hash': food.hash, 'name': food.name, })
    return JsonResponse(output, safe=False)


@login_required(login_url=LOGIN_URL)
def get_serving(request):
    hash_to_get = request.GET.get('hash')
    item = Food.objects.filter(hash=hash_to_get).first()
    return JsonResponse(TemplateFood(item).to_dict(), safe=False)


@login_required(login_url=LOGIN_URL)
def set_serving(request):
    serving_name = request.GET.get('name')
    serving_quantity = float(request.GET.get('amount'))
    hash_to_get = request.GET.get('hash')
    item: DiaryEntry = DiaryEntry.objects.filter(hash=hash_to_get).first()
    food: TemplateFood = TemplateFood(item.food)
    serving: TemplateServing = food.metadata.get_serving(serving_name)
    derived_quantity = serving_quantity / serving.amount
    item.quantity = derived_quantity
    item.serving = serving_name
    item.save()
    return HttpResponse('updated ' + hash_to_get)


@login_required(login_url=LOGIN_URL)
def get_food(request):
    hash_to_get = request.GET.get('hash')
    item = Food.objects.filter(hash=hash_to_get).first()
    return JsonResponse(TemplateFood(item).to_dict(), safe=False)


@login_required(login_url=LOGIN_URL)
def set_food(request):
    hash_to_get = request.GET.get('hash')
    item: Food = Food.objects.filter(hash=hash_to_get).first()
    metadata: TemplateMetadata = TemplateFood(item).metadata;
    if request.GET['name'] and request.GET.get('name'):
        item.name = request.GET.get('name')
    if request.GET['calories'] and request.GET.get('calories'):
        str_val = request.GET.get('calories')
        try:
            flt_val = float(str_val)
            metadata.calories = flt_val
        except ValueError:
            pass
    if request.GET['protein'] and request.GET.get('protein'):
        str_val = request.GET.get('protein')
        try:
            flt_val = float(str_val)
            metadata.protein = flt_val
        except ValueError:
            pass
    if request.GET['carbs'] and request.GET.get('carbs'):
        str_val = request.GET.get('carbs')
        try:
            flt_val = float(str_val)
            metadata.carbs = flt_val
        except ValueError:
            pass
    if request.GET['fat'] and request.GET.get('fat'):
        str_val = request.GET.get('fat')
        try:
            flt_val = float(str_val)
            metadata.fat = flt_val
        except ValueError:
            pass
    if request.GET['alcohol'] and request.GET.get('alcohol'):
        str_val = request.GET.get('alcohol')
        try:
            flt_val = float(str_val)
            metadata.alcohol = flt_val
        except ValueError:
            pass
    if request.GET['caffeine'] and request.GET.get('caffeine'):
        str_val = request.GET.get('caffeine')
        try:
            flt_val = float(str_val)
            metadata.caffeine = flt_val
        except ValueError:
            pass
    item.metadata = json.dumps(metadata.to_dict());
    item.save()
    return HttpResponse('updated ' + hash_to_get)


@login_required(login_url=LOGIN_URL)
def delete(request):
    hash_to_delete = request.GET.get('hash')
    DiaryEntry.objects.filter(hash=hash_to_delete).delete()
    return HttpResponse('deleted ' + hash_to_delete)


@login_required(login_url=LOGIN_URL)
def delete_food(request):
    if DEBUG:
        return HttpResponse('You are not allowed to delete foods')
    hash_to_delete = request.GET.get('hash')
    Food.objects.filter(hash=hash_to_delete).delete()
    return HttpResponse('deleted ' + hash_to_delete)
