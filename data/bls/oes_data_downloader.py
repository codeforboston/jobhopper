from lxml import html
import requests
import pandas as pd

from pathlib import Path

from io import BytesIO
from zipfile import ZipFile
from urllib.request import urlopen

import logging

logging.basicConfig(format="%(asctime)s %(message)s")
log = logging.getLogger()
log.setLevel(logging.INFO)


# TODO: *, #, and ** are not returned as NA
class OESDataDownloader(object):
    """
    Download BLS data on Occupational Employment Statistics (OES). Data for various years provided
    at https://www.bls.gov/oes/tables.htm

    Data format: Zip folder, with a single Excel file containing OES data, at least for 2018 and 2019
    """

    def __init__(self, year="2019"):
        """
        :param year: String indicating the year for the download. Zip names are in
            oesm<last 2 digits of year>all.zip format.
        :param tempfile_dir: Specify a (temp)file directory
        """
        self.base_url = "https://www.bls.gov/"
        self.oes_data_url = "https://www.bls.gov/oes/tables.htm"
        self.oes_zipname = "oesm{}all".format(year[2:4])
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
        # Download the zip folder and find the file
        response = urlopen(self.oes_download_path)
        zipfile = ZipFile(BytesIO(response.read()))
        dir = Path(__file__).parent / "downloads"
        log.info("Downloading to directory {}".format(dir))
        zipfile.extractall(dir)

        expected_filename = "all_data_M_{}.xlsx".format(self.year)

        zipped_files = zipfile.namelist()
        log.info("Files found: {}".format(zipped_files))
        for filename in zipped_files:
            if expected_filename in filename:
                log.info(
                    "Check the data/bls/downloads directory for the xlsx file downloaded"
                )
                log.info(
                    "Reading Excel file: {} --- This may take a few minutes.".format(
                        filename
                    )
                )
                excelfile = zipfile.open(filename)
                df = pd.read_excel(excelfile)
                return df


if __name__ == "__main__":
    test = OESDataDownloader(year="2019")
    test.download_oes_data()
