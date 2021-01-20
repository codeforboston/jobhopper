import logging
from django.db import migrations, models

log = logging.getLogger()


class Migration(migrations.Migration):
    """
    Populate the total_transition_obs field in jobs_occupationtransitions and jobs_socdescription tables
    occupation_transition is populated by an earlier migration as part of the Python ingestion code

    According to Schubert, Stansbury, and Taska (2020), the total_obs field need not be an integer since it can be
    reweighted by age.

        UPDATE jobs_occupationtransitions AS jobs
        SET total_transition_obs = original.total_obs
        FROM occupation_transition AS original
        WHERE original.soc1 = jobs.soc1
            AND original.soc2 = jobs.soc2;

        UPDATE jobs_socdescription AS jobs
        SET total_transition_obs = original.total_obs
        FROM (SELECT DISTINCT soc1, total_obs
              FROM occupation_transition) AS original
        WHERE original.soc1 = jobs.soc_code;
    """
    dependencies = [
        ('jobs', '0014_auto_20210120_0044'),
    ]

    operations = [
        migrations.RunSQL([
            ("UPDATE jobs_socdescription AS jobs "
             "SET total_transition_obs = original.total_obs "
             "FROM (SELECT DISTINCT soc1, total_obs FROM occupation_transition) AS original "
             "WHERE original.soc1 = jobs.soc_code;")
        ],
        ["UPDATE jobs_socdescription SET total_transition_obs = NULL;"]
        ),
        migrations.RunSQL([
            ("UPDATE jobs_occupationtransitions AS jobs "
             "SET total_transition_obs = original.total_obs "
             "FROM occupation_transition AS original "
             "WHERE original.soc1 = jobs.soc1 "
             "  AND original.soc2 = jobs.soc2;"),
        ],
        ["UPDATE jobs_occupationtransitions SET total_transition_obs = NULL;"])
    ]