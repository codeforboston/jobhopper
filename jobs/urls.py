from django.urls import path, include
from . import views
from rest_framework import routers
from .api import LeadViewSet, BlsOesViewSet, StateViewSet

router = routers.DefaultRouter()
router.register('leads', LeadViewSet)
router.register('soc-codes', BlsOesViewSet)
router.register(r'state', StateViewSet, basename='abbr')
# router.register(r'state(?P<state_abb>.+)/$', StateViewSet, basename='state-name')

urlpatterns = [
    path('', include(router.urls)),
   

]
