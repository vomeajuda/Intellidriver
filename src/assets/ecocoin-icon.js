// EcoCoin Icon Component
import React from 'react';
import { Image } from 'react-native';

export const EcoCoinIcon = ({ size = 16, style }) => (
  <Image 
    source={require('./EcoCoin.png')}
    style={[{
      width: size,
      height: size,
      resizeMode: 'contain',
    }, style]}
  />
);

export default EcoCoinIcon;