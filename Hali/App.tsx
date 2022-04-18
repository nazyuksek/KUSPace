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
import Amplify, { Auth } from "aws-amplify";
import config from "./src/aws-exports";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import { Image } from "react-native";
import ConfirmEmailScreen from "./screens/ConfirmEmailScreen";
import HomeScreen from "./screens/HomeScreen";
import NewPasswordScreen from "./screens/NewPasswordScreen";
//added
import { listPitches } from './src/graphql/queries';
import { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore'


// try this 

Auth.configure(config);
Amplify.configure(config);

const App = () => {

  saveDataStore();
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const Stack = createStackNavigator();
 
  if (!isLoadingComplete) {
    return (null);
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
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
          <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
          <Stack.Screen
            name="SignUpChoices"
            component={SignUpChoices}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const saveDataStore = async () => {
 try {
  await DataStore.save(
    new Pitch2({
      id: 1,
      pitch_name: "pitch_1",
      description: "Pitch in Sariyer",
      pitchowner_name: "Suleyman Yilmaz",
      available_slots:  "Monday 11:00 - 13:00 | Tuesday 14:00 - 15:00",
      hourly_price: 650,
      opening_hour: "10:00",
      closing_hour: "24:00",
      createdAt: AWSDateTime!,
      updatedAt: AWSDateTime!
    })
  );
  return (console.log("Pitch saved successfully!"));
  } catch (error) {
  return (console.log("Error saving pitch", error));

 }
}
  
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
