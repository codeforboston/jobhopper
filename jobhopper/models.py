from django.db import models

# Create your models here.
class SOCs(models.Model):
    detailedOccupation = models.CharField(max_length=7)
    detailName = models.CharField(max_length=400)
    majorGroup = models.CharField(max_length=7)
    minorGroup = models.CharField(max_length=7)
    broadGroup = models.CharField(max_length=7)
    majorName = models.CharField(max_length=200)
    minorName = models.CharField(max_length=200)
    broadName = models.CharField(max_length=200)
