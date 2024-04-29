import json
from ..models import Event, User, Activity

from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseNotAllowed
from django.core import serializers

def create_event(request):
    json_data = json.loads(request.body.decode('utf-8'))
    user = User.objects.filter(pk=json_data.get("user_id"))
    activity = Activity.objects.filter(pk=json_data.get("activity_id"))
    json_data.pop("UserID_id")
    json_data.pop("ActivityID_id")
    event = Event.objects.create(**json_data)
    event.UserID = user
    event.ActivityID = activity
    event.save()
    return HttpResponse(status=201)

def get_event_by_id(request, event_id):
    try:
        query_set = Event.objects.filter(pk=event_id)
    except Event.DoesNotExist:
        raise Http404("Event does not exist")
    data = serializers.serialize("json", query_set)
    return HttpResponse(data, status=200)

def get_all_events(request):
    query_set = Event.objects.all()
    data = serializers.serialize("json", query_set)
    return HttpResponse(data, status=200)

def update_event_by_id(request, event_id):
    event = get_object_or_404(Event, id=event_id)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse(status=400)

    for key, value in data.items():
        setattr(event, key, value)

    event.save()

    return HttpResponse(status=200)

def delete_event_by_id(request, event_id):
    if request.method == 'DELETE':
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            raise Http404("Event does not exist")

        event.delete()
        return HttpResponse(status=200)
    else:
        raise HttpResponseNotAllowed("Method is not supported")