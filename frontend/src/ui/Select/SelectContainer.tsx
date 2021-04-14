import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchOccupations,
  selectOccupation,
  useOccupationsState,
} from '../../ducks/occupations';
import { fetchStates, selectState, useStateState } from '../../ducks/states';
import { OccupationSelect, StateSelect } from './Select';

export const OccupationSelectContainer: React.FC = () => {
  /*
   * Construct select container to render OccupationSelect, which displays available transition source occupations
   */
  const dispatch = useDispatch();

  const fetchOptions = useCallback(
    async (keyword: string) => {
      const action: any = await dispatch(fetchOccupations(keyword));
      return action.payload || [];
    },
    [dispatch]
  );

  const { error } = useOccupationsState();

  return (
    <OccupationSelect
      fetchOptions={fetchOptions}
      onSelectOccupation={occupation => dispatch(selectOccupation(occupation))}
      error={error}
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
