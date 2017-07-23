import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Chart from './Chart.jsx';
import Axis from './Axis.jsx';
import InnerShadowFilter from './InnerShadowFilter.jsx';

const getTimeTicks = data => {
  const startDate = data[0].date;
  const endDate = data[data.length - 1].date;
  const period = (endDate - startDate) / (1000 * 60 * 60 * 24); // in days
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
};

const getTimeFormat = data => {
  const startDate = data[0].date;
  const endDate = data[data.length - 1].date;
  const period = endDate.getYear() - startDate.getYear(); // in years
  if(period == 0){
    return '%d %B';
  }
  if(period < 3){
    return '%d %B %Y';
  }
  return '%Y';
};

class PriceChart extends Component{
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      price: PropTypes.number.isRequired
    })).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  render(){
    const {data, width, height} = this.props;
    const xTicks = getTimeTicks(data);

    const numberFormat = d3.format(',.0r');

    const margin = {
      top: 10,
      bottom: 30,
      left: 60,
      right: 0
    };

    return (
      <svg width={width} height={height} >
        <defs>
          <InnerShadowFilter />
        </defs>  
        <rect className='chart-back' width={width} height={height} />
        <Chart 
          data={data} 
          transform={`translate(${margin.left}, ${margin.top})`} 
          width={width - margin.left - margin.right} 
          height={height - margin.top - margin.bottom}
        >
          <Axis 
            className='x-axis'
            position='bottom' 
            ticks={xTicks} 
            formatValue={d3.timeFormat(getTimeFormat(data))}
          />
          <Axis
            className='y-axis' 
            position='left' 
            ticksCount={4} 
            formatValue={price => `${numberFormat(price)} $`}
          />
        </Chart>
      </svg>
    );
  }
}

export default PriceChart;