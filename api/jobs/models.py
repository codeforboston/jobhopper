from django.db import models

# Create your models here.
class JobClass(models.Model):
    jobcode = models.IntegerField(default=0)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=400)
    date = models.DateTimeField(auto_now_add=True)


class Socs(models.Model):
    detailedOccupation = models.IntegerField(unique=True)
    detailName = models.CharField(max_length=400)
    majorGroup = models.CharField(max_length=7)
    minorGroup = models.CharField(max_length=7)
    broadGroup = models.CharField(max_length=7)
    majorName = models.CharField(max_length=200)
    minorName = models.CharField(max_length=200)
    broadName = models.CharField(max_length=200)


# This is the burning glass data. total_transition_obs is reweighted by age, and is sometimes not an integer.
class OccupationTransitions(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True)
    soc1 = models.CharField(max_length=7, null=True)
    soc2 = models.CharField(max_length=7, null=True)
    total_soc = models.BigIntegerField(null=True)
    pi = models.DecimalField(decimal_places=10, max_digits=11, null=True)
    occleaveshare = models.DecimalField(decimal_places=10, max_digits=11, null=True)
    total_transition_obs = models.DecimalField(decimal_places=5, max_digits=20, null=True)


class BlsOesFakes(models.Model):
    area_title = models.CharField(max_length=10)
    soc_code = models.CharField(max_length=7)
    soc_title = models.CharField(max_length=200)
    hourly_mean_wage = models.DecimalField(max_digits=10, decimal_places=2)
    annual_mean_wage = models.DecimalField(max_digits=10, decimal_places=2)
    total_employment = models.BigIntegerField()
    soc_decimal_code = models.CharField(max_length=200)


class BlsOes(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False)
    area_title = models.CharField(max_length=255, null=True)
    soc_code = models.CharField(max_length=10, null=True)
    soc_title = models.CharField(max_length=255, null=True)
    hourly_mean_wage = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    annual_mean_wage = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    total_employment = models.BigIntegerField(null=True)
    soc_decimal_code = models.CharField(max_length=10, null=True)
    file_year = models.IntegerField(null=True)


class SocDescription(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False)
    soc_code = models.CharField(max_length=10, null=True)
    soc_title = models.CharField(max_length=255, null=True)
    total_transition_obs = models.DecimalField(decimal_places=5, max_digits=20, null=True)


class StateAbbPairs(models.Model):
    state_name = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=2, primary_key=True)
