from jobs.models import SOCs
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead Viewset
class LeadViewSet(viewsets.ModelViewSet):
    queryset = SOCs.objects.all()
    permission_classes = [
        permissions.AllowAny

    ]

    serializer_class = LeadSerializer