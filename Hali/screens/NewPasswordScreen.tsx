import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import React from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { Auth } from "aws-amplify";

export interface NewPasswordScreenProps {
  navigation: any;
}

const NewPasswordScreen = ({ navigation }: NewPasswordScreenProps) => {
  const [username, setUsername] = React.useState("");
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [search, setSearch] = React.useState("");

  const onSubmitPressed = async () => {
    try {
      const response = await Auth.forgotPasswordSubmit(
        username,
        code,
        password
      );
      navigation.navigate("Home");
    } catch (e: any) {
      Alert.alert("", e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>HALI</Text>
        <Text style={styles.subtext}>RESET YOUR PASSWORD</Text>
        <TextField
          text={"username"}
          style={{}}
          textState={username}
          setText={setUsername}
          setSearch={setSearch}
          value={username}
        ></TextField>
        <TextField
          text={"code"}
          style={{}}
          textState={code}
          setText={setCode}
          setSearch={setSearch}
          value={code}
        ></TextField>
        <TextField
          text={"new password"}
          style={{}}
          textState={password}
          setText={setPassword}
          setSearch={setSearch}
          value={password}
        ></TextField>
        <Button
          onPress={() => {
            onSubmitPressed();
          }}
          buttonText={"Send"}
          style={{ backgroundColor: "white", marginTop: 20 }}
        ></Button>
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

export default NewPasswordScreen;
