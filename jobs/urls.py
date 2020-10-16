from django.urls import path, include
from . import views
from rest_framework import routers
from .api import SocViewSet, BlsOesViewSet, StateViewSet,  OccupationTransitionsViewSetFive

router = routers.DefaultRouter()
router.register('transitions', OccupationTransitionsViewSetFive)
#router.register(r'transitions/(?P<soc>\d+)', OccupationTransitionsViewSet, basename='trans')
router.register('soc-codes', BlsOesViewSet)
router.register(r'state', StateViewSet, basename='abbr')
# router.register(r'state(?P<state_abb>.+)/$', StateViewSet, basename='state-name')

urlpatterns = [
    path('', include(router.urls)),
   

]
