import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useOccupationsState } from 'src/ducks/occupations';
import { useStateState } from 'src/ducks/states';
import { fetchTransitions, useTransitionsState } from 'src/ducks/transitions';
import Results from './Results';

export const ResultsContainer = () => {
  const {
    loading,
    loadTransitions,
    transitions,
    error,
    selectedOccupation,
    selectedState,
  } = useResultLoader();

  return (
    <Results
      loading={loading}
      transitions={transitions}
      loadTransitions={loadTransitions}
      socCode={selectedOccupation}
      state={selectedState}
      error={error}
    />
  );
};

function useResultLoader() {
  const dispatch = useDispatch();
  const { error, loading, transitions } = useTransitionsState(),
    { selectedState } = useStateState(),
    { selectedOccupation } = useOccupationsState();

  const loadTransitions = useMemo(
    () => (socCode: string, state?: string) => {
      dispatch(
        fetchTransitions({
          socCode,
          state,
        })
      );
    },
    [dispatch]
  );

  return {
    transitions,
    loading,
    loadTransitions,
    error,
    selectedState,
    selectedOccupation,
  };
}
