import { configureStore } from '@reduxjs/toolkit';
import states from './states';
import occupations from './occupations';
import transitions from './transitions';

export const createStore = () =>
  configureStore({
    reducer: {
      states,
      occupations,
      transitions,
    },
  });
