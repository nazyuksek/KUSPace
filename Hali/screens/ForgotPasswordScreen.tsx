import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Navigation from "../navigation";

export interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const [text1, setText1] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [search, setSearch] = React.useState("");

  const onVerifyPressed = () => {
    //  navigation.navigate("")
  };
  const onResendCodePressed = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>HALI</Text>
        <Text style={styles.subtext}>
          A platform that connects football players and football pitch managers!
        </Text>
        <TextField
          text={"username"}
          style={{}}
          textState={text1}
          setText={setText1}
          setSearch={setSearch}
          value={text1}
        ></TextField>
        <TextField
          text={"type verification code"}
          style={{}}
          textState={text2}
          setText={setText2}
          setSearch={setSearch}
          value={text2}
        ></TextField>
        <Button
          onPress={() => {
            onVerifyPressed();
          }}
          buttonText={"Verify"}
          style={{ backgroundColor: "white", marginTop: 50 }}
        ></Button>
        <Button
          onPress={() => {
            onResendCodePressed();
          }}
          buttonText={"Resend Code"}
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

export default ForgotPasswordScreen;
