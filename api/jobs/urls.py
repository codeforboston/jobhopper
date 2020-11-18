from django.urls import path, include
from . import views
from rest_framework import routers
from .api import (
    SocListSimpleViewSet,
    BlsOesViewSet,
    StateViewSet,
    OccupationTransitionsViewSet,
)

router = routers.DefaultRouter()
router.register("transitions", OccupationTransitionsViewSet)
router.register("soc-codes", BlsOesViewSet)
router.register("soc-list", SocListSimpleViewSet)
router.register(r"state", StateViewSet, basename="abbr")

urlpatterns = [
    path("", include(router.urls)),
]
