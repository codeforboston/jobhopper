import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { base as theme } from './ui/theme';
import { Provider } from 'react-redux';
import { createStore } from './ducks';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore()}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
