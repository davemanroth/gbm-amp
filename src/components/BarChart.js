import React, { Component } from 'react';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render = () => {
    return (
      <div>
        <p><strong>{ this.props.id }</strong></p>
        <div className="progress">
          <div 
            className="progress-bar" 
            role="progress-bar"
            style={{ width: this.props.width + '%'}}
            aria-valuemin="0"
            aria-valuemax="100"
          >{ this.props.width + '%' }</div>
        </div>
      </div>
    );
  }
}

export default BarChart;
