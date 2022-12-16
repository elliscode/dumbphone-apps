import datetime
import uuid

from django.conf import settings
from django.db import models


class ListGroup(models.Model):
    hash = models.UUIDField(primary_key=True,
                            default=uuid.uuid4,
                            verbose_name='Random UUID representing this list entry',
                            editable=False, )
    group = models.TextField(default="Groceries",
                             verbose_name='Group the list item belongs to',
                             editable=True, )


class UserGroupRelation(models.Model):
    hash = models.UUIDField(primary_key=True,
                            default=uuid.uuid4,
                            verbose_name='Random UUID representing this group-user pair',
                            editable=False, )
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, )
    group = models.ForeignKey(ListGroup, on_delete=models.CASCADE, )


class ListItem(models.Model):
    hash = models.UUIDField(primary_key=True,
                            default=uuid.uuid4,
                            verbose_name='Random UUID representing this list entry',
                            editable=False, )
    group = models.ForeignKey(ListGroup,
                              on_delete=models.CASCADE, )
    name = models.TextField(verbose_name='Name of the list item',
                            editable=True, )
    crossed_off = models.BooleanField(default=False,
                                      verbose_name='If this is true, the item has been crossed off',
                                      editable=True, )
    time_stamp = models.DateTimeField(default=datetime.datetime.now,
                                      verbose_name='time the entry was created',
                                      editable=True, )
