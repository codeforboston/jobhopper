"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from . import views

schema_view = get_schema_view(
    openapi.Info(
        title="Jobhopper API",
        default_version='v1',
        description="Jobhopper Swagger API Docs",
    ),
    public=True,
)

urlpatterns = [
    path("api/v1/docs", schema_view.with_ui('swagger', cache_timeout=0), name="docs"),
    path("api/v1/jobs/", include("jobs.urls")),
    path("api/v1/health", views.health, name="health"),
    path("", schema_view.with_ui('swagger', cache_timeout=0)),
]
