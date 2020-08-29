from rest_framework import serializers
from jobs.models import Socs

# Lead Serializer
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Socs
        fields = '__all__'