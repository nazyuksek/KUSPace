import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

interface textFieldProps {
  text: string;
  style: {};
  textState: any;
  setText: any;
  setSearch: any;
}

export default function TextField({
  text,
  style = {},
  textState,
  setText,
  setSearch,
}: textFieldProps) {
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
    backgroundColor: 'green',
    borderWidth: 3,
    borderColor: 'white',
    alignContent: 'center',
    paddingLeft: 4,
    marginTop: 10,
  },
});
