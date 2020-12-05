import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { shallowEqual, useSelector } from 'react-redux';
import { Transition } from '../domain/transition';
import api from '../services/api';
import { GetTransitionRequest } from '../services/api/Api';

export const fetchTransitions = createAsyncThunk(
  'transitions/fetchTransitions',
  (payload: GetTransitionRequest) => api.getTransitions(payload)
);

type SliceState = {
  transitions: Transition[];
  error?: string;
  loading: boolean;
};

const slice = createSlice({
  name: 'transitions',
  initialState: { transitions: [], error: '', loading: false } as SliceState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchTransitions.fulfilled,
      (state, { payload: transitions }) => {
        state.transitions = transitions;
        state.loading = false;
        state.error = undefined;
      }
    );
    builder.addCase(fetchTransitions.pending, state => {
      state.loading = true;
      state.transitions = [];
      state.error = undefined;
    });
    builder.addCase(
      fetchTransitions.rejected,
      (state, { error: { message = 'Error fetching transitions' } }) => {
        state.error = message;
        state.loading = false;
        state.transitions = [];
      }
    );
  },
});

export const useTransitionsState = () =>
  useSelector(
    ({ transitions }: { transitions: SliceState }) => transitions,
    shallowEqual
  );

export default slice.reducer;
