import React, {Component} from 'react';

import Tick from './Tick.js';

class Axis extends Component{
  render(){
    const {position, formatValue, width, height, scales, ...props} = this.props;
    const axis = ['left', 'right'].indexOf(position) != -1 ? 'y': 'x'; 
    
    const ticks = this.props.ticks || scales[axis].ticks(this.props.ticksCount);

    const size = -(axis == 'x' ? height: width);

    // shapeRendering="crispEdges"
    return (
      <g
        transform={`translate(${ position == 'right'? width: 0 }, ${ position == 'bottom' ? height: 0 })`}
        {...props}
      >
        {ticks.map( tick => <Tick 
          key={tick}
          position={position}
          offset={scales[axis](tick) + 0.5} //0.5 for thinner lines
          size={size}
          text={formatValue(tick)}
          textMargin={9}
        />)}
      </g>);
  }
};

export default Axis;