# Generated by Django 4.1.3 on 2022-12-16 01:22

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='OneTimePassCode',
            fields=[
                ('hash', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='Random UUID representing this OTP entry')),
                ('otp', models.TextField(verbose_name='Latest one time passcode sent to the email address')),
                ('time_stamp', models.DateTimeField(default=datetime.datetime.now, editable=False, verbose_name='time the entry was created')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
