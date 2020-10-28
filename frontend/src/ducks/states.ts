import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { State } from '../domain/state';
import api from '../services/api';

export const fetchStates = createAsyncThunk('states/fetchStates', () =>
  api.getStates()
);

type SliceState = { states: State[]; error: string | null };

const slice = createSlice({
  name: 'states',
  initialState: { states: [], error: null } as SliceState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStates.fulfilled, (state, { payload: apiStates }) => {
      state.states = apiStates;
    });
    builder.addCase(
      fetchStates.rejected,
      (state, { error: { message = 'Error fetching states' } }) => {
        state.error = message;
      }
    );
  },
});

export default slice.reducer;
