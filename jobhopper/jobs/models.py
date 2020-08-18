from django.db import models

# Create your models here.
class JOBCLASS(models.Model):
    jobcode = models.IntegerField(default=0)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=400)
