import React, { Component } from 'react';

class GeneIdInput extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render = () => {
    return (
      <div className="form-group">
        <label htmlFor="gene-input">Please input gene ID(s), separated by spaces or commas</label>
        <textarea className="form-control" rows="3"></textarea>
      </div>
    );
  }
}

export default GeneIdInput;
