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
  transitions?: Transition[];
  error?: string;
  loading: boolean;
};

const slice = createSlice({
  name: 'transitions',
  initialState: {
    transitions: undefined,
    error: '',
    loading: false,
  } as SliceState,
  reducers: {
    clearTransitions: state => {
      state.transitions = [];
    },
  },
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
      state.transitions = undefined;
      state.error = undefined;
    });
    builder.addCase(
      fetchTransitions.rejected,
      (state, { error: { name, message = 'Error fetching transitions' } }) => {
        state.error = name === 'AbortError' ? undefined : message;
        state.loading = false;
        state.transitions = undefined;
      }
    );
  },
});

export const { clearTransitions } = slice.actions;

export const useTransitionsState = () =>
  useSelector(
    ({ transitions }: { transitions: SliceState }) => transitions,
    shallowEqual
  );

export default slice.reducer;
