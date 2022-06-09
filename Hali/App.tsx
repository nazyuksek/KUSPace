import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import LandingPage from "./screens/LandingPage";
import { ScreenStack } from "react-native-screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUpChoices from "./screens/SignUpChoices";
import AdminSignupScreen from "./screens/AdminSignupScreen";
import Amplify, { Auth, StorageClass } from "aws-amplify";
import config from "./src/aws-exports";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import { Image } from "react-native";
import ConfirmEmailScreen from "./screens/ConfirmEmailScreen";
import HomeScreen from "./screens/HomeScreen";
import NewPasswordScreen from "./screens/NewPasswordScreen";
//added
import { listPitch2s } from "./src/graphql/queries";
import { useState } from "react";
import { DataStore } from "aws-amplify";

//import { schema } from './src/models/schema';
import { Pitch2 } from "./src/models";
import { Reservation } from "./src/models";
import { Player } from "./src/models";
import { MatchAnnounce } from "./src/models";
//import { initSchema } from "@aws-amplify/datastore";
import BottomBarNavigator from "./navigation/BottomBarNavigator";
import AdminBottomBar from "./navigation/AdminBottomBarNavigator";
import PlayerSearch from "./screens/SearchScreens/PlayerSearch";
import AdminSignupScreen2 from "./screens/AdminSignupScreen2";
import SignupScreen from "./screens/SignupScreen";
import ReservationScreen from "./screens/ReservationScreen";

Auth.configure(config);
Amplify.configure(config);
const App = () => {
  // let pitch_dists = getNearPitchesByDistance(200, "Sariyer");
  const isAdmin: Boolean = true; // because we don't yet receive this data I changed it temporarily Simay
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const Stack = createStackNavigator();
  const dummy = async () => {
    const pitches = await readPitches();
    for (var p of pitches!) {
      // console.log("read pitches: ", p.district);
      console.log("read pitches: ", p.district);

      // console.log("read pitches: ", p.username);
    }
  };

  /*  const dummy2 = async () => {
    try {
      const pitches = await readPitches();
      console.log("in fonk2");
      for (var p of pitches!) {
        //|| p.district == "Ataşehir" || p.district == "Arnavutköy"  || p.district == "Bağcılar" ||  p.district == "Bakirköy" || p.district == "Beşiktaş")
        if (p.district == "Beylikduzu") {
          //var dist2: number = getDistanceByCity(p.district);
          console.log("in Beylikduzu");
          let dist2 = 100;
          if (dist2 < distance) {
            console.log("ALOHA! city by distance is: ", p);
          } else {
            console.log("NEIN");
          }
        }
      }
      // filter the pitches equal to the distance whose distance is loweerr than 500
      return pitches;
    } catch (error) {
      console.log("Error retrieving distance", error);
    }
  }; */

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Landing" component={LandingPage}></Stack.Screen>
          <Stack.Screen
            name="AdminSignupScreen"
            component={AdminSignupScreen}
          />
          <Stack.Screen
            name="ConfirmEmailScreen"
            component={ConfirmEmailScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="NewPassword"
            component={NewPasswordScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Reservation"
            component={ReservationScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="AdminHome"
            component={AdminBottomBar}
          ></Stack.Screen>
          <Stack.Screen
            name="PlayerHome"
            component={BottomBarNavigator}
          ></Stack.Screen>
          <Stack.Screen
            name="AdminSignupScreen2"
            component={AdminSignupScreen2}
          ></Stack.Screen>
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="SignUpChoices"
            component={SignUpChoices}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export const getNearPitchesByDistance = async (
  dist: number,
  user_city: string
) => {
  var pitch_dists = new Map<string, number>();
  var returned_pitch_dists = new Map<[string, string], number>();
  var dist1 = getDistanceByCity(user_city);
  var pitches = await readPitches();
  var dist_threshold = 500;

  for (var p of pitches!) {
    var dist2 = getDistanceByCity(p.district!); // prints values: 10, 20, 30, 40
    console.log(
      "Is p.district as a key exists: ",
      !pitch_dists.has(p.district!)
    );
    if (!pitch_dists.has(p.district!)) {
      console.log("No district exists, go!");
      var diff = Math.abs(dist1 - dist2);
      if (diff < dist_threshold) {
        let pitch_tuple: [string, string] = [p.pitch_name, p.district!];
        pitch_dists.set(p.district!, dist2);
        returned_pitch_dists.set(pitch_tuple, diff);
      } else {
        console.log("Duplicate key!");
      }
    }
  }

  for (let value of returned_pitch_dists.keys()) {
    console.log("Map Keys = " + value);
  }

  return returned_pitch_dists;
};

export const readPitches = async (): Promise<Pitch2[] | undefined> => {
  try {
    const posts = await DataStore.query(Pitch2);
    return posts;
  } catch (error) {
    console.log("Error retrieving pitches", error);
  }
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
});

const savePlayerDataStore = async () => {
  try {
    await DataStore.save(
      new Player({
        username: "dummy2",
        skill: 2,
        district: "Beylikduzu",
        birthdate: "28.07.1998",
        reservations: ["B1 Stadyumu", "B2 Stadyumu"],
        email: "dummy2@gmail.com",
        pitches_played: ["B1 Stadyumu", "B2 Stadyumu"],
        realname: "Mehmet Yilmaz",
      })
    );
    return console.log("Player2 saved successfully!");
  } catch (error) {
    return console.log("Error saving", error);
  }
};

const readData = async () => {
  try {
    const posts = await DataStore.query(Pitch2);
    console.log("Post: ", posts[0].district);
  } catch (error) {
    console.log("Error retrieving posts", error);
  }
};

export const readDistrictQuery = async (district: string) => {
  try {
    const sariyer_players = await DataStore.query(Player, (p) =>
      p.district("eq", district)
    );
    //const sariyer_players = await DataStore.query(Player);
    return sariyer_players;
  } catch (error) {
    console.log(district);
    console.log("Error retrieving player", error);
  }
};

export const readPitchDistrictQuery = async (district: string) => {
  try {
    const pitches = await DataStore.query(Pitch2, (p) =>
      p.district("eq", district)
    );
    return pitches;
  } catch (error) {
    console.log(district);
    console.log("Error retrieving player", error);
  }
};

export const readPitchDistanceQuery = async (distance: number) => {
  try {
    const pitches = await readPitches();
    for (var p of pitches!) {
      if (
        p.district == "Beylikduzu" ||
        p.district == "Ataşehir" ||
        p.district == "Arnavutköy" ||
        p.district == "Bağcılar" ||
        p.district == "Bakirköy" ||
        p.district == "Beşiktaş"
      ) {
        var dist2: number = getDistanceByCity(p.district);
        console.log("District: ", p.district);
        console.log("Dist2: ", dist2);
        // let dist2  = 100;
        if (dist2 < distance) {
          console.log("ALOHA! city by distance is: ", p.pitch_name);
        } else {
          console.log("NEIN");
        }
      }
    }
    // filter the pitches equal to the distance whose distance is loweerr than 500
    return pitches;
  } catch (error) {
    console.log("Error retrieving distance", error);
  }
};

export const readUsernameQuery = async (
  username: string
): Promise<Player[] | undefined> => {
  try {
    const sariyer_players = await DataStore.query(Player, (p) =>
      p.username("eq", username)
    );
    return sariyer_players;
    //const sariyer_players = await DataStore.query(Player);
    //console.log(" players:", JSON.stringify(sariyer_players, null, 2));
  } catch (error) {
    console.log("Error retrieving player", error);
  }
};

// predicate can be 'gt', 'eq', lt : >, <, =
const readPlayerSkillQuery = async (pred: any, skillno: number) => {
  try {
    console.log("pred is:" + pred);
    const players = await DataStore.query(Player, (p) =>
      p.skill(pred, skillno)
    );
    console.log("Skillno: " + skillno);
    console.log("players:", JSON.stringify(players, null, 2));
  } catch (error) {
    console.log("Error retrieving player skillno", error);
  }
};

const saveReservation = async () => {
  try {
    await DataStore.save(
      new Reservation({
        pitch_id: "1",
        reserver_username: "Zeynep Dundar",
        reservation_date: "10 August 2022 Monday 10:00",
      })
    );
    return console.log("Pitch saved successfully!");
  } catch (error) {
    return console.log("Error saving", error);
  }
};

const readReservation = async () => {
  try {
    const posts = await DataStore.query(Reservation);
    console.log(
      "Posts retrieved successfully!",
      JSON.stringify(posts, null, 2)
    );
  } catch (error) {
    console.log("Error retrieving posts", error);
  }
};

export const saveMatchAnnounce = async () => {
  try {
    await DataStore.save(
      new MatchAnnounce({
        hour: "18:00",
        pitch_name: "Moda Stadyumu",
        number_of_attendees: 10,
        total_capacity: 14,
        attendees_list: ["Simay Ozdemir", "Naz Yuksek"],
        announcement_name: "YZ12",
      })
    );
    return console.log("Match Announce saved successfully!");
  } catch (error) {
    return console.log("Error saving Match Announce", error);
  }
};

export const readMatchAnnounce = async () => {
  try {
    const match_announce = await DataStore.query(MatchAnnounce);
    return match_announce;
    console.log(
      "MatchAnnounce retrieved successfully!",
      JSON.stringify(match_announce, null, 2)
    );
  } catch (error) {
    console.log("Error retrieving MatchAnnounce", error);
  }
};

// This method pushes the current playername to the Match announce
// Note updating attendees_list is not complete
export const addPlayerToMatchAnnounce = async (
  announcement_name: string,
  player_name: string
) => {
  try {
    const original = await DataStore.query(MatchAnnounce, (m) =>
      m.announcement_name("eq", announcement_name)
    );

    // fix adding player to attendees_list
    let updated_list = original[0].attendees_list!;
    updated_list = updated_list.concat(player_name);
    let attendee_count = original[0].number_of_attendees! + 1;
    await DataStore.save(
      MatchAnnounce.copyOf(original[0], (updated) => {
        updated.number_of_attendees = attendee_count;
      })
    );
    await DataStore.save(
      MatchAnnounce.copyOf(original[0], (updated) => {
        updated.attendees_list = updated_list;
      })
    );
    console.log("MatchAnnounce updated successfully!");
    // update chosen announcement
  } catch (error) {
    console.log("Error updating MatchAnnounce", error);
  }
};

const deletePlayers = async (player_name: string) => {
  try {
    // realnames: "Mehmet Yilmaz", "Ahmet Yilmaz", "Yilmaz Yilmaz"
    // usernames: dummy1, dummy2, dummy3
    await DataStore.delete(Player, (p) => p.username("eq", player_name));
    console.log("Players deleted successfully!");
  } catch (error) {
    console.log("Error deleting players ", error);
  }
};

const readDataPlayer = async () => {
  try {
    const posts = await DataStore.query(Player);
    return posts;
  } catch (error) {
    console.log("Error retrieving players", error);
  }
};

const savePitchAdmin = async (
  pitch_name: string,
  pitchowner_name: string,
  hourly_price: number,
  opening_hour: string,
  closing_hour: string,
  username: string,
  city: string,
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
        closing_hour: closing_hour,
        username: username,
        city: city,
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

function getDistanceByCity(city: string): number {
  var dist_list = new Map<string, number>();

  dist_list.set("Beylikduzu", 450);
  dist_list.set("Beşiktaş", 600);
  dist_list.set("Ataşehir", 200);
  dist_list.set("Bakırköy", 100);
  dist_list.set("Arnavutköy", 50);
  dist_list.set("Bağcılar", 600);
  return dist_list.get(city)!;
}

export default App;
