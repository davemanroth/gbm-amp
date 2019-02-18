import React, { Component } from 'react';

class GeneIdInput extends Component {
  constructor(props) {
    super(props);
    this.processIds = this.processIds.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { 
      input: "",
      ids: [] 
    }
  }

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
    this.setState({ ids: idsToStore });
    this.props.storeIds(idsToStore);
  }

  isNum = (num) => {
    return !Number.isNaN(num);
  }

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
