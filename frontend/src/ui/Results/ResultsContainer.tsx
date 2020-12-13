import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useOccupationsState } from 'src/ducks/occupations';
import { useStateState } from 'src/ducks/states';
import { fetchTransitions, useTransitionsState } from 'src/ducks/transitions';
import Results from './Results';

export const ResultsContainer = () => {
  const { loading, transitions, error } = useResultLoader();

  return <Results loading={loading} transitions={transitions} error={error} />;
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

  useEffect(() => {
    if (canLoadTransitions(selectedOccupation)) {
      loadTransitions(selectedOccupation, selectedState);
    }
  }, [loadTransitions, selectedOccupation, selectedState]);

  return {
    transitions,
    loading,
    error,
  };
}

function canLoadTransitions(code?: string): code is string {
  return code !== undefined;
}
