from django.shortcuts import render
from django.http import HttpResponse
from .models import JOBCLASS
from django.template import loader

# Create your views here.
def index(request):
    jobs  =JOBCLASS.objects.all()
    template = loader.get_template('jobs/index.html')
    context = { 'jobs': jobs }
    return HttpResponse(template.render(context, request))

def description(request):
    soc= JOBCLASS.jobcode
    title = JOBCLASS.title
    description = JOBCLASS.description
    return HttpResponse(soc, title, description)