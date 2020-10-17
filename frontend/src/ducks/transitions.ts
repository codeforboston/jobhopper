import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Transition } from '../domain/transition';
import api from '../services/api';
import { GetTransitionRequest } from '../services/api/Api';

export const fetchTransitions = createAsyncThunk(
  'transitions/fetchTransitions',
  (payload: GetTransitionRequest) => api.getTransitions(payload)
);

type SliceState = { transitions: Transition[]; error: string | null };

const slice = createSlice({
  name: 'transitions',
  initialState: { transitions: [], error: null } as SliceState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchTransitions.fulfilled,
      (state, { payload: transitions }) => {
        state.transitions = transitions;
      }
    );
    builder.addCase(
      fetchTransitions.rejected,
      (state, { error: { message = 'Error fetching transitions' } }) => {
        state.error = message;
      }
    );
  },
});

export default slice.reducer;
