import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Select } from './ui/Select';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Select
          options={[{ label: 'option1', value: 'value1' }]}
          getOptionLabel={({ label }) => label}
          getOptionValue={({ value }) => value}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
