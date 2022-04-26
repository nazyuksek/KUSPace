import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import { NavigationHelpersContext } from "@react-navigation/native";
import { Image } from "react-native";


export interface ConfirmEmailScreenProps {
  navigation: any;
  route: any;
}

const ConfirmEmailScreen = ({ route, navigation }: ConfirmEmailScreenProps) => {
  const text3 = route?.params?.text3;
  const [text1, setText1] = React.useState("");
  const [search, setSearch] = React.useState("");

  const onConfirmPressed = async (data: any) => {
    try {
      const response = await Auth.confirmSignUp(data.text3, data.text1);
      navigation.navigate("Login");
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
        <Text style={styles.subtext}>Confirm Your Email</Text>
        <TextField
          text={"Enter your verification code"}
          style={{ marginTop: 15 }}
          textState={text1}
          setText={setText1}
          setSearch={setSearch}
          value={text1}
        ></TextField>
        <Button
          style={{
            backgroundColor: "white",
            marginTop: 30,
          }}
          buttonText="Sign up"
          onPress={() => onConfirmPressed({ text3, text1 })}
        />
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
    //   justifyContent: "center",
  },
  itemscontainer: {
    marginTop: 40,
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

export default ConfirmEmailScreen;
