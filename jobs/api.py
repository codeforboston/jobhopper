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
    
    def get_queryset(self, *args, **kwargs):
        # return StateAbbPairs.objects.filter(abbreviation=self.kwargs['state_abb'])
        # return StateAbbPairs.objects.filter(pk = self.kwargs['pk'])
        return StateAbbPairs.objects.all();
       
    
    serializer_class = StateNamesSerializer
