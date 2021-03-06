from django.urls import path, include
# from . import views # Relevant ViewSets are contained in api.py
# from django.conf.urls import url
from rest_framework import routers
from .api import (
    SocListSimpleViewSet,
    BlsOesViewSet,
    StateViewSet,
    OccupationTransitionsViewSet,
    BlsTransitionsViewSet,
    SocListSmartViewSet
)

router = routers.DefaultRouter()
router.register("transitions", OccupationTransitionsViewSet)
router.register("soc-codes", BlsOesViewSet)
router.register("soc-list", SocListSimpleViewSet)
router.register("state", StateViewSet, basename="abbr")
router.register("transitions-extended", BlsTransitionsViewSet, basename="lol")
router.register("soc-smart-list", SocListSmartViewSet, basename="onet")

urlpatterns = [
    path("", include(router.urls)),
]
