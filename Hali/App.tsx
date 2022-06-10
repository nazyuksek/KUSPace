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
import BottomBarNavigator from "./navigation/BottomBarNavigator";
import AdminBottomBar from "./navigation/AdminBottomBarNavigator";
import PlayerSearch from "./screens/SearchScreens/PlayerSearch";
import AdminSignupScreen2 from "./screens/AdminSignupScreen2";
import SignupScreen from "./screens/SignupScreen";
import ReservationScreen from "./screens/ReservationScreen";
import ReservationsScreen from "./screens/BottomBarScreens/ReservationsScreen";
import EventCreationPage from "./screens/EventCreationPage";
import EventDetails from "./screens/EventDetails";
import { readPitches } from "./store"

Auth.configure(config);
Amplify.configure(config);
const App = () => {
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

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: "white",
    },
  });


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
          <Stack.Screen
            name="Reservations"
            component={ReservationsScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Event Creation"
            component={EventCreationPage}
          ></Stack.Screen>
          <Stack.Screen
            name="Event Details"
            component={EventDetails}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
