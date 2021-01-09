# Requires jobhopper base directory to be added to PATH in venv/bin/activate
# Start postgres server first (default for macOS) pg_ctl -D /usr/local/var/postgres start

import logging
import os

import pandas as pd

from sqlalchemy.types import Integer, Numeric, String
from sqlalchemy import create_engine
from data.bls.oes_data_downloader import download_multi_year_oes

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
    start_year: int = 2017,
    end_year: int = 2019,
    db: str = "",
    table_name: str = "bls_oes",
    soc_table_name: str = "soc_list",
    transitions_file_path: str = "../occupation_transitions_public_data_set.csv",
):
    """
    Load BLS OES data from 2019 to the specified table_name. If no table_name is specified, return a dict.

    # TODO: Check OES data from prior years for formatting
    # TODO: Clean/combine SOC codes from datasets to include latest data on SOC codes from transitions data
    :param start_year: Start year for downloading BLS data
    :param end_year: End year for downloading BLS data
    :param db: Database, passed to sqlalchemyengine
    :param table_name: BLS OES table for wages/employment
    :param soc_table_name: Table for unique SOC codes/descriptions that are in transitions data
    :param transitions_file_path: Used to load transitions data to only include BLS SOC codes that are in the transitions
        dataset
    """
    log.info("Loading BLS wage and employment data to Postgres if a table_name is specified")
    engine = create_sqlalchemyengine(db=db)

    bls_oes_data = download_multi_year_oes(start_year=start_year,
                                           end_year=end_year)

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
                "file_year": Integer()
            }
        )
        log.info("Successfully loaded BLS data to Postgres!")

    # Unique SOC-codes --> occupation descriptions
    if soc_table_name:
        log.info("Saving unique SOC codes/descriptions to {}".format(soc_table_name))
        socs_in_transitions = pd.read_csv(transitions_file_path)
        valid_source_socs = set(socs_in_transitions["soc1"])

        unique_soc_codes = (
            bls_oes_data[["soc_code", "soc_title"]]
            .drop_duplicates(subset=["soc_code"]))

        log.info("Filtering SOC codes to only include those in the source SOC for transitions data")
        unique_soc_codes = unique_soc_codes[unique_soc_codes["soc_code"].apply(
            lambda soc: soc in valid_source_socs)]
        unique_soc_codes = unique_soc_codes.reset_index(drop = True)

        unique_soc_codes.to_sql(
            soc_table_name,
            engine,
            if_exists="replace",
            index=True,
            index_label="id",
            dtype={
                "soc_code": String(),
                "soc_title": String()
            }
        )
        log.info("Unique SOC codes/descriptions saved!")

    engine.dispose()
    return bls_oes_data


def load_occupation_transitions_to_sql(
    file_path: str = "../occupation_transitions_public_data_set.csv",
    db: str = "",
    table_name: str = "occupation_transition"
):
    """
    Load the occupation transitions data to SQL from the CSV file in jobhopper.data
    """
    log.info("Loading occupation transitions (Burning Glass) data to Postgres")
    engine = create_sqlalchemyengine(db=db)
    # total_obs is weighted by age, so is a float instead of int
    occupation_transitions = pd.read_csv(
        file_path,
        na_values=["NA"],
        usecols=["soc1", "soc2", "total_obs", "transition_share", "soc1_name", "soc2_name"],
        dtype={
            "soc1": str,
            "soc2": str,
            "total_obs": float,
            "transition_share": float,
            "soc1_name": str,
            "soc2_name": str
        },
    )

    if table_name:
        occupation_transitions.to_sql(
            table_name,
            engine,
            if_exists="replace",
            index=True,
            dtype={
                "soc1": String(),
                "soc2": String(),
                "total_obs": Numeric(),
                "transition_share": Numeric(),
                "soc1_name": String(),
                "soc2_name": String()
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
      soc1   |  soc2   | total_obs |   transition_share   |        soc1_name         |                  soc2_name                   
    ---------+---------+-----------+----------------------+--------------------------+----------------------------------------------
     13-2011 | 11-3031 |  390865.6 |            0.1782961 | Accountants and auditors | Financial managers
     13-2011 | 43-3031 |  390865.6 |            0.0638686 | Accountants and auditors | Bookkeeping, accounting, and auditing clerks
     13-2011 | 11-9199 |  390865.6 |  0.05619880000000001 | Accountants and auditors | Managers, all other
     13-2011 | 13-1111 |  390865.6 | 0.052902599999999994 | Accountants and auditors | Management analysts
     13-2011 | 13-2051 |  390865.6 |            0.0489697 | Accountants and auditors | Financial analysts
    """

    load_bls_oes_to_sql(table_name="bls_oes", soc_table_name="soc_list")
    load_occupation_transitions_to_sql(table_name="occupation_transition")
