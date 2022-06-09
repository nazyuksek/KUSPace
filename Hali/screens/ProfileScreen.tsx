import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AdminProfileContainer from "./ProfileScreenContainers/AdminProfileContainer";
import ProfileContainer from "./ProfileScreenContainers/ProfileContainer";
import { StackRouter } from "@react-navigation/native";

export interface ProfileScreenProps {
  route: any;
}

const ProfileScreen = ({ route }: ProfileScreenProps) => {
  // isUserAdmin should set from the API via Redux.
  const isUserAdmin: Boolean = true;
  return (
    <SafeAreaView style={styles.container}>
      {isUserAdmin ? (
        <AdminProfileContainer route={route} />
      ) : (
        <ProfileContainer route={StackRouter} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default ProfileScreen;
