import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "../components/TextField";
import Login from "../components/Login";
import { Image } from "react-native";
import { Auth, DataStore } from "aws-amplify";
import { TextInput } from "react-native-gesture-handler";
import { Pitch2 } from "../src/models";

export interface LandingPageProps {
  navigation: any;
}

const LandingPage = ({ navigation }: LandingPageProps) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [search, setSearch] = React.useState("");

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };
  const onNoaccountPressed = () => {
    navigation.navigate("SignUpChoices");
  };

  const onLoginPressed = async () => {
    try {
      const response = await Auth.signIn(username, password);
      if (await checkifAdmin(username)) {
        navigation.navigate("AdminHome", { username });
      } else {
        navigation.navigate("PlayerHome", { username });
      }
    } catch (e: any) {
      Alert.alert("There is a problem with signing up!", e.message);
    }
  };

  const checkifAdmin = async (username: string) => {
    const response = await DataStore.query(Pitch2, (cond) =>
      cond.username("contains", username)
    );
    if (response[0] === undefined) {
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundimage}
        source={require("../assets/images/football.jpeg")}
      />
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>HALI</Text>
        <Text style={styles.subtext}>
          A platform that connects football players and football pitch managers!
        </Text>
        <TextField
          text={"username"}
          style={{}}
          textState={username}
          setText={setUsername}
          setSearch={setSearch}
          value={username}
        ></TextField>
        <TextField
          text={"password"}
          style={{}}
          textState={password}
          setText={setPassword}
          setSearch={setSearch}
          value={password}
          password={true}
        ></TextField>
        <Button
          onPress={() => {
            onLoginPressed();
          }}
          buttonText="Login"
          style={{ marginTop: 40, backgroundColor: "rgb(231, 232, 230)" }}
        ></Button>
        <Text
          style={{
            color: "darkslategrey",
            fontSize: 14,
            fontStyle: "italic",
            marginTop: 20,
          }}
          onPress={() => {
            onForgotPasswordPressed();
          }}
        >
          Forgot Password?
        </Text>
        <Text style={styles.orTitle}>OR</Text>
        <Text
          style={{
            color: "darkslategrey",
            fontSize: 14,
            marginTop: 10,
          }}
          onPress={() => {
            onNoaccountPressed();
          }}
        >
          No Account? Sign up
        </Text>
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
  logintext: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 16,
  },
  orTitle: {
    fontWeight: "600",
    marginTop: 30,
  },
});

export default LandingPage;
