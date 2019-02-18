import React, { Component } from 'react';
import GeneIdInput from './components/GeneIdInput';
import axios from 'axios';
import './App.css';

const NUM_PATIENTS = 577;
const URL_START = 'http://www.cbioportal.org/api/molecular-profiles/gbm_tcga_gistic/molecular-data?sampleListId=gbm_tcga_cna&entrezGeneId=';
const URL_END = '&projection=SUMMARY';

class App extends Component {
  constructor(props) {
    super(props);
    this.translateIds = this.translateIds.bind(this);
    this.queryApi = this.queryApi.bind(this);
    this.processResults = this.processResults.bind(this);
    this.storeResults = this.storeResults.bind(this);
    this.calculatePercentage = this.calculatePercentage.bind(this);
    this.state = {
      amplifications: []
    };
  }

  translateIds = (ids) => {
    ids.map( (id) => {
      this.queryApi(id);
    });
    //this.processResults(results);
  }

  queryApi = (id) => {
    const url = URL_START + id + URL_END;
    axios({
      method: 'get',
      url: url,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then( (resp) => {
      this.processResults(id, resp.data);
    })
    .catch( (error) => {
      console.log("ERROR: " + error);
    });
  }

  processResults = (id, results) => {
    let valuesTally = 0;
    results.map( (result) => {
      if( result.value === 2 ) {
        valuesTally++;
      }
    });
    const percentage = this.calculatePercentage(valuesTally);
    this.storeResults(id, percentage);
  }

  storeResults = (id, percentage) => {
    const updated = this.state.amplifications;
    updated.push({ id: id, percentage: percentage });
    this.setState({ amplifications: updated });
  }
    

  calculatePercentage = (num) => {
    return Math.floor(num / NUM_PATIENTS * 100);
  }

  render() {
    return (
      <div className="container">
        <h1>Glioblastoma Multiforme Amplifications</h1>
        <div className="row">
          <div className="col-5">
            <GeneIdInput 
              storeIds={ this.translateIds }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
