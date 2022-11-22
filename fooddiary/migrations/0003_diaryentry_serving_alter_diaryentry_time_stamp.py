# Generated by Django 4.1.3 on 2022-11-18 17:51

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fooddiary', '0002_alter_diaryentry_time_stamp_alter_food_metadata'),
    ]

    operations = [
        migrations.AddField(
            model_name='diaryentry',
            name='serving',
            field=models.TextField(default='serving', verbose_name='String representation of the serving, as shown in the metadata field of the food'),
        ),
        migrations.AlterField(
            model_name='diaryentry',
            name='time_stamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 18, 12, 51, 57, 560386), editable=False, verbose_name='time the entry was created'),
        ),
    ]