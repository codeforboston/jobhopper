# Work in progress
# TODO: Consolidate with O*Net and other data sources
# TODO: SQLite + Postgres support (Cloud?)
# TODO: Better organization + classes

# Requires jobhopper to be added to PATH in venv/bin/activate
from data.bls.oes_data_downloader import OESDataDownloader
import sqlite3
import logging

log = logging.getLogger()
log.setLevel(logging.INFO)


# Change to local path
DB_FILE = '/home/lilian/Documents/jobhopper/data/jobhopper.sqlite'


def create_connection(db_file = DB_FILE):
    """ 
    Create a database connection to a SQLite database based on the specified db_file
    """
    conn = None
    try:
        log.info('Connecting to SQLite DB')
        conn = sqlite3.connect(db_file)
        return conn
    except Exception as e:
        log.error(e)


def load_bls_oes_to_sql():
    """
    Currently a stub
    """
    conn = create_connection(DB_FILE)
    bls_oes_data = (OESDataDownloader()
                    .download_oes_data('2019'))
    bls_oes_data.to_sql('bls_oes', 
                        con = conn)


if __name__ == '__main__':
    load_bls_oes_to_sql()