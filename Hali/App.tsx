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
import AdminLoginScreen from "./screens/AdminLoginScreen";
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

Auth.configure(config);
Amplify.configure(config);

const App = () => {

  // savePlayerDataStore();
  // saveMatchAnnounce();
  // saveReservation();

  // readMatchAnnounce();
  // readDataPlayer();
  // readDistrictQuery("Sariyer");
  // readDistrictQuery("Beylikduzu");
  // readPlayerSkillQuery("eq", 2);
  // readReservation();
  // readData();

  // // to be fixed, detail is in function
  // addPlayerToMatchAnnounce("YZ12","Elvin Altintas");
 
  // Mocked isAdmin boolean, It should be recieved from BE.


  const isAdmin: Boolean = true; // because we don't yet receive this data I changed it temporarily Simay
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const Stack = createStackNavigator();
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
          {/* <Stack.Screen
            name="BottomBar"
            component={BottomBarNavigator}
          ></Stack.Screen> */}
          <Stack.Screen name="Landing" component={LandingPage}></Stack.Screen>
          <Stack.Screen name="AdminSignUp" component={AdminSignupScreen} />
          <Stack.Screen
            name="ConfirmEmailScreen"
            component={ConfirmEmailScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Login"
            component={AdminLoginScreen}
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
            name="AdminHome"
            component={AdminBottomBar}
          ></Stack.Screen>
          <Stack.Screen
            name="PlayerHome"
            component={BottomBarNavigator}
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
    console.log(
      "Posts retrieved successfully!",
      JSON.stringify(posts, null, 2)
    );
  } catch (error) {
    console.log("Error retrieving posts", error);
  }
};

const readDistrictQuery = async (district) => {
  try {
    const sariyer_players = await DataStore.query(Player, p => p.district("eq", district));
    //const sariyer_players = await DataStore.query(Player);
    console.log(
    " players:",
    JSON.stringify(sariyer_players, null, 2)
    );
  } catch (error) {
    console.log(district);
    console.log("Error retrieving player", error);
  }
};

// predicate can be 'gt', 'eq', lt : >, <, =
const readPlayerSkillQuery = async (pred, skillno) => {
  try {
    console.log("pred is:"+pred);
    const players = await DataStore.query(Player, p => p.skill(pred, skillno));
    console.log("Skillno: "+skillno);
    console.log(
    "players:",
    JSON.stringify(players, null, 2)
    );
  } catch (error) {
    console.log("Error retrieving player skillno", error);
  }
};

const readDataPlayer = async () => {
  try {
    const posts = await DataStore.query(Player);
    console.log(
      "Player retrieved successfully!",
      JSON.stringify(posts, null, 2)
    );
  } catch (error) {
    console.log("Error retrieving players", error);
  }
};

const saveReservation = async () => {
  try {
  await DataStore.save(
    new Reservation({
    pitch_id: "1",
    reserver_username:"Zeynep Dundar",
    reservation_date: "10 August 2022 Monday 10:00",
    price: 600,
    })
  );
  return (console.log("Pitch saved successfully!"));
 } catch (error) {
  return (console.log("Error saving", error));
 }
}

const readReservation = async () => {
  try {
    const posts = await DataStore.query(Reservation);
    console.log("Posts retrieved successfully!", JSON.stringify(posts, null, 2));
  } catch (error) {
    console.log("Error retrieving posts", error);
  }  
}

const saveMatchAnnounce = async () => {
  try {
  await DataStore.save(
    new MatchAnnounce({
    hour: "18:00",
    pitch_name: "Moda Stadyumu",
    number_of_attendees: 10,
    total_capacity: 14,
    attendees_list: ["Simay Ozdemir", "Naz Yuksek"],
    announcement_name:"YZ12"})
  );
  return (console.log("Match Announce saved successfully!"));
 } catch (error) {
  return (console.log("Error saving Match Announce", error));
 }
}

const readMatchAnnounce = async () => {
  try {
    const match_announce = await DataStore.query(MatchAnnounce);
    console.log("MatchAnnounce retrieved successfully!", JSON.stringify(match_announce, null, 2));
  } catch (error) {
    console.log("Error retrieving MatchAnnounce", error);
  }  
}

// This method pushes the current playername to the MAtch announce
// Note updating attendees_list is not complete
const addPlayerToMatchAnnounce  = async (announcement_name, player_name)  => {
   try {
    const original = await DataStore.query(MatchAnnounce, m => m.announcement_name("eq", announcement_name));
    
    // fix adding player to attendees_list 
    const attendees_list_original = original[0].attendees_list;
    console.log(typeof attendees_list_original);
    updated_list.push(player_name);
    //

    await DataStore.save(
          MatchAnnounce.copyOf(original, updated => {
          updated.attendees_list = updated_list;
      })
    );
    console.log("MatchAnnounce updated successfully!");
    // update chosen announcement
  } catch (error) {
    console.log("Error updating MatchAnnounce", error);
  }  
}

const deletePlayers = async () => {
  try {
    // realnames: "Mehmet Yilmaz", "Ahmet Yilmaz", "Yilmaz Yilmaz"
    // usernames: dummy1, dummy2, dummy3
    await DataStore.delete(Players, p => p.username("eq", "Mehmet Yilmaz"));
    console.log("Players deleted successfully!");
  } catch (error) {
    console.log("Error deleting players ", error);
  }  
}


export default App;
