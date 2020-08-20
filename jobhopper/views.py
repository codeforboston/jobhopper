from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from . import views


def index(request):
    template = loader.get_template('jobhopper/index.html')
    context = {}
    return HttpResponse(template.render(context, request))

def detail(request, detail):
    return HttpResponse("You're looking at detail view")

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
