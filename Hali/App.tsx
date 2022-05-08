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
//import { initSchema } from "@aws-amplify/datastore";
import BottomBarNavigator from "./navigation/BottomBarNavigator";
import AdminBottomBar from "./navigation/AdminBottomBarNavigator";
import PlayerSearch from "./screens/SearchScreens/PlayerSearch";

Auth.configure(config);
Amplify.configure(config);

const App = () => {
  //saveDataStore();
  saveReservation();
  readReservation();
  //readData();
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
          <Stack.Screen
            name="BottomBar"
            component={BottomBarNavigator}
          ></Stack.Screen>
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
          <Stack.Screen
            name="PlayerSearch"
            component={PlayerSearch}
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

const saveDataStore = async () => {
  try {
    await DataStore.save(
      new Pitch2({
        pitch_name: "pitch_1",
        description: "Pitch in Sariyer",
        pitchowner_name: "Suleyman Yilmaz",
        available_slots: "Monday 11:00 - 13:00 | Tuesday 14:00 - 15:00",
        hourly_price: 650,
        opening_hour: "10:00",
        closing_hour: "24:00",
      })
    );

    return console.log("Pitch saved successfully!");
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

const saveReservation = async () => {
  try {
    await DataStore.save(
      new Reservation({
        pitch_id: "1",
        reserver_username: "Zeynep Dundar",
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
export default App;
