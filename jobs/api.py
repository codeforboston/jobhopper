from jobs.models import Socs, BlsOesFakes, StateAbbPairs, OccupationTransitions
from rest_framework import viewsets, permissions, generics
from .serializers import (
    SocSerializer,
    BlsOesSerializer,
    StateNamesSerializer,
    OccupationTransitionsSerializer,
)

# Lead Viewset
class SocViewSet(viewsets.ModelViewSet):
    queryset = Socs.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SocSerializer


class BlsOesViewSet(viewsets.ModelViewSet):
    queryset = BlsOesFakes.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BlsOesSerializer


class StateViewSet(viewsets.ModelViewSet):
    queryset = StateAbbPairs.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = StateNamesSerializer


class OccupationTransitionsViewSetFive(viewsets.ModelViewSet):
    # Todo fix this using filtering instead of limiting the results
    queryset = OccupationTransitions.objects.all()[:500]
    permission_classes = [permissions.AllowAny]
    serializer_class = OccupationTransitionsSerializer
