# Generated by Django 3.1 on 2020-09-18 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("jobs", "0002_occupationtransitions"),
    ]

    operations = [
        migrations.CreateModel(
            name="BlsOesFakes",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("area_title", models.CharField(max_length=10)),
                ("soc_code", models.CharField(max_length=7)),
                ("soc_title", models.CharField(max_length=200)),
                (
                    "hourly_mean_wage",
                    models.DecimalField(decimal_places=2, max_digits=10),
                ),
                (
                    "annual_mean_wage",
                    models.DecimalField(decimal_places=2, max_digits=10),
                ),
                ("total_employment", models.BigIntegerField()),
                ("soc_decimal_code", models.CharField(max_length=200)),
            ],
        ),
    ]
