import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundimage}
        source={require("../assets/images/football.jpeg")}
      />
      <Text style={styles.title}>This screen doesn't exist.</Text>
      {/* <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}> */}
      <Text style={styles.linkText}>Go to home screen!</Text>
      {/* </TouchableOpacity> */}
    </View>
  );
}

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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
