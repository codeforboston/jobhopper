from jobs.models import Socs, BlsOesFakes
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer, BlsOesSerializer

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
