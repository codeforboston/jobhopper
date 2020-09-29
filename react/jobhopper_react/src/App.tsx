import React from "react";
import logo from "./logo.svg";
import Placeholder from "./components/shared/Placeholder";
import "./App.css";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        What occupation do <Placeholder innerText="Select Job Dropdown" /> move
        to?
      </p>
      <p>
        <b>Option: </b>Select State for to display wage data:{" "}
        <Placeholder innerText="Select State Dropdown" />
      </p>

      <p>
        <Placeholder innerText="Show Table of data here" />
      </p>
      <p>
        <b>Jobhopper Vocabulary</b>
        <br />
        The acronyms are from the&nbsp;
        <a
          className="App-link"
          href="https://bls.gov"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bureau of Labor Statistics
        </a>
        <br />
        <b>SOC</b>&nbsp;Standard Occupational Classification
      </p>
    </div>
  );
}

export default App;
