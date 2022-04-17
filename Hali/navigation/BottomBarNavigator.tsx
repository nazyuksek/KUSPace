import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SettingsScreen from "../screens/BottomBarScreens/SettingsScreen";
import FindPlayerScreen from "../screens/BottomBarScreens/FindPlayerScreen";
import FindFieldScreen from "../screens/BottomBarScreens/FindFieldScreen";
import ProfileScreen from "../screens/BottomBarScreens/ProfileScreen";

export default function BottomBar() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveBackgroundColor: "white",
        tabBarActiveBackgroundColor: "white",
      }}
    >
      <Tab.Screen
        name="Find Field"
        component={FindFieldScreen}
        options={{
          tabBarLabelStyle: {
            color: "rgba(135, 211, 124, 1)",
          },
          tabBarIcon: (Info) => {
            return (
              <MaterialCommunityIcons
                name="soccer-field"
                size={24}
                color={Info.focused ? "rgba(135, 211, 124, 1)" : "green"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Find Player"
        component={FindPlayerScreen}
        options={{
          tabBarLabelStyle: {
            color: "rgba(135, 211, 124, 1)",
          },
          tabBarIcon: (Info) => {
            return (
              <Ionicons
                name="football-outline"
                size={24}
                color={Info.focused ? "rgba(135, 211, 124, 1)" : "green"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabelStyle: {
            color: "rgba(135, 211, 124, 1)",
          },
          tabBarIcon: (Info) => {
            return (
              <Ionicons
                name="md-person"
                size={24}
                color={Info.focused ? "rgba(135, 211, 124, 1)" : "green"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabelStyle: {
            color: "rgba(135, 211, 124, 1)",
          },
          tabBarIcon: (Info) => {
            return (
              <Ionicons
                name="settings-sharp"
                size={24}
                color={Info.focused ? "rgba(135, 211, 124, 1)" : "green"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
