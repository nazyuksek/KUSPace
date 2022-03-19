import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as React from "react";
import TextField from "./TextField";
import Button from "./Button";

const { width, height } = Dimensions.get("screen");
export interface LoginProps {}
const Login = () => {
  const [text, setText] = React.useState("");
  const [search, setSearch] = React.useState("");
  return (
    <View style={styles.container}>
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
      <Button buttonText={"Sign in"} onPress={{}} style={{}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: "100%",
  },
});

export default Login;
