import uuid

from django.db import models
from django.conf import settings
from datetime import datetime


# Create your models here.
class Food(models.Model):
    hash = models.UUIDField(primary_key=True,
                            default=uuid.uuid4,
                            verbose_name='Random UUID representing this particular food',
                            editable=False, )
    name = models.TextField(verbose_name='Human readable title for this particular food')
    metadata = models.TextField(
        verbose_name='either a JSON representing the macronutrition of the food, or a JSON representing a recipe for '
                     'this particular food')


class DiaryEntry(models.Model):
    hash = models.UUIDField(primary_key=True,
                            default=uuid.uuid4,
                            verbose_name='Random UUID representing this diary entry',
                            editable=False, )
    quantity = models.FloatField(default=1.0,
                                 verbose_name='The amount ingested of the food specified in the food_hash column')
    food = models.ForeignKey(Food,
                             on_delete=models.CASCADE, )
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, )
    serving = models.TextField(verbose_name='String representation of the serving, as shown in the metadata field of '
                                            'the food',
                               default='serving', )
    time_stamp = models.DateTimeField(default=datetime.now,
                                      verbose_name='time the entry was created',
                                      editable=False, )
