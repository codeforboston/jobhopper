# TODO: Abstract data cleaning step(s) and connection layer
# TODO: Change sqlalchemyengine creds based on prod location

# Requires jobhopper base directory to be added to PATH in venv/bin/activate
# Start postgres server first (default for macOS) pg_ctl -D /usr/local/var/postgres start

import logging
import os

import pandas as pd

from sqlalchemy.types import Integer, Numeric, String
from sqlalchemy import create_engine
from data.bls.oes_data_downloader import OESDataDownloader

logging.basicConfig(format="%(asctime)s %(message)s")
log = logging.getLogger()
log.setLevel(logging.INFO)


def create_sqlalchemyengine(
    username: str = "",
    password: str = "",
    port: str = "",
    host: str = "",
    db: str = ""):
    """
    Create a database connection to a SQLite database based on the specified params
    Note: Postgres must be installed with the project database to run this locally

    :param username: Database user, if available
    :param password: Password for the user, if available
    :param port: Default for Postgres is 5432
    :param host: localhost by default
    """
    if not db: db = "jobhopperdatabase" if not os.getenv("DB_NAME") else os.getenv("DB_NAME")
    if not username: username ="jobuser" if not os.getenv("DB_USER") else os.getenv("DB_USER")
    if not password: password = "jobuser" if not os.getenv("DB_PASSWORD") else os.getenv("DB_PASSWORD")
    if not port: port = "5432" if not os.getenv("DB_PORT") else os.getenv("DB_PORT")
    if not host: host = "localhost" if not os.getenv("DB_HOST") else os.getenv("DB_HOST")
    try:
        log.info("Connecting to Postgres DB via SQLAlchemy")
        engine = create_engine(
            "postgresql://{}:{}@{}:{}/{}".format(username, password, host, port, db)
        )
        return engine
    except Exception as e:
        log.error(e)


def load_bls_oes_to_sql(
    year: str = "2019",
    db: str = "jobhopperdatabase",
    table_name: str = "bls_oes"
):
    """
    Load BLS OES data from 2019 to the specified table_name. If no table_name is specified, return a dict.

    # TODO: Check OES data from prior years for formatting
    # TODO: Clean/combine SOC codes from datasets to include latest data on SOC codes from transitions data
    """
    log.info("Loading BLS wage and employment data to Postgres if a table_name is specified")
    engine = create_sqlalchemyengine(db=db)

    bls_oes_data = OESDataDownloader(year=year).download_oes_data(clean_up=True)

    if table_name:
        log.info("Successfully read OES data. Writing to the {} table".format(table_name))
        bls_oes_data.to_sql(
            table_name,
            engine,
            if_exists="replace",
            index=True,
            index_label="id",
            dtype={
                "soc_decimal_code": String(),
                "hourly_mean_wage": Numeric(),
                "annual_mean_wage": Numeric(),
                "total_employment": Integer(),
                "soc_code": String(),
                "soc_title": String(),
            },
        )
        engine.dispose()
        log.info("Successfully loaded BLS data to Postgres!")

    return bls_oes_data


def load_occupation_transitions_to_sql(
    file_path: str = "../occupation_transitions_public_data_set.csv",
    db: str = "jobhopperdatabase"):
    """
    Load the occupation transitions data to SQL from the CSV file in jobhopper.data
    """
    log.info("Loading occupation transitions (Burning Glass) data to Postgres")
    engine = create_sqlalchemyengine(db=db)
    occupation_transitions = pd.read_csv(
        file_path,
        na_values=["NA"],
        usecols=["soc1", "soc2", "total_soc", "pi", "occleaveshare"],
        dtype={
            "soc1": str,
            "soc2": str,
            "total_soc": int,
            "pi": float,
            "occleaveshare": float,
        },
    )
    occupation_transitions.to_sql(
        "occupation_transition",
        engine,
        if_exists="replace",
        index=False,
        dtype={
            "soc1": String(),
            "soc2": String(),
            "total_soc": Integer(),
            "pi": Numeric(),
            "occleaveshare": Numeric(),
        },
    )

    engine.dispose()

    return occupation_transitions


if __name__ == "__main__":
    """
    Expected results in postgres table:

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

    load_bls_oes_to_sql("")
    load_occupation_transitions_to_sql("")
