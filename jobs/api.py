from jobs.models import Socs
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead Viewset
class LeadViewSet(viewsets.ModelViewSet):
    queryset = Socs.objects.all()
    permission_classes = [
        permissions.AllowAny

    ]

    serializer_class = LeadSerializer

class SocViewSet(viewsets.ModelViewSet):
    #queryset = # TODO
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = SocSerializer
