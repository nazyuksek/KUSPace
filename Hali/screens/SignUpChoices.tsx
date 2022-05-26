import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "../components/TextField";
import Login from "../components/Login";
import { DataStore } from "aws-amplify";
import { Pitch2 } from "../src/models";

export interface SignUpProps {
  navigation: any;
}

const SignUpChoices = ({ navigation }: SignUpProps) => {
  const onManagerPresssed = () => {
    navigation.navigate("AdminSignupScreen");
  };
  const onPlayerPresssed = () => {
    navigation.navigate("SignupScreen");
  };

  const readSaved = async (value: string) => {
    const post = await DataStore.query(Pitch2, (cond) =>
      cond.username("eq", value)
    );
    console.log(JSON.stringify(post, null, 2));
  };

  // readSaved();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundimage}
        source={require("../assets/images/football.jpeg")}
      />
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>HALI</Text>
        <Button
          onPress={() => {
            onManagerPresssed();
          }}
          buttonText="Sign up as Manager"
          style={{ marginTop: 40, backgroundColor: "white" }}
        ></Button>
        <Button
          onPress={() => {
            onPlayerPresssed();
          }}
          buttonText="Sign Up"
          style={{ marginTop: 30, backgroundColor: "white" }}
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
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "rgba(135, 211, 124, 1)",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 48,
    fontWeight: "900",
  },
  itemscontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

export default SignUpChoices;
