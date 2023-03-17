import datetime
import uuid

from django.conf import settings
from django.db import models


class SecureNote(models.Model):
    hash = models.UUIDField(primary_key=True,
                            default=uuid.uuid4,
                            verbose_name='Random UUID representing this list entry',
                            editable=False, )
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, )
    time_stamp = models.DateTimeField(default=datetime.datetime.now,
                                      verbose_name='time the entry was created',
                                      editable=True, )
    encrypted_text = models.TextField(verbose_name='The encrypted text to be stored',
                                      editable=True, )
    encrypted_sample = models.TextField(verbose_name='The encrypted text to be stored',
                                        editable=True, )
