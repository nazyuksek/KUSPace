import * as React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-elements";
import { Text } from "../../components/Themed";
import Button from "../../components/Button";
import {
  readDistrictQuery,
  readPitchDistrictQuery,
  readPitchDistanceQuery,
  readUsernameQuery,
} from "../../App";
import { Pitch2 } from "../../src/models";

export interface PitchSearchProps {
  navigation: any;
  route: any;
}

const PitchSearch = ({ navigation, route }: PitchSearchProps) => {
  const username = route?.params?.username;
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pitches, setPitches] = React.useState<Pitch2[] | null>();

  const updateSearch = (search: string) => {
    setSearchQuery(search);
  };

  

  const handleDistrictClick = async () => {
    let result = await readPitchDistrictQuery(searchQuery);
    setPitches(result);
    console.log(result);
  };

  const handleDistanceClick = async () => {
    let result = await readPitchDistanceQuery(searchQuery);
    setPitches(result);
    console.log(result);
  };

  const handlePitchClick = (pitch_username: string) => {
    navigation.navigate("Reservation", { username, pitch_username });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundimage}
        source={require("../../assets/images/football.jpeg")}
      />
      <View style={styles.itemscontainer}>
        <SearchBar
          placeholder="Search a football pitch..."
          onChangeText={updateSearch}
          value={searchQuery}
          platform={"ios" || "android"}
          inputContainerStyle={styles.searchcontainer}
          containerStyle={styles.searchcontainerbackground}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttons}>
        <Button
          buttonText="Search by District"
          onPress={handleDistrictClick}
          style={styles.buttonleft}
        ></Button>
      </View>

        <View style={styles.buttons}>
        <Button
          buttonText="Search by Distance"
          onPress={handleDistanceClick}
          style={styles.buttonleft}
        ></Button>
      </View>
      
      <View style={styles.pitches}>
        {pitches?.map((el, i) => (
          <Text
            onLongPress={() => {
              handlePitchClick(el.username!);
            }}
            style={styles.resultText}
            key={i}
          >
            {el.pitch_name}
          </Text>
        ))}
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
    justifyContent: "flex-start",
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
  searchcontainer: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  searchcontainerbackground: {
    backgroundColor: "rgba(135, 211, 124, 1)",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  buttonleft: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginRight: "3%",
  },
  pitches: {},
  resultText: {
    color: "#eeeeee",
    fontWeight: "600",
    marginTop: 8,
    alignSelf: "center",
    fontSize: 20,
  },
});

export default PitchSearch;
