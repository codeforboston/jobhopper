import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import App from './ui/App';
import { createStore } from './ducks';
import './index.css';
import { base as theme } from './ui/theme';
import { BrowserRouter } from 'react-router-dom';

const Main = () => (
  <React.StrictMode>
    <Provider store={createStore()}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>
);

export default Main;
