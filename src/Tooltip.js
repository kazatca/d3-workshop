import React from 'react';
import {PlotComponent} from './Plot.js';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const bisect = (data, date) => {
  let [l, r, c] = [0, data.length-1, 0];
  while(r - l > 1){
    c = Math.floor((l + r) / 2);
    if(data[c].date > date){
      r = c;
    }
    else{
      l = c;
    }
  }
  if(date - data[l].date < data[r].date - date){
    return l;  // l closer to date than r
  }
  return r;
}

const defState = {x: 0, visible: false, index: 0};

class Tooltip extends PlotComponent{
  static propTypes = {
    formats: PropTypes.shape({
      x: PropTypes.func.isRequired,
      y: PropTypes.func.isRequired
    }),
  };

  static defaultProps = {
    formats: {
      x: value => value,
      y: value => value
    }
  };

  constructor(props){
    super(props);
    this.state = defState;
  }

  render(){
    const {data, scales, values, geo, formats} = this.props;

    const point = data[this.state.index];
    const [x, y] = [values.x(point), values.y(point)];

    return (
      <g>
        { 
          this.state.visible ?
          <g transform={`translate(${this.state.x - 0.5})`} >
            <line y2={geo.height} stroke='black'/>
            <circle r='4' transform={`translate(0, ${scales.y(y)})`} />
            <g transform={`translate(${this.state.x < 120? 30: -100}, ${geo.height - 10})`} >
              <rect 
                className='tooltip_background' 
                width='120'
                height='60' 
                transform='translate(-25, -55)'
              />
              <text transform='translate(0, -30)' >{formats.x(x)}</text>
              <text>{formats.y(y)}</text>
            </g>
          </g> :
          null
        }
        <rect 
          width={geo.width} 
          height={geo.height} 
          fill='transparent' 
          ref={overlay => this.overlay = overlay}
          onMouseMove={e => this._onMouseMove(e)}
          onMouseEnter={() => this.setState({visible: true})}
          onMouseLeave={() => this.setState({visible: false})}
        />
      </g>);
  }

  componentWillReceiveProps(){
    this.setState(defState);
  }

  _onMouseMove(e){
    const {data, scales} = this.props;
    if(this.overlay == e.target){
      const x = e.nativeEvent.offsetX;
      const index = bisect(data, scales.x.invert(x));
      this.setState({x, index, visible: true});
    }
  }
}

export default Tooltip;