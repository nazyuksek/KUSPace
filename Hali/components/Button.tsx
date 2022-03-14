import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export interface ButtonProps {
  onPress: any;
  buttonText: string;
  style: any;
  textStyle: any;
}

const Button = ({ onPress, buttonText, style, textStyle }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

export default Button;