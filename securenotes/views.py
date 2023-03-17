import datetime
import uuid

from django.contrib.auth.decorators import login_required
from django.db.models import QuerySet
from django.http import JsonResponse
from django.shortcuts import render

from dumbphoneapps.settings import LOGIN_URL
from securenotes.models import SecureNote


# Create your views here.
@login_required(login_url=LOGIN_URL)
def index(request):
    return render(request, 'securenotes/index.html')


@login_required(login_url=LOGIN_URL)
def get_encrypted_data(request):
    samples_list: list[SecureNote] = SecureNote.objects.filter(user=request.user, )
    output_list = []
    for sample in samples_list:
        output_list.append({
            'hash': sample.hash,
            'timestamp': sample.time_stamp,
            'encrypted_text': sample.encrypted_text,
            'encrypted_sample': sample.encrypted_sample,
        })
    return JsonResponse({'encrypted_samples': output_list})


@login_required(login_url=LOGIN_URL)
def post_encrypted_data(request):
    encrypted_sample = request.POST.get('encrypted_sample', '')
    encrypted_note = request.POST.get('encrypted_note', '')
    hash_value = request.POST.get('hash', uuid.uuid4())
    note: SecureNote = SecureNote.objects.filter(user=request.user, hash=hash_value, ).first()
    if note:
        # check if the encrypted sample you are sending matches the encrypted sample we have
        if encrypted_sample != note.encrypted_sample:
            return JsonResponse({'status': 'fail', 'message': 'Encrypted sample string provided did not match'})
        note.encrypted_text = encrypted_note
        note.time_stamp = datetime.datetime.now()
    else:
        note = SecureNote(user=request.user, hash=hash_value, encrypted_text=encrypted_note, encrypted_sample=encrypted_sample)
    note.save()
    return JsonResponse({'status': 'success', 'message': 'Successfully saved record', 'hash': note.hash})

