import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { shallowEqual, useSelector } from 'react-redux';
import { Occupation } from '../domain/occupation';
import api from '../services/api';

export const fetchOccupations = createAsyncThunk(
  'occupations/fetchOccupations',
  (searchKeyword: string) => api.getOccupations(searchKeyword)
);

type SliceState = {
  occupations: Occupation[];
  error?: string;
  loading: boolean;
  selectedOccupation?: Occupation;
};

const slice = createSlice({
  name: 'occupations',
  initialState: {
    occupations: [],
    loading: false,
    error: undefined,
    selectedOccupation: undefined,
  } as SliceState,
  reducers: {
    selectOccupation: (state, { payload: selectedOccupation }) => {
      state.selectedOccupation = selectedOccupation;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchOccupations.fulfilled,
      (state, { payload: occupations }) => {
        state.occupations = occupations;
        state.loading = false;
        state.error = undefined;
      }
    );
    builder.addCase(fetchOccupations.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.occupations = [];
    });
    builder.addCase(
      fetchOccupations.rejected,
      (state, { error: { message = 'Error fetching occupations' } }) => {
        state.error = message;
        state.loading = false;
        state.occupations = [];
      }
    );
  },
});

export const { selectOccupation } = slice.actions;

export const useOccupationsState = () =>
  useSelector(
    ({ occupations }: { occupations: SliceState }) => occupations,
    shallowEqual
  );

export default slice.reducer;
