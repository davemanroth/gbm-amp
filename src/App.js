import React, { Component } from 'react';
import GeneIdInput from './components/GeneIdInput';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1>Glioblastoma Multiforme Amplifications</h1>
        <GeneIdInput 
        />
      </div>
    );
  }
}

export default App;
