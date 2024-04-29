import json
from ..models import Message

from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseNotAllowed
from django.core import serializers

def create_message(request):
    json_data = json.loads(request.body.decode('utf-8'))
    message = Message.objects.create(**json_data)
    message.save()
    return HttpResponse(status=201)

def get_message_by_id(request, message_id):
    try:
        query_set = Message.objects.filter(pk=message_id)
    except Message.DoesNotExist:
        raise Http404("Message does not exist")
    data = serializers.serialize("json", query_set)
    return HttpResponse(data, status=200)

def get_all_messages(request):
    query_set = Message.objects.all()
    data = serializers.serialize("json", query_set)
    return HttpResponse(data, status=200)

def update_message_by_id(request, message_id):
    message = get_object_or_404(Message, id=message_id)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse(status=400)

    for key, value in data.items():
        setattr(message, key, value)

    message.save()

    return HttpResponse(status=200)

def delete_message_by_id(request, message_id):
    if request.method == 'DELETE':
        try:
            message = Message.objects.get(pk=message_id)
        except Message.DoesNotExist:
            raise Http404("Message does not exist")

        message.delete()
        return HttpResponse(status=200)
    else:
        raise HttpResponseNotAllowed("Method is not supported")