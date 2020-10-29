from data.scripts.sql_loader import (
    load_bls_oes_to_sql,
    load_occupation_transitions_to_sql,
)
from pathlib import Path
from dotenv import load_dotenv


def run(bls_year="2019"):
    """
    Load BLS OES wage/employment data and job transitions data into a locally configured postgres database.
    Refer to the jobhopper README for notes on installing and configuring postgres.

    Expected output:

    jobhopperdatabase=# SELECT * FROM bls_oes_data LIMIT 5;
     area_title | soc_code |                   soc_title                    | hourly_mean_wage | annual_mean_wage | total_employment | soc_decimal_code
    ------------+----------+------------------------------------------------+------------------+------------------+------------------+------------------
     U.S.       | 11-0000  | Management Occupations                         |            58.88 |         122480.0 |          8054120 | 11-0000.00
     U.S.       | 13-0000  | Business and Financial Operations Occupations  |            37.56 |          78130.0 |          8183750 | 13-0000.00
     U.S.       | 15-0000  | Computer and Mathematical Occupations          |            45.08 |          93760.0 |          4552880 | 15-0000.00
     U.S.       | 17-0000  | Architecture and Engineering Occupations       |            42.69 |          88800.0 |          2592680 | 17-0000.00
     U.S.       | 19-0000  | Life, Physical, and Social Science Occupations |            37.28 |          77540.0 |          1288920 | 19-0000.00

     jobhopperdatabase=# SELECT * FROM occupation_transition LIMIT 5;
      soc1   |  soc2   | total_soc |           pi            | occleaveshare
    ---------+---------+-----------+-------------------------+---------------
     11-1011 | 17-1022 |   1425400 |            0.0006041965 |    0.14635982
     11-1011 | 25-1065 |   1425400 | 0.000023418379999999998 |    0.14635982
     11-1011 | 33-9032 |   1425400 |            0.0028994256 |    0.14635982
     11-1011 | 53-7073 |   1425400 |          0.000013282203 |    0.14635982
     11-1011 | 19-4031 |   1425400 |  0.00004537824000000001 |    0.14635982
    """
    path = Path(__file__).parent / "occupation_transitions_public_data_set.csv"
    load_occupation_transitions_to_sql(path)
    load_bls_oes_to_sql(year=bls_year)


if __name__ == "__main__":
    load_dotenv(dotenv_path=Path('.') / ".env")
    run(bls_year="2019")
