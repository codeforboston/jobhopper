from lxml import html
import requests
import pandas as pd

from pathlib import Path

import os
from io import BytesIO
from zipfile import ZipFile
from urllib.request import urlopen
from data.bls.utils.dtype_conversion import to_float, to_int

from concurrent.futures import ThreadPoolExecutor

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

    def __init__(self, year:str = "2019"):
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

    def _clean_oes_data(self, bls_oes_data: pd.DataFrame) -> pd.DataFrame:
        """
        Clean BLS OES data.

        NAICS codes represent industries. We are only interested in data from all industries, since occ_code and location
        are the only selection options in the final product.
            * naics = 0 represents all industries

        We also only want data from areas corresponding to the US, and states in the US. Note that MSAs have changed
        classification since the earliest available dataset.
            * area_type = 1 represents the US
            * area_type = 2 represents US States
        """
        include_columns = ["area_title", "occ_code", "occ_title", "h_mean", "a_mean", "tot_emp"]

        bls_oes_data = bls_oes_data.query("naics == '000000' and (area_type == 1 or area_type == 2)")
        bls_oes_data = (
            bls_oes_data[
                include_columns
            ]
                .assign(
                soc_decimal_code=bls_oes_data["occ_code"].apply(
                    lambda x: "{}.00".format(x)
                ),
                h_mean=bls_oes_data["h_mean"].apply(lambda x: to_float(x)),
                a_mean=bls_oes_data["a_mean"].apply(lambda x: to_float(x)),
                tot_emp=bls_oes_data["tot_emp"].apply(lambda x: to_int(x)),
            )
                .rename(
                {
                    "occ_code": "soc_code",
                    "occ_title": "soc_title",
                    "h_mean": "hourly_mean_wage",
                    "a_mean": "annual_mean_wage",
                    "tot_emp": "total_employment",
                },
                axis=1,
            )
        )

        return bls_oes_data

    def download_oes_data(self, clean_up=False) -> pd.DataFrame:
        """
        Download the zip folder into the tempfile_dir, and load the Excel file
        Estimated number of rows: 350K+
        """
        log.info("Downloading OES data from {} if it has not been downloaded already".format(self.oes_download_path))
        # Download the zip folder and find the file
        response = urlopen(self.oes_download_path)
        dir = Path(__file__).parent / "downloads"

        download_filepath = str(dir) + "/{}/all_data_M_{}.xlsx".format(self.oes_zipname, self.year)
        csv_path = os.path.splitext(download_filepath)[0] + ".csv"

        # For compatibility with older versions that did not include a file_year column
        if os.path.exists(csv_path) and "file_year" in list(pd.read_csv(csv_path).columns):
            log.info("OES data year {} was found in {}. Loading it in.".format(self.year, csv_path))
            df = pd.read_csv(csv_path)
            return df

        else:
            zipfile = ZipFile(BytesIO(response.read()))

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

                    if clean_up:
                        log.info("Cleaning file and saving as a csv for faster loading in future runs.")
                        df = self._clean_oes_data(bls_oes_data=df)
                        df = df.assign(file_year=self.year)

                        # Save as CSV for faster loading in future rounds
                        df.to_csv(csv_path,
                                  index=False)
                    return df


def download_oes_wrapper(year):
    """
    Wrapper for downloading OES data for use in app

    :param year: Download year
    :return: DataFrame of OES data
    """
    downloader = OESDataDownloader(year=year)
    oes_data = downloader.download_oes_data(clean_up=True)

    return oes_data


def download_multi_year_oes(start_year: int = 2017,
                            end_year: int = 2019):
    """
    Download and clean multiple years of OES data

    :param start_year: Integer start year
    :param end_year: Integer end year
    :return: Combined DataFrame of multiple cleaned years
    """
    download_years = list(range(start_year, end_year + 1))
    download_years = [str(year) for year in download_years]

    with ThreadPoolExecutor(max_workers=5) as threadpool:
        oes_dfs = threadpool.map(download_oes_wrapper, download_years)

    all_years = pd.DataFrame()
    for df in oes_dfs:
        all_years = all_years.append(df)

    # Deduplicate soc_code and area_title; grab the latest year's wage and employment data for each of these records
    all_years = (all_years
                 .sort_values('file_year', ascending=False)
                 .drop_duplicates(['soc_code', 'area_title'],
                                  keep='first')
                 .sort_values('area_title')
                 .reset_index(drop=True))

    return all_years


if __name__ == "__main__":
    download_multi_year_oes()
