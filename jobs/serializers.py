from rest_framework import serializers
from jobs.models import Socs, BlsOesFakes, StateAbbPairs

# Lead Serializer
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Socs
        fields = '__all__'

class BlsOesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlsOesFakes
        fields = '__all__'

class StateNamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateAbbPairs
        fields = '__all__'