import React from 'react';
import PropTypes from 'prop-types';
import {PlotComponent} from './Plot.js';

import Tick from './Tick.jsx';

class Axis extends PlotComponent {
  static propTypes = {
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
    formatValue: PropTypes.func,
    ticks: PropTypes.array,
    ticksCount: PropTypes.number
  };

  static defaultProps = {
    ticksCount: 8,
    formatValue: value => `${value}`
  };
  
  render() {    
    const {
      position, formatValue, 
      // this props Chart passes to all children by cloneElement 
      geo, scales // eslint-disable-line react/prop-types
    } = this.props;
    const {width, height} = geo;
    const axis = ['left', 'right'].includes(position) ? 'y': 'x'; 
    const ticks = this.props.ticks || scales[axis].ticks(this.props.ticksCount);
    const ticksArray = ticks || scales[axis].ticks(ticksCount);
    const size = (axis == 'x' ? height: width);

    return (
      <g
        transform={`translate(${ position == 'right'? width: 0 }, ${ position == 'bottom' ? height: 0 })`}
      >
        {ticksArray.map( tick => <Tick 
          key={tick}
          position={position}
          offset={scales[axis](tick) + 0.5} // 0.5 for thinner lines
          size={-size}
          text={formatValue(tick)}
        />)}
      </g>);
  }
}

export default Axis;
