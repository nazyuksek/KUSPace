import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export interface HeaderTabProps {
  props: any;
}

const HeaderTab = ({ props }: HeaderTabProps) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor:
          props.activeTab === props.text ? 'white' : 'aquamarine',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 25,
      }}
      onPress={() => props.setActiveTab(props.text)}
    >
      <Text
        style={{
          color: props.activeTab === props.text ? 'black' : 'white',
          fontSize: 25,
          fontWeight: '500',
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

export default HeaderTab;
