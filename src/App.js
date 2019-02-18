import React, { Component } from 'react';
import GeneIdInput from './components/GeneIdInput';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.getIds = this.getIds.bind(this);
    this.state = {}
  }

  getIds = () = {
  }


  render() {
    return (
      <div className="container">
        <h1>Glioblastoma Multiforme Amplifications</h1>
        <GeneIdInput 
          geneIds={ this.getIds }
        />
      </div>
    );
  }
}

export default App;
