import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Airport from './Airports.js';
import './Airport.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React, Cowboy!</h2>
        </div>
          <Airport />
      </div>
    );
  }
}

export default App;
