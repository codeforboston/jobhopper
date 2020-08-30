import requests
import json
from typing import List, Dict, Any

import logging

log = logging.getLogger()


def bls_api_query_v1(start: str = '2011',
                     end: str = '2020',
                     series_id: List[str] = ['CUUR0000SA0','SUUR0000SA0']) -> Dict[str, Any]:
    """
    Read a series from the BLS API, V1. Series IDs are not always readily available. 
    See https://api.bls.gov/publicAPI/v1/timeseries/data/ for some examples. The
    BLS text download pages can sometimes contain information, too.
    
    :param start: Start year, str
    :param end: End year, str
    :param series_id: Series ID
    :return: JSON response
    """
    log.info('Querying BLS API (v1) for data on {}'.format(series_id))
    headers = {'Content-type': 'application/json'}
    data = json.dumps({'seriesid': series_id,
                       'startyear': start, 
                       'endyear': end})
    
    response = requests.post('https://api.bls.gov/publicAPI/v1/timeseries/data/', 
                             data=data, 
                             headers=headers)
    json_response = json.loads(response.text)
    return json_response


def parse_bls_api_query_v1(json_response: Dict[str, Union[str, Any]]) -> List[Dict[str, Any]]:
    """
    Parse the BLS API (V1) response.
    
    :param json_response: JSON response from API query. 
        {'status': 'REQUEST_SUCCEEDED',
         'responseTime': 138,
         'message': [],
         'Results': {'series': [{'seriesID': 'CUUR0000SA0',
            'data': [{'year': '2020',
              'period': 'M07',
              'periodName': 'July',
              'latest': 'true',
              'value': '259.101',
              'footnotes': [{}]}, ...]}
    :return: Parsed response
        [{'year': '2020',
          'period': 'M07',
          'periodName': 'July',
          'latest': 'true',
          'value': '259.101',
          'footnotes': [{}],
          'series_name': 'CUUR0000SA0'}, ...}]
    """
    log.info('Parsing API response')
    series: List[str, Any] = json_response.get('Results').get('series')
    for series_id in series:
        series_name = series_id.get('seriesID')
        data = [record for record in series_id.get('data')]
        for record in data:
            record.update({'series_name': series_name})
        
        return data