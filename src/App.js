/**
 * Main App component that processes user input from GeneIdInput component,
 * queries json api, processes json output, passes values to BarChart to 
 * generate simple bar graphs illustrating patient of patients with
 * amplifications of specified gene ids
 */
import React, { Component } from 'react';
import GeneIdInput from './components/GeneIdInput';
import BarChart from './components/BarChart';
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
    this.isNotStored = this.isNotStored.bind(this);
    this.state = {
      amplifications: []
    };
  }

// Capture ids from GeneIdInput component, check if any exist in state, send to
// api querying function
  translateIds = (ids) => {
    ids.map( (id) => {
      if( this.isNotStored(id)) {
        this.queryApi(id);
      }
    });
  }

// Check if state array empty and if id already in state
  isNotStored = (id) => {
    let notStored = true;
    const amplifications = this.state.amplifications;
    if( amplifications.length === 0) {
      return notStored;
    }
    else {
      amplifications.map( (amp) => {
        if( amp.id === id) {
          notStored = false;
        }
      });
    }
    return notStored;
  }
    

// User URL constants to query ammplification api
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

// Tally up number of amount of entries with value field equal to 2
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

// Store gene id and amplification percentage in state
  storeResults = (id, percentage) => {
    const updated = this.state.amplifications;
    updated.push({ id: id, percentage: percentage });
    this.setState({ amplifications: updated });
  }
    

// Quick utility to calculate non-decimal percentage, rounded down
  calculatePercentage = (num) => {
    return Math.floor(num / NUM_PATIENTS * 100);
  }

  render() {
    return (
      <div className="container">
        <h1>Glioblastoma Multiforme Amplifications</h1>
        <div className="row">
          <div className="col-5">
            <h2>ID entry</h2>
            <GeneIdInput 
              storeIds={ this.translateIds }
            />
          </div>
        </div>
        <h2>Bar graphs</h2>
        <div className="row">
          <div className="col-8">
          { this.state.amplifications.length > 0 ? 
            this.state.amplifications.map( (amp, idx) => {
              return (
                <BarChart
                  id={ amp.id }
                  width={ amp.percentage }
                  key={ idx }
                />
              );
            }) : <p>No input yet</p>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
