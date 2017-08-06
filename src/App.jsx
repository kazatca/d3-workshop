import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PriceChart from './PriceChart.jsx';

class App extends Component{
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  
  constructor(props){
    super(props);
    this.state = {
      dataLength: props.data.length
    };
  }

  getDataSlice(){
    return this.props.data.slice(-this.state.dataLength);
  }

  render(){
    const {data} = this.props;
    return (
      <div>
        <PriceChart 
          width={900} 
          height={190} 
          data={this.getDataSlice()}
        />
        <div>
          <label htmlFor='data-length'>Data length</label>
          <input 
            type='range'
            min='1' 
            max={data.length}
            id='data-length'
            onChange={ ({target}) => this.setState({dataLength: target.value}) }
            value={ this.state.dataLength }
          />
        </div>
      </div>);
  }
}

export default App;