import { configureStore } from '@reduxjs/toolkit';
import states from './states';

export const createStore = () =>
  configureStore({
    reducer: {
      states,
    },
  });
