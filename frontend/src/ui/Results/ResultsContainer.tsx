import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectOccupation, useOccupationsState } from 'src/ducks/occupations';
import { selectState, useStateState } from 'src/ducks/states';
import {
  clearTransitions,
  fetchTransitions,
  useTransitionsState,
} from 'src/ducks/transitions';
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

  const loadTransitions = useCallback(
    (socCode: string, state?: string) =>
      dispatch(
        fetchTransitions({
          socCode,
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
    transitions,
    loading,
    error,
  };
}

function canLoadTransitions(code?: string): code is string {
  return code !== undefined;
}
