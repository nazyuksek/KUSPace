import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import LandingPage from "./screens/LandingPage";
import { ScreenStack } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUpChoices from "./screens/SignUpChoices";
import AdminSignupScreen from "./screens/AdminSignupScreen";
import AdminLoginScreen from "./screens/AdminLoginScreen";
import Amplify, { Auth } from "aws-amplify";
import config from "./aws-exports";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

Auth.configure(config);

Amplify.configure(config);

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
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

export default App;
