from .models import Socs, BlsOes, StateAbbPairs, OccupationTransitions, SocDescription
from rest_framework import viewsets, permissions, generics
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response
from django.forms.models import model_to_dict
from collections import namedtuple
import django_filters
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.pagination import LimitOffsetPagination
from .serializers import (
    BlsOesSerializer,
    StateNamesSerializer,
    SocListSerializer,
    OccupationTransitionsSerializer,
    BlsTransitionsSerializer,
)


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


class BlsOesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for wage/employment data by location, SOC code, and year
    """
    queryset = BlsOes.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BlsOesSerializer
    throttle_classes = [AnonRateThrottle]
    pagination_class = LimitOffsetPagination
    filter_class = BlsOesFilter

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SocListFilter(django_filters.FilterSet):
    """
    Create a filter to use with the BlsOes model. When multiple options are chosen in these filters, there
    must be no space between comma-separated values
    """
    socs = django_filters.BaseInFilter(field_name='soc_code', lookup_expr='in')

    class Meta:
        model = SocDescription
        fields = ['socs']


class SocListSimpleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for all unique SOC codes and descriptions with wage/employment data available
    """
    queryset = SocDescription.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SocListSerializer
    throttle_classes = [AnonRateThrottle]
    filter_class = SocListFilter


class StateViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for states
    """
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


class OccupationTransitionsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for occupation transitions (burning glass) data
    """
    queryset = OccupationTransitions.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = OccupationTransitionsSerializer
    throttle_classes = [AnonRateThrottle]
    pagination_class = LimitOffsetPagination
    filter_class = OccupationTransitionsFilter


class BlsTransitionsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A custom ViewSet for BLS OES wage/employment data and occupation transitions/burning glass data
    See Swagger docs for more details on the GET endpoint /transitions-extended/.
    /transitions-extended/{id}/ is not supported.

    Sample endpoint query:
    ------------------------
    /?area_title=Massachusetts&soc=35-3031&min_transitions_probability=0.01
    """
    serializer_class = BlsTransitionsSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AnonRateThrottle]
    # swagger_schema = None         # Exclude from swagger schema.

    # Use a named tuple to pass data from multiple models to the response
    BLS_TRANSITIONS = namedtuple("BlsTransitions", ("bls", "transitions"))

    DEFAULT_AREA = "U.S."
    DEFAULT_SOC = "35-3031"         # 35-3031 is waiters and waitresses
    DEFAULT_TRANSITION_PROBABILITY = 0.01
    SOC_SWAGGER_PARAM = openapi.Parameter("soc",
                                          openapi.IN_QUERY,
                                          description="Source SOC code",
                                          type=openapi.TYPE_STRING)
    AREA_SWAGGER_PARAM = openapi.Parameter("area_title",
                                           openapi.IN_QUERY,
                                           description="Location",
                                           type=openapi.TYPE_STRING)
    PI_SWAGGER_PARAM = openapi.Parameter("min_transition_probability",
                                         openapi.IN_QUERY,
                                         description="Minimum transition probability",
                                         type=openapi.TYPE_NUMBER
                                         )

    def get_queryset(self):
        """
        Custom queryset used that is a combination of querysets from a couple models. Overwriting to prevent
        schema generation warning.
        """
        pass

    def _set_params(self, request):
        """
        :param request:
        :return:
        """
        area_title = request.query_params.get("area_title")
        source_soc = request.query_params.get("soc")
        min_transition_probability = request.query_params.get("min_transition_probability")

        if not area_title:
            self.area_title_filter = self.DEFAULT_AREA
        else:
            self.area_title_filter = area_title
        if not source_soc:
            self.source_soc = self.DEFAULT_SOC
        else:
            self.source_soc = source_soc
        if not min_transition_probability:
            self.min_transition_probability = self.DEFAULT_TRANSITION_PROBABILITY
        else:
            self.min_transition_probability = min_transition_probability

    @swagger_auto_schema(manual_parameters=[SOC_SWAGGER_PARAM, PI_SWAGGER_PARAM, AREA_SWAGGER_PARAM])
    def list(self, request):
        """
        Query parameters:
        ------------------------
        * area_title: Specify an area_title to return wages/employment for that location only
        States should be fully spelled out, consistent with the area_title field in the
        BlsOes model. The default is specified by DEFAULT_AREA

        * soc: Specify a source SOC code to return transitions data for people moving from this
        occupation to other occupations. The default is specified by DEFAULT_SOC

        * min_transition_probability: Specify the minimum transitions probability. Do not return any
        transitions records that have a probability of moving from SOC1 to SOC2 that is lower
        than this value.

        Multiple selections are not supported for this endpoint. The default response is displayed.

        Sample endpoint query:
        ------------------------
        * /?area_title=Massachusetts&soc=11-1011&min_transitions_probability=0.01

        Response format:
        ------------------------
        ```
        {"source_soc": {
            "source_soc_id": 242047,
            "source_soc_area_title": "U.S.",
            "source_soc_soc_code": "13-2011",
            "source_soc_soc_title": "Accountants and Auditors",
            "source_soc_hourly_mean_wage": 38.23,
            "source_soc_annual_mean_wage": 79520,
            "source_soc_total_employment": 1280700,
            "source_soc_soc_decimal_code": "13-2011.00",
            "source_soc_file_year": 2019
          },
        "transition_rows": [
            {
              "id": 1,
              "soc1": "13-2011",
              "soc2": "11-3031",
              "pi": 0.1782961,
              "soc2_id": 241905,
              "soc2_area_title": "U.S.",
              "soc2_soc_code": "11-3031",
              "soc2_soc_title": "Financial Managers",
              "soc2_hourly_mean_wage": 70.93,
              "soc2_annual_mean_wage": 147530,
              "soc2_total_employment": 654790,
              "soc2_soc_decimal_code": "11-3031.00",
              "soc2_file_year": 2019
            },
        ```
        """
        self._set_params(request)

        bls_transitions = self.BLS_TRANSITIONS(
            bls=(BlsOes.objects
                 .filter(area_title=self.area_title_filter)),
            transitions=(OccupationTransitions.objects
                         .filter(soc1=self.source_soc)
                         .filter(pi__gte=self.min_transition_probability)
                         ),
            )

        # Convert bls_transitions QuerySet to dicts & join the results
        # List of dicts, each containing metadata on SOCs and transitions
        bls = [model_to_dict(item)
               for item in bls_transitions[0]]
        transitions = [model_to_dict(item, exclude=["occleaveshare", "total_soc"])
                       for item in bls_transitions[1]]

        source_soc_info = [item
                           for item in bls
                           if item.get("soc_code") == self.source_soc]
        source_soc_info = [{f"source_soc_{key}": val
                            for key, val in record.items()}
                           for record in source_soc_info]
        assert len(source_soc_info) <= 1, "Duplicate SOC wage/employment data found in BlsOes model for this location!"
        if source_soc_info:
            source_soc_info = source_soc_info[0]

        destination_socs = [item.get("soc2") for item in transitions]

        destination_soc_map = {}
        for item in bls:
            if item.get("soc_code") in destination_socs:
                destination_soc_map.update({item.get("soc_code"): item})

        for transition in transitions:
            destination_soc = transition.get("soc2")
            destination_metadata = destination_soc_map.get(destination_soc)
            if destination_metadata:
                destination_metadata = {f"soc2_{key}": val
                                        for key, val in destination_metadata.items()}
                transition.update(destination_metadata)

        # Alternative for simple response that just lists the results from each model:
        #   serializer = BlsTransitionsSerializer(bls_transitions)
        #   return Response(serializer.data)
        return Response({
            "source_soc":  source_soc_info,
            "transition_rows": transitions,
        })
