import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as React from "react";
import Login from "../components/Login";
import TextField from "../components/TextField";

export default function AdminLoginScreen() {
  const [text, setText] = React.useState("");
  const [search, setSearch] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemscontainer}>
        <Login></Login>
        <TextField
          text={"pitch id"}
          style={{}}
          textState={text}
          setText={setText}
          setSearch={setSearch}
        ></TextField>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "rgba(135, 211, 124, 1)",
    justifyContent: "center",
  },
  itemscontainer: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 48,
    fontWeight: "900",
  },
});
