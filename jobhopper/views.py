from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from . import views


def index(request):
    template = loader.get_template('jobhopper/index1.html')
    return HttpResponse(template.render())
