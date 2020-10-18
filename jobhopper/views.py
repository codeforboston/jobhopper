from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from datetime import datetime
from . import views


def index(request):

    template = loader.get_template("jobhopper/index.html")
    context = {}
    return HttpResponse(template.render(context, request))


def detail(request, detail):
    return HttpResponse("You're looking at detail view")


def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)


def health(request):
    """
    Provide a static health output that should work and return 200
    Just pasted a random uuid4 into the output. No particular meaning.
    """

    data = {
        "status": "pass",
        "version": "1",
        "releaseID": "1.0.0",
        "notes": [""],
        "output": "",
        "serviceID": "2b57f72d-0baf-4480-8e2e-4162b2431dc7",
        "description": "health of jobhopper data api service",
        "details": {
            "utctime": [
                {
                    "componentType": "systemtimeutc",
                    "status": "pass",
                    "time": f"{datetime.now().utcnow().strftime('%Y-%M-%dT%H:%M:%S.%mZ')}",
                }
            ]
        },
    }
    return JsonResponse(data)
