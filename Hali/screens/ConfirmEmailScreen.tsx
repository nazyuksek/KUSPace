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
import { Pitch2, Player } from "../src/models";
import { DataStore, Predicates } from "aws-amplify";
import { Reservation } from "../src/models";

export interface ConfirmEmailScreenProps {
  navigation: any;
  route: any;
}

const ConfirmEmailScreen = ({ route, navigation }: ConfirmEmailScreenProps) => {
  const flag = route?.params?.flag;
  const username = route?.params?.username;
  const district = route?.params?.district;
  const email = route?.params?.email;
  const name = route?.params?.given_name + " " + route?.params?.family_name;

  // SAVE SCHEDULE TO DATABASE
  const savePitchAdmin = async (
    pitch_name: string,
    pitchowner_name: string,
    hourly_price: number,
    opening_hour: string,
    closing_hour: string,
    username: string,
    city: string,
    email: string,
    district: string,
    province: string,
    address: string
  ) => {
    try {
      await DataStore.save(
        new Pitch2({
          pitch_name: pitch_name,
          pitchowner_name: pitchowner_name,
          hourly_price: hourly_price,
          opening_hour: opening_hour,
          available_slots: [],
          closing_hour: closing_hour,
          username: username,
          city: city,
          email: email,
          district: district,
          province: province,
          address: address,
        })
      );
      return console.log("Pitch saved successfully!");
    } catch (error) {
      return console.log("Error saving", error);
    }
  };

  const savePlayer = async (
    username: string,
    district: string,
    birthdate: string,
    email: string,
    name: string
  ) => {
    await DataStore.save(
      new Player({
        username: username,
        district: district,
        birthdate: birthdate,
        email: email,
        realname: name,
      })
    );
  };

  const [code, setCode] = React.useState("");
  const [search, setSearch] = React.useState("");
  const onConfirmPressed = async (data: any) => {
    try {
      const response = await Auth.confirmSignUp(data.username, data.code);
      if (flag === "admin") {
        savePitchAdmin(
          route?.params?.pitchname,
          name,
          Number(route?.params?.price),
          route?.params?.opening_hour,
          route?.params?.closing_hour,
          username,
          route?.params?.city,
          email,
          district,
          route?.params?.province,
          route?.params?.address
        );
        navigation.navigate("AdminHome", { username });
      } else {
        savePlayer(username, district, route?.params?.birthdate, email, name);
        navigation.navigate("PlayerHome", { username });
      }
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
          textState={code}
          setText={setCode}
          setSearch={setSearch}
          value={code}
        ></TextField>
        <Button
          style={{
            backgroundColor: "white",
            marginTop: 30,
          }}
          buttonText="Sign up"
          onPress={() => onConfirmPressed({ username, code })}
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
