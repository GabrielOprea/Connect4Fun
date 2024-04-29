import json
from ..models import Review

from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseNotAllowed
from django.core import serializers

def create_review(request):
    json_data = json.loads(request.body.decode('utf-8'))
    review = Review.objects.create(**json_data)
    review.save()
    return HttpResponse(status=201)

def get_review_by_id(request, review_id):
    try:
        query_set = Review.objects.filter(pk=review_id)
    except Review.DoesNotExist:
        raise Http404("Review does not exist")
    data = serializers.serialize("json", query_set)
    return HttpResponse(data, status=200)

def get_all_reviews(request):
    query_set = Review.objects.all()
    data = serializers.serialize("json", query_set)
    return HttpResponse(data, status=200)

def update_review_by_id(request, review_id):
    review = get_object_or_404(Review, id=review_id)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse(status=400)

    for key, value in data.items():
        setattr(review, key, value)

    review.save()

    return HttpResponse(status=200)

def delete_review_by_id(request, review_id):
    if request.method == 'DELETE':
        try:
            review = Review.objects.get(pk=review_id)
        except Review.DoesNotExist:
            raise Http404("Review does not exist")

        review.delete()
        return HttpResponse(status=200)
    else:
        raise HttpResponseNotAllowed("Method is not supported")