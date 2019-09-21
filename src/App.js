import React from 'react';
import { StateProvider } from './state';
import logo from './logo.svg';
import './App.css'; 
import ScenariosList from './ScenariosList';


function App() {
  return (
    <StateProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <ul>
            
          </ul>
          <ScenariosList />
        </header>
      </div>
    </StateProvider>
  );
}

export default App;
