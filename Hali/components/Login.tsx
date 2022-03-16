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
      <View
        style={{
          width: width,
          height: height / 2,
          marginTop: 250,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button buttonText={"Sign in"} onPress={{}} style={{}} />
      </View>
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
