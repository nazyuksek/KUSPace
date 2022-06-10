import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlayerSearch from "../screens/SearchScreens/PlayerSearch";
import PitchSearch from "../screens/SearchScreens/PitchSearch";
import EventsScreen from "../screens/EventsScreen";
import ProfileContainer from "../screens/ProfileScreenContainers/ProfileContainer";
import ReservationsScreen from "../screens/BottomBarScreens/ReservationsScreen";

export interface BottomBarProps {
  route: any;
}

const BottomBar = ({ route }: BottomBarProps) => {
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
        component={PitchSearch}
        initialParams={{ username: route?.params?.username }}
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
        component={PlayerSearch}
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
        name="Events"
        component={EventsScreen}
        initialParams={{ username: route?.params?.username }}
        options={{
          tabBarLabelStyle: {
            color: "rgba(135, 211, 124, 1)",
          },
          tabBarIcon: (Info) => {
            return (
              <MaterialIcons
                name="emoji-events"
                size={24}
                color={Info.focused ? "rgba(135, 211, 124, 1)" : "green"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        initialParams={{ username: route?.params?.username }}
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
        name="Reservations"
        component={ReservationsScreen}
        initialParams={{ username: route?.params?.username }}
        options={{
          tabBarLabelStyle: {
            color: "rgba(135, 211, 124, 1)",
          },
          tabBarIcon: (Info) => {
            return (
              <Ionicons
                name="md-calendar-sharp"
                size={24}
                color={Info.focused ? "rgba(135, 211, 124, 1)" : "green"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;
