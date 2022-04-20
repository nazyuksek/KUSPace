import { View, Text, StyleSheet } from "react-native";
import React from "react";

export interface FindPlayerScreenProps {}

const FindPlayerScreen = ({}: FindPlayerScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemscontainer}>
        <Text>Find Playaer Screen</Text>
      </View>
    </View>
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
    backgroundColor: "white",
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

export default FindPlayerScreen;
