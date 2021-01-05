import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { shallowEqual, useSelector } from 'react-redux';
import { State } from '../domain/state';
import api from '../services/api';
import { sortBy } from 'lodash';

export const fetchStates = createAsyncThunk('states/fetchStates', () =>
  api.getStates()
);

type SliceState = {
  states: State[];
  error?: string;
  loading: boolean;
  selectedState?: State;
};

const slice = createSlice({
  name: 'states',
  initialState: {
    states: [],
    error: undefined,
    loading: false,
    selectedState: undefined,
  } as SliceState,
  reducers: {
    selectState: (state, { payload: selectedState }) => {
      state.selectedState = selectedState;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchStates.fulfilled, (state, { payload: apiStates }) => {
      state.states = sortBy(apiStates, state => state.name);
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchStates.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.states = [];
    });
    builder.addCase(
      fetchStates.rejected,
      (state, { error: { message = 'Error fetching states' } }) => {
        state.error = message;
        state.loading = false;
        state.states = [];
      }
    );
  },
});

export const { selectState } = slice.actions;

export const useStateState = () =>
  useSelector(({ states }: { states: SliceState }) => states, shallowEqual);

export default slice.reducer;
