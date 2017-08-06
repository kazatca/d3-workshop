import React, {Component} from 'react';
import * as d3 from 'd3';

import Bars from './Bars';
import Axis from './Axis.jsx';
import Tooltip from './Tooltip.js';
import Plot from './Plot';

const StopLoss = ({scales, visible, level}) => {
  const y = level*(visible? 1: 10);
  const line = d3.area()
    .x((d) => scales.x.range()[d])
    .y(scales.y(y) + 0.5)

  return (
    <g>
      <path
        d={line([0, 1])}
        stroke='red'
        style={{transitionDuration: '1s'}}
      />
    </g>);
};

class BarsChart extends Component{
  render(){
    const {data, values, width, height, stopLoss} = this.props;

    const plotGeo = {
      left: 50,
      top: 10,
      width: width - 60,
      height: height - 40
    };

    const xScale = d3.scaleLinear()
      .rangeRound([0, plotGeo.width])
      .domain([-0.5, data.length-1 +0.5]);
    
    const max = d3.max(data, d => Math.abs(values.y(d)));

    const yScale = d3.scaleLinear()
      .rangeRound([plotGeo.height, 0])
      .domain([-max*1.2, max*1.2]);  //axis on center

    return (
      <svg width={width} height={height} >
        <Plot
          geo={plotGeo}
          data={data}
          scales={{x: xScale, y: yScale}}
          values={values}
        >
          <Bars />
          <StopLoss visible={stopLoss} level={-max}/>
        </Plot>
      </svg>
    );
  }
}

export default BarsChart;