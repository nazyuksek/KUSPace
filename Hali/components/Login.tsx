import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import TextField from "./TextField";
import Button from "./Button";

const { width, height } = Dimensions.get("screen");
export interface LoginProps {}
const Login = () => {
  const [text, setText] = React.useState("");
  const [search, setSearch] = React.useState("");
  return (
    <View>
      <TextField
        text={"username"}
        style={{}}
        textState={text}
        setText={setText}
        setSearch={setSearch}
      ></TextField>
      <TextField
        text={"password"}
        style={{}}
        textState={text}
        setText={setText}
        setSearch={setSearch}
      ></TextField>
      <View
        style={{
          backgroundColor: "forestgreen",
          width: width,
          height: height / 2,
          marginTop: 250,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          buttonText={"Forgot Password"}
          onPress={{}}
          style={{
            backgroundColor: "forestgreen",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        />
        <Button buttonText={"Sign in"} onPress={{}} style={{}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
