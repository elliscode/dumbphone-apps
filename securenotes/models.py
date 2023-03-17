import datetime
import uuid

from django.conf import settings
from django.db import models


class Notes(models.Model):
    hash = models.UUIDField(primary_key=True,
                            default=uuid.uuid4,
                            verbose_name='Random UUID representing this list entry',
                            editable=False, )
    time_stamp = models.DateTimeField(default=datetime.datetime.now,
                                      verbose_name='time the entry was created',
                                      editable=True, )
    encrypted_text = models.BinaryField(verbose_name='The encrypted text to be stored',
                                        editable=True, )
