import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as React from "react";
import Login from "../components/Login";
import TextField from "../components/TextField";
import Button from "../components/Button";

export default function AdminLoginScreen(navigation: any) {
  const [text, setText] = React.useState("");
  const [search, setSearch] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>HALI</Text>
        <Text style={styles.subtext}>
          A platform that connects football players and football pitch managers!
        </Text>
        <Login></Login>
        <TextField
          text={"pitch id"}
          style={{ marginTop: 110 }}
          textState={text}
          setText={setText}
          setSearch={setSearch}
        ></TextField>
        <Button
          onPress={() => {}}
          buttonText="Login"
          style={{ backgroundColor: "white", marginTop: 50 }}
        ></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 48,
    fontWeight: "900",
  },
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
  subtext: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 20,
  },
});
