from jobs.models import Socs, BlsOesFakes, StateAbbPairs
from rest_framework import viewsets, permissions, generics
from .serializers import LeadSerializer, BlsOesSerializer, StateNamesSerializer

# Lead Viewset
class LeadViewSet(viewsets.ModelViewSet):
    queryset = Socs.objects.all()
    permission_classes = [
        permissions.AllowAny

    ]
    serializer_class = LeadSerializer

class BlsOesViewSet(viewsets.ModelViewSet):
    queryset = BlsOesFakes.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BlsOesSerializer

class StateViewSet(viewsets.ModelViewSet):
    queryset = StateAbbPairs.objects.all() 
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StateNamesSerializer
