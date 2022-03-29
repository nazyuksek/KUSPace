import { View, Text, TextInput, StyleSheet } from "react-native";
import * as React from "react";
import { selectInput } from "aws-amplify";

export interface textFieldProps {
  text: string;
  style?: {};
  textState: any;
  setText: any;
  setSearch: any;
  value: string;
  password?: boolean
}

const TextField = ({
  text,
  style = {},
  textState,
  setText,
  setSearch,
  password
}: textFieldProps) => {
  function handleEnd() {
    setSearch(textState);
  }

  if (password) {
    return <TextInput
      onChangeText={(text) => setText(text)}
      style={[styles.input, style]}
      onEndEditing={handleEnd}
      placeholder={text}
      placeholderTextColor="black"
      value={textState}
      autoCapitalize='none'
      secureTextEntry
    ></TextInput>
  } else {
    return <TextInput
      onChangeText={(text) => setText(text)}
      style={[styles.input, style]}
      onEndEditing={handleEnd}
      placeholder={text}
      placeholderTextColor="black"
      value={textState}
      autoCapitalize='none'
    ></TextInput>
  }
};

const styles = StyleSheet.create({
  input: {
    width: "60%",
    height: 50,
    alignSelf: "center",
    borderRadius: 15,
    borderWidth: 3,
    backgroundColor: "white",
    borderColor: "white",
    alignContent: "center",
    paddingLeft: 4,
    marginTop: 10,
    padding: 10,
  },
});

export default TextField;
