import requests
import json
from typing import List, Dict, Any

import pandas as pd


def bls_api_query_v1(url = 'https://api.bls.gov/publicAPI/v1/timeseries/data/',
                     start = '2011',
                     end = '2020',
                     series_id = ['CUUR0000SA0','SUUR0000SA0']):
    """
    Query V1 of the BLS API for timeseries data
    """
    headers = {'Content-type': 'application/json'}
    data = json.dumps({'seriesid': series_id,
                       'startyear': start, 
                       'endyear': end})
    
    response = requests.post('https://api.bls.gov/publicAPI/v1/timeseries/data/', 
                             data=data, 
                             headers=headers)
    json_response = json.loads(response.text)
    return json_response


def parse_bls_api_query(json_response: Dict, 
                        return_dataframe = True):
    """
    Parse API response
    """
    series: List[str, Any] = json_response.get('Results').get('series')
    for series_id in series:
        series_name = series_id.get('seriesID')
        data = [record for record in series_id.get('data')]
        for record in data:
            record.update({'series_name': series_name})
    
    if return_dataframe:
        data = pd.DataFrame(data)
    return data


if __name__ == '__main__':
    resp = bls_api_query_v1()
    df = parse_bls_api_query(resp)
    df.to_csv('~/Downloads/demo.csv', index = False)