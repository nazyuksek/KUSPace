import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AdminProfileContainer from "./ProfileScreenContainers/AdminProfileContainer";
import ProfileContainer from "./ProfileScreenContainers/ProfileContainer";

const ProfileScreen = () => {
  // isUserAdmin should set from the API via Redux.
  const isUserAdmin: Boolean = true
  return (
    <SafeAreaView style={styles.container}>
      {isUserAdmin ?
        <AdminProfileContainer /> : <ProfileContainer />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  }
});

export default ProfileScreen;
