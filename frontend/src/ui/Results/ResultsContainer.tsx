import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Occupation } from 'src/domain/occupation';
import { State } from 'src/domain/state';
import { selectOccupation, useOccupationsState } from 'src/ducks/occupations';
import { selectState, useStateState } from 'src/ducks/states';
import {
  clearTransitions,
  fetchTransitions,
  useTransitionsState,
} from 'src/ducks/transitions';
import Results from './Results';

export const ResultsContainer = () => {
  const {
    selectedState,
    selectedOccupation,
    loading,
    transitions,
    error,
  } = useResultLoader();

  return (
    <Results
      selectedState={selectedState}
      selectedOccupation={selectedOccupation}
      loading={loading}
      transitions={transitions}
      error={error}
    />
  );
};

function useResultLoader() {
  const dispatch = useDispatch();
  const { error, loading, transitions } = useTransitionsState(),
    { selectedState } = useStateState(),
    { selectedOccupation } = useOccupationsState();

  const loadTransitions = useCallback(
    (sourceOccupation: Occupation, state?: State) =>
      dispatch(
        fetchTransitions({
          sourceOccupation,
          state,
        })
      ),
    [dispatch]
  );

  const clearResults = useCallback(() => {
    dispatch(clearTransitions());
    dispatch(selectState(undefined));
    dispatch(selectOccupation(undefined));
  }, [dispatch]);

  useEffect(() => {
    if (canLoadTransitions(selectedOccupation)) {
      const promise = loadTransitions(selectedOccupation, selectedState);
      return () => {
        (promise as any).abort();
      };
    }
  }, [loadTransitions, selectedOccupation, selectedState]);

  useEffect(() => clearResults, [clearResults]);

  return {
    selectedState,
    selectedOccupation,
    transitions,
    loading,
    error,
  };
}

function canLoadTransitions(occupation?: Occupation): occupation is Occupation {
  return occupation !== undefined;
}
