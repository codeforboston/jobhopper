import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchOccupations,
  useOccupationsState,
  selectOccupation,
} from '../../ducks/occupations';
import { fetchStates, useStateState, selectState } from '../../ducks/states';
import { OccupationSelect, StateSelect } from './Select';
import DjangoApiClient from '../../services/api/DjangoApiClient';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const fetchMatchOccupations = async (input: string) => {
  /*
   * Fetch occupations matching the given input string via the soc-smart-list endpoint in the DjangoApiClient
   */
  //console.log('Fetching occupations matching the input ' + input);
  const client = new DjangoApiClient();
  const occupations = await client.getOccupations(input);

  // Sort by occupation SOC code if there is not input yet
  if (input === '') {
    //console.log('Sorting by job SOC code for default input')
    occupations.sort((job1, job2) => job1.code.localeCompare(job2.code));
  }

  // Each occupation has the name and code attributes. These attributes are handled by OccupationSelect
  return occupations.map(function (occupation) {
    return occupation;
  });
};

// AwesomeDebouncePromise avoids an issue with lodash debounce where debounce returns the result of the previous query
const debounceMatchOccupations = AwesomeDebouncePromise(
  fetchMatchOccupations,
  500
);

export const OccupationSelectContainer: React.FC = () => {
  /*
   * Construct select container to render OccupationSelect, which displays available transition source occupations
   */
  const dispatch = useDispatch();

  const { occupations, error } = useOccupationsState();

  return (
    <OccupationSelect
      fetchOptions={debounceMatchOccupations}
      onSelectOccupation={occupation => dispatch(selectOccupation(occupation))}
      error={error}
      occupations={occupations}
    />
  );
};

export const StateSelectContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedOccupation } = useOccupationsState();
  const { states, loading, error } = useStateState();

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  return (
    <StateSelect
      onSelectState={state => dispatch(selectState(state))}
      loading={loading}
      error={error}
      states={states}
      disabled={!selectedOccupation}
    />
  );
};
