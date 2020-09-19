from lxml import html
import requests
import pandas as pd

from urllib.request import urlopen
from tempfile import NamedTemporaryFile
import shutil
from shutil import unpack_archive

import os

import logging

log = logging.getLogger()


# TODO: *, #, and ** are not returned as NA


class OESDataDownloader(object):
    """
    Download BLS data on Occupational Employment Statistics (OES). Data for various years provided
    at https://www.bls.gov/oes/tables.htm

    Data format: Zip folder, with a single Excel file containing OES data, at least for 2018 and 2019
    """

    def __init__(self, year="2019", tempfile_dir="/tmp/bls_oesm"):
        """
        :param year: String indicating the year for the download. Zip names are in
            oesm<last 2 digits of year>all.zip format.
        :param tempfile_dir: Specify a (temp)file directory
        """
        self.base_url = "https://www.bls.gov/"
        self.oes_data_url = "https://www.bls.gov/oes/tables.htm"
        self.oes_zipname = "oesm{}all".format(year[2:4])
        self.tempfile_dir = tempfile_dir
        self.year = year

        self.oes_download_path = self._get_oes_download_path()

    def _get_oes_download_path(self) -> str:
        """
        Parse the OES tables page from the BLS site to find the download link for the specified year
        """
        log.info("Finding OES data download path from {}".format(self.oes_data_url))
        page_data = requests.get(self.oes_data_url)
        tree = html.fromstring(page_data.content)

        oes_file_href = tree.xpath(
            './/a[contains(@href, "{}")]/@href'.format(
                "{}.zip".format(self.oes_zipname)
            )
        )[0]

        oes_download_path = "{}{}".format(self.base_url, oes_file_href)

        log.info("Download path: {}".format(oes_download_path))
        return oes_download_path

    def download_oes_data(self, clean_up=False) -> pd.DataFrame:
        """
        Download the zip folder into the tempfile_dir, and load the Excel file
        Estimated number of rows: 350K+
        """
        log.info("Downloading OES data from {}".format(self.oes_download_path))
        # Download the zip folder
        with urlopen(self.oes_download_path) as response, NamedTemporaryFile() as tfile:
            log.info(f"Files stored temporarily here: {self.tempfile_dir}")
            tfile.write(response.read())
            tfile.seek(0)

            log.info(f"about to unpack file: {tfile.name}")

            # Unzip folder + files
            unpack_archive(tfile.name, self.tempfile_dir, format="zip")

            # BLS OES data filename format
            expected_filename = "all_data_M_{}.xlsx".format(self.year)

            # Download file
            for root, subdirs, files in os.walk(self.tempfile_dir):
                log.info("Files found: {}".format(files))
                for file in files:
                    if expected_filename in file:
                        filepath = "{}/{}".format(root, file)
                        log.info(
                            "Reading Excel file: {} --- This may take a few minutes.".format(
                                filepath
                            )
                        )

                    return pd.read_excel(filepath)

            # Remove directory

            if clean_up:
                shutil.rmtree(self.tempfile_dir)