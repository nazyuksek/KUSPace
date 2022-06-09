import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ProfileImageUpload from "../../components/ProfileImageUpload";
import { MonoText } from "../../components/StyledText";
import { DataStore } from "@aws-amplify/datastore";
import { Player } from "../../src/models";

export interface ProfileContainerProps {
  route: any;
}

const ProfileContainer = ({ route }: ProfileContainerProps) => {
  const player_username = route?.params.username;
  const [username, setUsername] = React.useState(player_username);
  const [name, setName] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [district, setDist] = React.useState("");

  async function gatherPlayerInfo() {
    const player = await DataStore.query(Player, (cond) =>
      cond.username("eq", username)
    );
    if (player[0].birthdate !== undefined) {
      setBirthday(player[0].birthdate);
    }
    if (player[0].realname !== undefined) {
      setName(player[0].realname);
    }
    if (player[0].district !== undefined) {
      setDist(player[0].district);
    }
    console.log(birthday);
  }

  gatherPlayerInfo();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.photoUpload}>
        <ProfileImageUpload />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.keyRow}>
          <MonoText style={styles.value}>Username</MonoText>
          <MonoText style={styles.value}>Name</MonoText>
          <MonoText style={styles.value}>District</MonoText>
          <MonoText style={styles.value}>Birthday</MonoText>
          <MonoText style={styles.value}>Skills</MonoText>
          <MonoText style={styles.value}>Experience Level</MonoText>
        </View>
        <View style={styles.valueRow}>
          <MonoText style={styles.value}>{username}</MonoText>
          <MonoText style={styles.value}>{name}</MonoText>
          <MonoText style={styles.value}>{district}</MonoText>
          <MonoText style={styles.value}>{birthday}</MonoText>
          <MonoText style={styles.value}>Defense</MonoText>
          <MonoText style={styles.value}>Expert</MonoText>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  photoUpload: {
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flexDirection: "column",
    backgroundColor: "rgba(135, 211, 124, 1)",
  },
  keyRow: {
    flexDirection: "column",
    paddingHorizontal: 36,
  },
  valueRow: {
    flexDirection: "column",
    paddingHorizontal: 24,
  },
  value: {
    color: "darkslateblue",
    fontWeight: "900",
    paddingVertical: 24,
  },
});
export default ProfileContainer;
