import React, {Component} from 'react';
import PropTypes from 'prop-types';

const getAnchorProps = position => {
  const topAnchor = '0.75em';
  const centerAnchor = '0.37em';
  switch(position){ // eslint-disable-line default-case
    case 'left':
      return {textAnchor: 'end', dy: centerAnchor};
    case 'top':
      return {textAnchor: 'middle'};
    case 'right':
      return {textAnchor: 'start', dy: centerAnchor};
    case 'bottom':
      return {textAnchor: 'middle', dy: topAnchor};
  }
};

class Tick extends Component{
  static propTypes = {
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
    offset: PropTypes.number.isRequired,
    size: PropTypes.number,
    text: PropTypes.string,
    textMargin: PropTypes.number
  };

  static defaultProps = {
    size: 5,
    text: '',
    textMargin: 9
  };

  render(){
    const {position, offset, size, text, textMargin} = this.props;
    
    const [axis, cross] = ['top', 'bottom'].includes(position) ? ['x', 'y']: ['y', 'x'];
    const direction = (['bottom', 'right'].includes(position) ? 1: -1); // tick lines goes outside (text too)

    const lineProps = {
      [`${cross}2`]: size * direction // rest of coordinate values = 0
    };

    const textAnchor = getAnchorProps(position);

    const textProps = {
      ...textAnchor,
      [cross]: textMargin * direction
    };

    return (
      <g className='tick' transform={`translate(${axis == 'x'? offset: 0}, ${axis == 'y'? offset: 0})`}>
        <line {...lineProps} />
        <text {...textProps} >{text}</text>
      </g>);
  }
}

export default Tick;
