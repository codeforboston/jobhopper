from jobs.models import Socs, BlsOes, StateAbbPairs, OccupationTransitions, SocDescription
from rest_framework import viewsets, permissions, generics
from rest_framework.throttling import AnonRateThrottle
import django_filters
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


class BlsOesFilter(django_filters.FilterSet):
    """
    Create a filter to use with the BlsOes model. When multiple options are chosen in these filters, there
    must be no space between comma-separated values
    """
    socs = django_filters.BaseInFilter(field_name='soc_code', lookup_expr='in')
    areas = django_filters.BaseInFilter(field_name='area_title', lookup_expr='in')

    class Meta:
        model = BlsOes
        fields = ['socs', 'areas']


class BlsOesViewSet(viewsets.ModelViewSet):
    queryset = BlsOes.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BlsOesSerializer
    throttle_classes = [AnonRateThrottle]
    filter_class = BlsOesFilter


class SocListFilter(django_filters.FilterSet):
    """
    Create a filter to use with the BlsOes model. When multiple options are chosen in these filters, there
    must be no space between comma-separated values
    """
    socs = django_filters.BaseInFilter(field_name='soc_code', lookup_expr='in')

    class Meta:
        model = SocDescription
        fields = ['socs']


class SocListSimpleViewSet(viewsets.ModelViewSet):
    queryset = SocDescription.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SocListSerializer
    throttle_classes = [AnonRateThrottle]
    filter_class = SocListFilter


class StateViewSet(viewsets.ModelViewSet):
    queryset = StateAbbPairs.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = StateNamesSerializer
    throttle_classes = [AnonRateThrottle]


class OccupationTransitionsFilter(django_filters.FilterSet):
    """
    Create a filter to use with the OccupationTransitions model in the Occupation Transitions viewset
    """
    # field_name instead of name, and lookup_expr instead of lookup_type is used for the NumberFilter for Django 2.0+
    min_transition_probability = django_filters.NumberFilter(field_name="pi", lookup_expr='gte')

    class Meta:
        model = OccupationTransitions
        fields = ['min_transition_probability', 'soc1']


class OccupationTransitionsViewSetFive(viewsets.ModelViewSet):
    queryset = OccupationTransitions.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = OccupationTransitionsSerializer
    throttle_classes = [AnonRateThrottle]
    filter_class = OccupationTransitionsFilter
