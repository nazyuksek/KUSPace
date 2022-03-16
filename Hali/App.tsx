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
import AdminLoginScreen from "./screens/AdminLoginScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: "",
            headerShown: true,
            headerTransparent: true,
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name={"LandingPage"}
            component={LandingPage}
          ></Stack.Screen>
          <Stack.Screen
            name={"AdminLogin"}
            component={AdminLoginScreen}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
