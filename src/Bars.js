import React, {Component} from 'react';
import {PlotComponent} from './Plot.js';
import * as d3 from 'd3';

const d3Area = d3.area()
const d3Line = d3.area()

const Bar =({scales, x, y}) => {
  d3Area
    .x(d => scales.x(d.x))
    .y0(scales.y(0))
    .y1(d => scales.y(d.y))
  d3Line
    .x(d => scales.x(d.x))
    .y(d => scales.y(d.y)+0.5)

  const gap = 0.05;
  const bar = [
    {x: x - 0.5 + gap, y},
    {x: x + 0.5 - gap, y}
  ];
  return (
    <g>
      <path 
        d={d3Area(bar)}
        fill={y>0? 'rgba(0, 0, 255, 0.5)': 'rgba(255, 0, 0, 0.5)'}
        style={{transitionDuration: '1s'}}
      />
      <path 
        d={d3Line(bar)}
        stroke={y >0? 'blue': y < 0 ?'red' : 'transparent'}
        style={{transitionDuration: '1s'}}
      />
    </g>);
}

class Bars extends PlotComponent{
  render(){
    const {data, scales, values} = this.props;

    return (
      <g>
      {data.map((d, i) => 
        <Bar 
          key={i} 
          scales={scales} 
          x={values.x(d, i)} 
          y={values.y(d, i)} 
        />
      )}
      </g>);
  }
}

export default Bars;