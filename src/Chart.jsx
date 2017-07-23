import React, {Component, Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';


const passPropsToChildren = (children, props) => 
  Children.map(children, child => cloneElement(child, props));

class Chart extends Component{
  static propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    children: PropTypes.array
  };

  render(){
    const {data, width, height, children, ...props} = this.props;

    const xScale = d3.scaleTime()
      .rangeRound([0, width])
      .domain(d3.extent(data, d => d.date));
    
    const yScale = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(data, d => d.price) * 1.2]); // 20 % blank area from top

    const area = d3.area()
      .x(d => xScale(d.date))
      .y0(yScale(0))
      .y1(d => yScale(d.price));

    const line = d3.area()
      .x(d => xScale(d.date))
      .y(d => yScale(d.price));

    return (
      <g width={width} height={height} {...props}>
        {passPropsToChildren(children, {
          width,
          height,
          scales: {
            x: xScale,
            y: yScale
          }
        })}
        <path className='chart-area' d={area(data)} filter='url(#inner-shadow)'/>
        <path className='chart-line' d={line(data)} />
      </g>);
  }
}

export default Chart;