import { View, Dimensions, Text, StyleSheet } from 'react-native';
import React from 'react';
import TextField from './components/TextField';
import Button from './components/Button';

const { width, height } = Dimensions.get('screen');

export default function Screen2({ navigation }) {
  function handlePress() {
    // navigation.navigate('three');
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
      <TextField text={'Name'}></TextField>
      <TextField text={'Surname'} style={{ marginTop: 15 }}></TextField>
      <TextField text={'Email'} style={{ marginTop: 15 }}></TextField>
      <TextField text={'Phone Number'} style={{ marginTop: 15 }}></TextField>
      <TextField text={'City'} style={{ marginTop: 15 }}></TextField>
      <TextField text={'Password'} style={{ marginTop: 15 }}></TextField>
      <Button
        buttonText={'End Sign up'}
        onPress={handlePress}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: height - 700,
    alignSelf: 'center',
  },
});


// flexWrap -> wraps items
// alignItems is aligning in a line
// alignContent = 'center' -> This is about wrapping  -> aligning intercontent -> no effect if there is no wrap
// flexGrow -> grows horizontally in portrait mode
// flexBasis -> decides width in portrait mode -> depends on the primary axis
// flexShrink -> opposite of flexGrow. shrinks if there are items to wrap
// flexShrink: 1 flexShrink:-1 = flexGrow:1

// position: 'relative' -> default can position the item without affecting other items' positions 
// position:absolute -> position affects other items' positions