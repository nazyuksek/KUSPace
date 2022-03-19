import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import * as React from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";

const { width, height } = Dimensions.get("screen");
export interface AdminSignUpProps {}
const AdminSignupScreen = () => {
  const [text, setText] = React.useState("");
  const [search, setSearch] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>HALI</Text>
        <Text style={styles.subtext}>
          A platform that connects football players and football pitch managers!
        </Text>
        <TextField
          text={"Pitch Name"}
          style={{ marginTop: 15 }}
          textState={text}
          setText={setText}
          setSearch={setSearch}
        ></TextField>
        <TextField
          text={"Location"}
          style={{ marginTop: 15 }}
          textState={text}
          setText={setText}
          setSearch={setSearch}
        ></TextField>
        <TextField
          text={"Email"}
          style={{ marginTop: 15 }}
          textState={text}
          setText={setText}
          setSearch={setSearch}
        ></TextField>
        <TextField
          text={"Phone Number"}
          style={{ marginTop: 15 }}
          textState={text}
          setText={setText}
          setSearch={setSearch}
        ></TextField>
        <TextField
          text={"Password"}
          style={{ marginTop: 15 }}
          textState={text}
          setText={setText}
          setSearch={setSearch}
        ></TextField>
        <Button
          style={{
            backgroundColor: "white",
            marginTop: 30,
          }}
          buttonText="Sign up"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

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
    //   justifyContent: "center",
  },
  itemscontainer: {
    marginTop: 150,
    display: "flex",
    alignItems: "center",
  },
  subtext: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 20,
  },
});

export default AdminSignupScreen;
