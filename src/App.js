import React, { Component } from 'react';
// import './App.css';
import UserContainer from './components/UserContainer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
      <p> Markus Gleichner DVM </p>
        <UserContainer />
      </div>
    );
  }
}

export default App;
