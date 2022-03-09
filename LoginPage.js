import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Button from './components/Button';
import TextField from './components/TextField';

const { width, height } = Dimensions.get('screen');
const x = (width - 50) * 0.1;
export default function LoginPage({ navigation }) {
  function handlePress() {
    navigation.navigate('two');
  }

  return (
    <View
      style={{
        backgroundColor: 'green',
        width: width,
        height: height,
        flex: 1,
      }}
    >
      <Text style={styles.text}>HALI</Text>
      <TextField text={'username'}></TextField>
      <TextField text={'password'}></TextField>
      <Button
        buttonText={'Giriş'}
        onPress={handlePress}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  alp: {
    marginTop: 100,
  },
  text: {
    fontSize: 50,
    alignSelf: 'center',
    marginTop: 100,
    color: 'white',
    marginBottom: 100,
  },
  button: {
    backgroundColor: 'yellow',
    width: width - 50,
    height: (width - 50) * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height - 450,
    alignSelf: 'center',
  },
});
