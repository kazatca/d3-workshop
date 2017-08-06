import React, {Component} from 'react';
import {render} from 'react-dom';
import * as d3 from 'd3';

import PriceChart from './PriceChart.jsx';
import BarChart from './BarChart.js';

import {fictionalData, smallData} from './investChartMockData.js';

window.d3 = d3;

const timeParse = d3.timeParse('%Y-%m-%d');

const data = fictionalData.map( ({date, open}) => ({
  date: timeParse(date), 
  price: open
}) );

const getRandomArray = count => 
  Array.from(Array(count)).map(() => Math.floor(Math.random()*20)-10);

class App extends Component{
  constructor(props){
    super(props);
    this.state = {dataLength: 100, bars: getRandomArray(20), stopLoss: true}
  }

  getDataSlice(){
    return data.slice(Math.floor(-data.length * this.state.dataLength / 100))
  }

  render(){
    return (
      <div>
        <PriceChart 
          width={700} 
          height={190} 
          values={{x: d => d.date, y: d => d.price}}
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
        <div>
          <BarChart 
            width={700} 
            height={190} 
            values={{x: (d, i) => i, y: d => d}}
            data={this.state.bars}
            stopLoss={this.state.stopLoss}
          />
          
        </div>
        <div>
          <button onClick={() => {
            this.setState({bars: getRandomArray(20), stopLoss: !this.state.stopLoss}) 
          }}>Update</button>
        </div>
      </div>);
  }
}

render(
  <App />,
  document.getElementById('app'));