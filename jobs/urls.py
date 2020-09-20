from django.urls import path, include
from . import views
from rest_framework import routers
from .api import LeadViewSet, BlsOesViewSet

router = routers.DefaultRouter()
router.register('leads', LeadViewSet)
router.register('soc-codes', BlsOesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
