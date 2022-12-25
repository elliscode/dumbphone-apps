import datetime
import uuid

from django.db import models

from django.conf import settings


# Create your models here.
class OneTimePassCode(models.Model):
    hash = models.UUIDField(primary_key=True,
                            default=uuid.uuid4,
                            verbose_name='Random UUID representing this OTP entry',
                            editable=False, )
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, )
    otp = models.TextField(verbose_name='Latest one time passcode sent to the email address')
    time_stamp = models.DateTimeField(default=datetime.datetime.now,
                                      verbose_name='time the entry was created',
                                      editable=False, )


class PreviousLoginFailure(models.Model):
    hash = models.UUIDField(primary_key=True,
                            default=uuid.uuid4,
                            verbose_name='Random UUID representing this failure entry',
                            editable=False, )
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, )
    time_stamp = models.DateTimeField(default=datetime.datetime.now,
                                      verbose_name='time the user last failed',
                                      editable=False, )
