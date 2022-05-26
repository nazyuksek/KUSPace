import { DataStore } from "@aws-amplify/datastore";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ProfileImageUpload from "../../components/ProfileImageUpload";
import { MonoText } from "../../components/StyledText";
import { Pitch2 } from "../../src/models";

export interface AdminProfileContainerProps {
  route: any;
}

const AdminProfileContainer = ({ route }: AdminProfileContainerProps) => {
  const username = route?.params.username;
  const [pitch_name, setPitchName] = React.useState("");
  const [name, setName] = React.useState("");
  const [city_district, setCityDistrict] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDesc] = React.useState("");
  const [hourly_price, setPrice] = React.useState(0);
  const [working_hours, setHours] = React.useState("");
  const [address, setAdd] = React.useState("");

  async function gatherProfileInfo(username: string) {
    const pitch = await DataStore.query(Pitch2, (cond) =>
      cond.username("eq", username)
    );

    if (pitch[0].pitchowner_name !== undefined) {
      setName(pitch[0].pitchowner_name);
    }
    if (pitch[0].email !== undefined) {
      setEmail(pitch[0].email!);
    }
    if (pitch[0].district !== undefined && pitch[0].city !== undefined) {
      setCityDistrict(pitch[0].district + "/" + pitch[0].city);
    }
    if (pitch[0].description !== undefined) {
      setDesc(pitch[0].description);
    }
    if (pitch[0].pitch_name !== undefined) {
      setPitchName(pitch[0].pitch_name);
    }
    if (
      pitch[0].opening_hour !== undefined &&
      pitch[0].closing_hour !== undefined
    ) {
      setHours(pitch[0].opening_hour + "-" + pitch[0].closing_hour);
    }
    if (pitch[0].hourly_price !== undefined) {
      setPrice(pitch[0].hourly_price);
    }
    if (pitch[0].address !== undefined) {
      setAdd(pitch[0].address!);
    }
  }
  gatherProfileInfo(username);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.photoUpload}>
        <ProfileImageUpload />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.keyRow}>
          <MonoText style={styles.value}>Name</MonoText>
          <MonoText style={styles.value}>Email</MonoText>
          <MonoText style={styles.value}>Manager Name</MonoText>
          <MonoText style={styles.value}>City & District</MonoText>
          <MonoText style={styles.value}>Address</MonoText>
          <MonoText style={styles.value}>Working Hours</MonoText>
          <MonoText style={styles.value}>Hourly Price</MonoText>
        </View>
        <View style={styles.valueRow}>
          <MonoText style={styles.value}>{pitch_name}</MonoText>
          <MonoText style={styles.value}>{email}</MonoText>
          <MonoText style={styles.value}>{name}</MonoText>
          <MonoText style={styles.value}>{city_district}</MonoText>
          <MonoText style={styles.value}>{address}</MonoText>
          <MonoText style={styles.value}>{working_hours}</MonoText>
          <MonoText style={styles.value}>{hourly_price}</MonoText>
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

export default AdminProfileContainer;
