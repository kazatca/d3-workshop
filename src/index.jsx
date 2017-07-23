import React from 'react';
import {render} from 'react-dom';
import * as d3 from 'd3';

import App from './App.jsx';

const wiki = require('../mocks/wiki.json');  // eslint-disable-line no-unused-vars
const aapl = require('../mocks/aapl.json');  // eslint-disable-line no-unused-vars

window.d3 = d3;

const timeParse = d3.timeParse('%Y-%m-%d');

const data = wiki
  .map( ({date, price}) => ({
    date: timeParse(date), 
    price: price * 10
  }) );

render(
  <App data={data}/>,
  document.getElementById('app'));