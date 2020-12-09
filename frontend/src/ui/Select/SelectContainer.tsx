import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchOccupations,
  useOccupationsState,
  selectOccupation,
} from '../../ducks/occupations';
import { fetchStates, useStateState, selectState } from '../../ducks/states';
import { OccupationSelect, StateSelect } from './Select';

export const OccupationSelectContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { occupations, loading, error } = useOccupationsState();

  useEffect(() => {
    dispatch(fetchOccupations());
  }, [dispatch]);

  return (
    <OccupationSelect
      onSelectOccupation={code => dispatch(selectOccupation(code))}
      loading={loading}
      error={error}
      occupations={occupations}
    />
  );
};

export const StateSelectContainer: React.FC = () => {
  const dispatch = useDispatch();

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
    />
  );
};
