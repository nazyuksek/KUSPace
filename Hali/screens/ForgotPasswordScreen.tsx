import { StyleSheet, Text, View, SafeAreaView, Alert, Image } from "react-native";
import React from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { Auth } from "aws-amplify";

export interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const [username, setUsername] = React.useState("");
  const [search, setSearch] = React.useState("");

  const onSendPressed = async () => {
    try {
      const response = await Auth.forgotPassword(username);
      navigation.navigate("NewPassword");
    } catch (e: any) {
      Alert.alert("", e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundimage}
        source={require("../assets/images/football.jpeg")}
      />
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
        <Button
          onPress={() => {
            onSendPressed();
          }}
          buttonText={"Send"}
          style={{ backgroundColor: "white", marginTop: 20 }}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundimage: {
    flex: 1,
    position: "absolute",
    display: "flex",
    alignSelf: "center",
    width: "100%",
    height: "120%",
    opacity: 0.05,
  },
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

export default ForgotPasswordScreen;
