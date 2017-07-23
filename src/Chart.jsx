import React, {Component, Children, cloneElement} from 'react';
import * as d3 from 'd3';


const passPropsToChildren = (children, props) => 
  Children.map(children, child => cloneElement(child, props))

class Chart extends Component{
  render(){
    const {data, width, height, children, ...props} = this.props;

    const xScale = d3.scaleTime()
      .rangeRound([0, width])
      .domain(d3.extent(data, d => d.date));
    
    const yScale = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(data, d => d.price)]);

    const area = d3.area()
      .x(d => xScale(d.date))
      .y0(yScale(0))
      .y1(d => yScale(d.price))

    return (
      <g width={width} height={height} {...props} >
        <path d={area(data)}/>
        {passPropsToChildren(children, {
          width,
          height,
          scales: {
            x: xScale,
            y: yScale
          }
        })}
      </g>);
  }
}

export default Chart;