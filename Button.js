import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Button({ onPress, style }) {
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.5}>
      <Text>Button</Text>
    </TouchableOpacity>
  );
}
