import { View, Text, TextInput, StyleSheet } from 'react-native';
import * as React from 'react';

export interface textFieldProps {
  text: string;
  style?: {};
  textState: any;
  setText: any;
  setSearch: any;
}

const TextField = ({
  text,
  style = {},
  textState,
  setText,
  setSearch,
}: textFieldProps) => {
  function handleEnd() {
    setSearch(textState);
  }

  return (
    <TextInput
      onChangeText={(text) => setText(text)}
      style={[styles.input, style]}
      onEndEditing={handleEnd}
      placeholder={text}
      placeholderTextColor="black"
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: '5%',
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 3,
    backgroundColor: 'white',
    borderColor: 'white',
    alignContent: 'center',
    paddingLeft: 4,
    marginTop: 10,
    padding: 10,
  },
});

export default TextField;