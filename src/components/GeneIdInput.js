/**
 * Component that creates UI and accepts user input for gene ids, does
 * basic processing, passes ids to parent App component for output
 */
import React, { Component } from 'react';

class GeneIdInput extends Component {
  constructor(props) {
    super(props);
    this.processIds = this.processIds.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isNum = this.isNum.bind(this);
    this.state = { 
      input: "",
    }
  }

// Collect input from textarea element, make sure numbers entered, push to
// array and store in prop method storeIds
  processIds = () => {
    const idsToStore = [];
    let ids = this.state.input;
    ids = ids.split(" ");
    ids.map( (id) => {
      const num = Number.parseInt(id);
      if( this.isNum(num)) {
        idsToStore.push(num);
      }
    });
    this.props.storeIds(idsToStore);
  }

// Simple utility function to check if user input is a number
  isNum = (num) => {
    return !Number.isNaN(num);
  }

// Save raw user input from textarea in state
  handleChange = (e) => {
    this.setState({ input: e.target.value });
  }

  render = () => {
    return (
      <div className="form-group">
        <label htmlFor="gene-input">Please input gene ID(s), separated by spaces</label>
        <textarea 
          onChange={ this.handleChange }
          className="form-control" 
          rows="3">
        </textarea>
        <button 
          role="button" 
          className="btn btn-primary btn-lg"
          onClick={ this.processIds }
        >Graph gene IDs</button>
      </div>
    );
  }
}

export default GeneIdInput;
