import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');
export default function FieldBar({ item }) {
  return (
    <View style={style.container}>
      <MaterialCommunityIcons
        name="soccer-field"
        size={120}
        color={'forestgreen'}
      />
      <Text
        style={{
          width: 150,
          height: 30,
        }}
      >
        {item.name}
      </Text>
      <View
        style={{
          marginTop: -50,
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <Ionicons name="md-star" size={20} color="gold"></Ionicons>
          <Text style={{ fontSize: 20 }}>{item.rating}</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'forestgreen',
    flex: 1,
    flexDirection: 'row',
  },
});
