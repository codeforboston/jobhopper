from rest_framework import serializers
from jobs.models import SOCs

# Lead Serializer
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = SOCs
        fields = '__all__'