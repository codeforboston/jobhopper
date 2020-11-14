import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Occupation } from '../domain/occupation';
import api from '../services/api';

export const fetchOccupations = createAsyncThunk(
  'occupations/fetchOccupations',
  () => api.getOccupations()
);

type SliceState = { occupations: Occupation[]; error: string | null };

const slice = createSlice({
  name: 'occupations',
  initialState: { occupations: [], error: null } as SliceState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchOccupations.fulfilled,
      (state, { payload: occupations }) => {
        state.occupations = occupations;
      }
    );
    builder.addCase(
      fetchOccupations.rejected,
      (state, { error: { message = 'Error fetching occupations' } }) => {
        state.error = message;
      }
    );
  },
});

export default slice.reducer;
