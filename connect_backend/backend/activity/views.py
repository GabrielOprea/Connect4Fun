import json
from ..models import Activity, User

from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseNotAllowed
from django.core import serializers

def create_activity(request):
    json_data = json.loads(request.body.decode('utf-8'))
    user = User.objects.filter(pk=json_data.get("user_id"))
    json_data.pop("UserID_id")
    activity = Activity.objects.create(**json_data)
    activity.UserID = user
    activity.save()
    return HttpResponse(status=201)

def get_activity_by_id(request, activity_id):
    try:
        query_set = Activity.objects.filter(pk=activity_id)
    except Activity.DoesNotExist:
        raise Http404("Activity does not exist")
    data = serializers.serialize("json", query_set)
    return HttpResponse(data, status=200)

def get_all_activities(request):
    query_set = Activity.objects.all()
    data = serializers.serialize("json", query_set)
    return HttpResponse(data, status=200)

def update_activity_by_id(request, activity_id):
    activity = get_object_or_404(Activity, id=activity_id)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse(status=400)

    for key, value in data.items():
        setattr(activity, key, value)

    activity.save()

    return HttpResponse(status=200)

def delete_activity_by_id(request, activity_id):
    if request.method == 'DELETE':
        try:
            activity = Activity.objects.get(pk=activity_id)
        except Activity.DoesNotExist:
            raise Http404("Activity does not exist")

        activity.delete()
        return HttpResponse(status=200)
    else:
        raise HttpResponseNotAllowed("Method is not supported")