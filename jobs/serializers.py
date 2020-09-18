from rest_framework import serializers
from jobs.models import Socs

# Lead Serializer
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Socs
        fields = '__all__'

class SocSerializer(serializers.ModelSerializer):
    class Meta:
        model = 
        fields = '__all--'
