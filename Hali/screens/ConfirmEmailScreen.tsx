import * as React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export interface ConfirmEmailScreenProps {
  navigation: any;
}

const ConfirmEmailScreen = ({ navigation }: ConfirmEmailScreenProps) => {
  return <View style={styles.container}>Hello</View>;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "rgba(135, 211, 124, 1)",
    justifyContent: "center",
  },
});

export default ConfirmEmailScreen;
