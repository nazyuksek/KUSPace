import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import * as React from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { NavigationContainer } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import ConfirmEmailScreen from "./ConfirmEmailScreen";
import { NavigationHelpersContext } from "@react-navigation/native";
import { Image } from "react-native";
import { Pitch2 } from "../src/models";
import AdminSignupScreen2 from "./AdminSignupScreen2";
const { width, height } = Dimensions.get("screen");

export interface AdminSignUpProps {
  navigation: any;
}

const AdminSignupScreen = ({ navigation }: AdminSignUpProps) => {
  const { control, handleSubmit, watch } = useForm();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pitchname, setPitchname] = React.useState("");
  const [search, setSearch] = React.useState("");
  const text_data = [email, username, password, name, surname];

  const onContinuePressed = () => {
    console.log(username);
    console.log(pitchname);
    console.log(email);
    navigation.navigate("AdminSignupScreen2", {
      email,
      username,
      password,
      name,
      surname,
      pitchname,
    });
  };

  const onSignInPressed = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundimage}
        source={require("../assets/images/football.jpeg")}
      />
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>HALI</Text>
        <Text style={styles.subtext}>Manager Sign Up</Text>
        <TextField
          text={"Username"}
          style={{ marginTop: 15 }}
          textState={username}
          setText={setUsername}
          setSearch={setSearch}
          value={username}
        ></TextField>
        <TextField
          text={"Email"}
          style={{ marginTop: 15 }}
          textState={email}
          setText={setEmail}
          setSearch={setSearch}
          value={email}
        ></TextField>
        <TextField
          text={"Pitch Name"}
          style={{ marginTop: 15 }}
          textState={pitchname}
          setText={setPitchname}
          setSearch={setSearch}
          value={pitchname}
        ></TextField>
        <TextField
          text={"Name"}
          style={{ marginTop: 15 }}
          textState={name}
          setText={setName}
          setSearch={setSearch}
          value={name}
        ></TextField>
        <TextField
          text={"Surname"}
          style={{ marginTop: 15 }}
          textState={surname}
          setText={setSurname}
          setSearch={setSearch}
          value={surname}
        ></TextField>
        <TextField
          text={"Password"}
          style={{ marginTop: 15 }}
          textState={password}
          setText={setPassword}
          setSearch={setSearch}
          value={password}
          password={true}
        ></TextField>
        <Button
          style={{
            backgroundColor: "white",
            marginTop: 30,
          }}
          buttonText="Continue"
          onPress={() => {
            onContinuePressed();
          }}
        />
        <Text
          style={{
            color: "black",
            fontSize: 12,
            marginTop: 12,
          }}
          onPress={() => {
            onSignInPressed();
          }}
        >
          Already have an account? Sign in
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

export default AdminSignupScreen;
