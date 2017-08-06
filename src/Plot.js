import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class PlotComponent extends Component{
  constructor(props){
    super(props);
    if(!props.data){  // dummy check
      throw new Error(this.constructor.name +' must be inside Plot component');
    }
  }
};

const geoProp = PropTypes.shape({
  left: PropTypes.number,
  top: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
});

const valuesProp = PropTypes.shape({
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired
});

class Plot extends Component{
  static propTypes = {
    data: PropTypes.array.isRequired,
    values: valuesProp.isRequired,
    scales: valuesProp.isRequired,
    geo: geoProp.isRequired
  };
  
  render(){
    const {children, ...props} = this.props; 
    return <g transform={`translate(${props.geo.left}, ${props.geo.top})`}>
      {React.Children.map(this.props.children, (child, index) => 
        React.cloneElement(child, {key: index, ...props})  // index is ok, order not changing
      )}
    </g>
  }
}

export default Plot;