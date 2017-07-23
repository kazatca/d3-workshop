import React from 'react';


const getAnchorProps = position => {
  const topAnchor = '0.75em';
  const centerAnchor = '0.37em';
  if(position == 'left'){
    return {textAnchor: 'end', dy: centerAnchor}
  }
  if(position == 'top') {
    return {textAnchor: 'middle'}
  }
  if(position == 'right') {
    return {textAnchor: 'start', dy: centerAnchor};
  }
  return {textAnchor: 'middle', dy: topAnchor}

};


const Tick = ({position, offset, size, text, textMargin}) => {
  const [axis, cross] = ['top', 'bottom'].indexOf(position) != -1? ['x', 'y']: ['y', 'x'];
  const direction = (['bottom', 'right'].indexOf(position) != -1? 1: -1); //tick lines goes outside (text too)
  const {x, y} = {
    [axis]: offset,
    [cross]: 0
  };

  const lineProps = {
    [`${cross}2`]: size * direction
  };

  const textAnchor = getAnchorProps(position);

  const textProps = {
    ...textAnchor,
    [cross]: textMargin * direction
  };

  return (
    <g className="tick" transform={`translate(${x}, ${y})`}>
      <line {...lineProps} />
      <text {...textProps} >{text}</text>
    </g>);
};

export default Tick;
