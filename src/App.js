import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import {Users} from './containers/Users';

class App extends Component {

  render() {
    return (
      <div>
        <AppHeader />
        <Users />
      </div>
    );
  }
}

export default App;
