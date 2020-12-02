import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { createStore } from './ducks';
import './index.css';
import { base as theme } from './ui/theme';

const Main = () => (
  <React.StrictMode>
    <Provider store={createStore()}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>
);

export default Main;
