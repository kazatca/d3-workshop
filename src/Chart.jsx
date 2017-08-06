import React from 'react';
import {PlotComponent} from './Plot.js';
import * as d3 from 'd3';



class Chart extends PlotComponent{
  render(){
    const {data, scales, values} = this.props;

    const area = d3.area()
      .x(d => scales.x(values.x(d)))
      .y0(scales.y(0))
      .y1(d => scales.y(values.y(d)))
    
    return (
      <g>
        <path d={area(data)} fill='gray' />
      </g>);
  }
}

export default Chart;