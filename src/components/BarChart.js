/**
 * Stateless component that accepts id and width as props
 * and generates a horizontal bar graph
 */
import React from 'react';

const BarChart = (props) => {
  return (
    <div className="row">
      <div className="col-1">
        <p><strong>{ props.id }</strong></p>
      </div>
      <div className="col-11">
      { 
        props.width > 0 ?
          <div className="progress">
            <div 
              className="progress-bar" 
              role="progress-bar"
              style={{ width: props.width + '%'}}
              aria-valuemin="0"
              aria-valuemax="100"
            >{ props.width + '%' }</div>
          </div> 
        : <div className="alert alert-warning">
            ID either does not exist or there is insufficient data
          </div>
      }
      </div>
    </div>
  );
}

export default BarChart;
