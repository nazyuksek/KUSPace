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

const { width, height } = Dimensions.get("screen");

export interface AdminSignUp2Props {
  navigation: any;
  route: any;
}

const AdminSignupScreen2 = ({ navigation, route }: AdminSignUp2Props) => {
  const email = route?.params.email;
  const username = route?.params.username;
  const password = route?.params.password;
  const given_name = route?.params.name;
  const family_name = route?.params.surname;
  const pitchname = route?.params.pitchname;

  const { control, handleSubmit, watch } = useForm();
  const [price, setPrice] = React.useState("");
  const [opening_hour, setOpening] = React.useState("");
  const [closing_hour, setClosing] = React.useState("");
  const [city, setCity] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [search, setSearch] = React.useState("");
  const birthdate = "";
  const text_data = [
    email,
    birthdate,
    username,
    password,
    given_name,
    family_name,
  ];
  const flag = "admin";

  const onSignUpPressed = async () => {
    const [email, birthdate, username, password, given_name, family_name] =
      text_data;
    try {
      const response = await Auth.signUp({
        username,
        password,
        attributes: { email, birthdate, given_name, family_name },
      });

      navigation.navigate("ConfirmEmailScreen", {
        username,
        flag,
        email,
        pitchname,
        given_name,
        family_name,
        city,
        price,
        opening_hour,
        closing_hour,
        district,
        province,
        address,
      });
    } catch (e: any) {
      Alert.alert("There is a problem with signing up!", e.message);
    }
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
        <Text style={styles.subtext}>MANAGER SIGN UP CONTINUED</Text>
        <TextField
          text={"Price"}
          style={{ marginTop: 15 }}
          textState={price}
          setText={setPrice}
          setSearch={setSearch}
          value={username}
        ></TextField>
        <TextField
          text={"Opening Hour"}
          style={{ marginTop: 15 }}
          textState={opening_hour}
          setText={setOpening}
          setSearch={setSearch}
          value={opening_hour}
        ></TextField>
        <TextField
          text={"Closing Hour"}
          style={{ marginTop: 15 }}
          textState={closing_hour}
          setText={setClosing}
          setSearch={setSearch}
          value={closing_hour}
        ></TextField>
        <TextField
          text={"City"}
          style={{ marginTop: 15 }}
          textState={city}
          setText={setCity}
          setSearch={setSearch}
          value={city}
        ></TextField>
        <TextField
          text={"District"}
          style={{ marginTop: 15 }}
          textState={district}
          setText={setDistrict}
          setSearch={setSearch}
          value={district}
        ></TextField>
        <TextField
          text={"Province"}
          style={{ marginTop: 15 }}
          textState={province}
          setText={setProvince}
          setSearch={setSearch}
          value={province}
        ></TextField>
        <TextField
          text={"Address"}
          style={{ marginTop: 15 }}
          textState={address}
          setText={setAddress}
          setSearch={setSearch}
          value={address}
        ></TextField>
        <Button
          style={{
            backgroundColor: "white",
            marginTop: 30,
          }}
          buttonText="Signup"
          onPress={() => onSignUpPressed()}
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

export default AdminSignupScreen2;
