from rest_framework import serializers
from jobs.models import Socs, BlsOes, StateAbbPairs, OccupationTransitions, SocDescription


# Lead Serializer
class SocSerializer(serializers.ModelSerializer):
    class Meta:
        model = Socs
        fields = "__all__"


class BlsOesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlsOes
        fields = ("area_title",
                  "soc_code",
                  "soc_title",
                  "hourly_mean_wage",
                  "annual_mean_wage",
                  "total_employment",
                  "soc_decimal_code",
                  "file_year")


class SocListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocDescription
        fields = ("soc_code", "soc_title", "total_transition_obs")



class StateNamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateAbbPairs
        fields = "__all__"


class OccupationTransitionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OccupationTransitions
        fields = "__all__"


class BlsTransitionsSerializer(serializers.Serializer):
    """
    Serialize results from the BlsOes model and OccupationTransitions model into one response
    """
    bls = BlsOesSerializer(many=True)
    transitions = OccupationTransitionsSerializer(many=True)