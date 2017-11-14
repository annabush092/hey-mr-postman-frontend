import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import UserContainer from './components/users/UserContainer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path={"/"} component={UserContainer}/>
      </div>
    );
  }
}

export default App;
