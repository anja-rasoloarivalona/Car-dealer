import React, { Component } from 'react';
import './App.css';
import Navtop from './components/navigation/navtop/Navtop';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navtop />
      </div>
    );
  }
}

export default App;
