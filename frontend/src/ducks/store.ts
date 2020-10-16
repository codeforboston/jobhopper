import { configureStore } from '@reduxjs/toolkit';
import states from './states';
import occupations from './occupations';

export const createStore = () =>
  configureStore({
    reducer: {
      states,
      occupations,
    },
  });
