from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import JobClass, BlsOesFakes
from .serializers import BlsOesSerializer
from django.template import loader

# Create your views here.
def index(request):
    jobs = JobClass.objects.all()
    template = loader.get_template("jobs/index.html")
    context = {"jobs": jobs}
    return HttpResponse(template.render(context, request))

def description(request):
    soc = JobClass.jobcode
    title = JobClass.title
    description = JobClass.description
    return HttpResponse(soc, title, description)


def detail(request, detail):
    return HttpResponse("You're looking at detail view")
