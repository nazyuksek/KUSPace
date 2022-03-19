import { StyleSheet, Text, View, Pressable } from "react-native";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "../components/TextField";
import Login from "../components/Login";

export interface LandingPageProps {}

const LandingPage = ({}: LandingPageProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>HALI</Text>
        <Text style={styles.subtext}>
          A platform that connects football players and football pitch managers!
        </Text>
        <Login></Login>
        <Button
          onPress={() => {}}
          buttonText="Login as Manager"
          style={{ marginTop: 150, backgroundColor: "white" }}
        ></Button>
        <Button
          onPress={() => {}}
          buttonText="Login"
          style={{ marginTop: 10, backgroundColor: "white" }}
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

export default LandingPage;
