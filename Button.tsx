import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Button({ onPress, buttonText, style, textStyle }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
}
