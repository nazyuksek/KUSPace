import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { registerRootComponent } from "expo";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import LandingPage from "./screens/LandingPage";
import { ScreenStack } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUpChoices from "./screens/SignUpChoices";
import AdminLoginScreen from "./screens/AdminLoginScreen";
import AdminSignupScreen from "./screens/AdminSignupScreen";

import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

import { withAuthenticator } from 'aws-amplify-react-native';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen
      //       name="LandingPage"
      //       component={LandingPage}
      //     />
      //   </Stack.Navigator>
      // </NavigationContainer>
      // <SignUpChoices></SignUpChoices>

      <AdminLoginScreen></AdminLoginScreen>
      //   <AdminSignupScreen></AdminSignupScreen>
    );
  }
}
export default withAuthenticator(App);