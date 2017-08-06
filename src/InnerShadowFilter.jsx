import React from 'react';

const InnerShadowFilter = () => 
  <filter id='inner-shadow' width='200%' height='200%'>
    <feGaussianBlur in='SourceAlpha' stdDeviation='10' result='blur' />
    
    <feOffset dy='40' />
    <feGaussianBlur stdDeviation='10'  result='offset-blur' />
    
    <feComposite operator='out' in='SourceGraphic' result='inverse' />
    <feFlood floodColor='white' floodOpacity='0.7' result='color' />
    
    <feComposite operator='in' in='color' in2='inverse' result='shadow' />
    <feComponentTransfer in='shadow' result='shadow'>
      <feFuncA type='linear' slope='1' />
    </feComponentTransfer>
  </filter>;

export default InnerShadowFilter;