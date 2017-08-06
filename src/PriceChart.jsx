import React, {Component} from 'react';
import * as d3 from 'd3';

import Chart from './Chart.jsx';
import Axis from './Axis.jsx';
import Tooltip from './Tooltip.js';
import Plot from './Plot';
const getTimeTicks = data => {
  const startDate = data[0].date;
  const endDate = data[data.length - 1].date;
  const period = (endDate - startDate) / (1000 * 60 * 60 * 24); //in days
  if(period < 8){
    return d3.timeDays(startDate, endDate);
  }
  if(period < 50){
    return d3.timeMondays(startDate, endDate);
  }
  if(period < 210){
    return d3.timeMonths(startDate, endDate);
  }
  if(period < 630){
    return d3.timeMonths(startDate, endDate, 3);
  }
  return d3.timeYears(startDate, endDate);
}

const getTimeFormat = data => {
  const startDate = data[0].date;
  const endDate = data[data.length - 1].date;
  const period = endDate.getYear() - startDate.getYear(); //in years
  if(period == 0){
    return "%d %B"
  }
  if(period < 3){
    return "%d %B %Y";
  }
  return "%Y";
}

class PriceChart extends Component{
  render(){
    const {data, values, width, height} = this.props;
    const xTicks = getTimeTicks(data);

    const plotGeo = {
      left: 50,
      top: 10,
      width: width - 60,
      height: height - 40
    };

    const xScale = d3.scaleTime()
      .rangeRound([0, plotGeo.width])
      .domain(d3.extent(data, values.x));
    
    const yScale = d3.scaleLinear()
      .rangeRound([plotGeo.height, 0])
      .domain([0, d3.max(data, values.y)*1.2]);

    return (
      <svg width={width} height={height} >
        <Plot
          geo={plotGeo}
          data={data}
          scales={{x: xScale, y: yScale}}
          values={values}
        >
          <Axis 
            className="x-axis"
            position="bottom" 
            ticks={xTicks} 
            formatValue={d3.timeFormat(getTimeFormat(data))}
          />
          <Axis
            className="y-axis" 
            position="left" 
            ticksCount={4} 
            formatValue={price => `$${price}`}
          />
          <Chart />
          <Tooltip
            formats={{
              x: d3.timeFormat('%d %b %Y'),
              y: value => `$${value}`
            }}
          />
        </Plot>
      </svg>
    );
  }
}

export default PriceChart;