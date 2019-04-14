import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import Sender from "./Sender"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Sender />
          <img src={"TempLogo.png"} className="App-logo" alt="logo" />
          <p>Gun Flow</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy. Sell. Authenticate.
          </a>
          
        </header>
      </div>
    );
  }
}

export default App;
