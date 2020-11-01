from jobs.models import Socs, BlsOes, StateAbbPairs, OccupationTransitions
from rest_framework import viewsets, permissions, generics
from rest_framework.throttling import AnonRateThrottle
from .serializers import (
    SocSerializer,
    BlsOesSerializer,
    StateNamesSerializer,
    SocListSerializer,
    OccupationTransitionsSerializer,
)

# Lead Viewset
class SocViewSet(viewsets.ModelViewSet):
    queryset = Socs.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SocSerializer
    throttle_classes = [AnonRateThrottle]


class BlsOesViewSet(viewsets.ModelViewSet):
    queryset = BlsOes.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BlsOesSerializer
    throttle_classes = [AnonRateThrottle]


class SocListSimpleViewSet(viewsets.ModelViewSet):
    queryset = BlsOes.objects.only("soc_code", "soc_title").distinct()
    permission_classes = [permissions.AllowAny]
    serializer_class = SocListSerializer
    throttle_classes = [AnonRateThrottle]


class StateViewSet(viewsets.ModelViewSet):
    queryset = StateAbbPairs.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = StateNamesSerializer
    throttle_classes = [AnonRateThrottle]


class OccupationTransitionsViewSetFive(viewsets.ModelViewSet):
    # Todo fix this using filtering instead of limiting the results
    queryset = OccupationTransitions.objects.all()[:500]
    permission_classes = [permissions.AllowAny]
    serializer_class = OccupationTransitionsSerializer
    throttle_classes = [AnonRateThrottle]
