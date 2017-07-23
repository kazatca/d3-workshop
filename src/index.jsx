import React, {Component} from 'react';
import {render} from 'react-dom';
import * as d3 from 'd3';

import PriceChart from './PriceChart.jsx';

import {fictionalData, smallData} from './investChartMockData.js';

window.d3 = d3;

const timeParse = d3.timeParse('%Y-%m-%d');

const data = fictionalData.map( ({date, open}) => ({
  date: timeParse(date), 
  price: open
}) );

class App extends Component{
  constructor(props){
    super(props);
    this.state = {dataLength: 100}
  }

  getDataSlice(){
    return data.slice(Math.floor(-data.length * this.state.dataLength / 100))
  }

  render(){
    return (
      <div>
        <PriceChart 
          width={900} 
          height={190} 
          data={this.getDataSlice()}
        />
        <div>
          <label htmlFor="data-length">Data length</label>
          <input 
            type="range" 
            id="data-length"
            onChange={ ({target}) => this.setState({dataLength: target.value}) }
            value={ this.state.dataLength }
          />
        </div>
      </div>);
  }
}

render(
  <App />,
  document.getElementById('app'));