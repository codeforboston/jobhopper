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
)

router = routers.DefaultRouter()
router.register("transitions", OccupationTransitionsViewSet)
router.register("soc-codes", BlsOesViewSet)
router.register("soc-list", SocListSimpleViewSet)
router.register(r"state", StateViewSet, basename="abbr")
router.register("transitions-extended", BlsTransitionsViewSet, basename="lol")

urlpatterns = [
    path("", include(router.urls)),
]
