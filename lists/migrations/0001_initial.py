# Generated by Django 4.1.3 on 2022-12-24 18:12

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
            name='ListGroup',
            fields=[
                ('hash', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='Random UUID representing this list entry')),
                ('name', models.TextField(default='Groceries', verbose_name='Group the list item belongs to')),
            ],
        ),
        migrations.CreateModel(
            name='UserGroupRelation',
            fields=[
                ('hash', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='Random UUID representing this group-user pair')),
                ('index', models.IntegerField(default=0, verbose_name='The order of the group for this particular user')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lists.listgroup')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ListItem',
            fields=[
                ('hash', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='Random UUID representing this list entry')),
                ('name', models.TextField(verbose_name='Name of the list item')),
                ('crossed_off', models.BooleanField(default=False, verbose_name='If this is true, the item has been crossed off')),
                ('time_stamp', models.DateTimeField(default=datetime.datetime.now, verbose_name='time the entry was created')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lists.listgroup')),
            ],
        ),
    ]