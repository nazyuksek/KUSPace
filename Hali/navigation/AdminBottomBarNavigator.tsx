import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScheduleScreen from "../screens/AdminBottomBarScreens/ScheduleScreen";
import AdminProfileContainer from "../screens/ProfileScreenContainers/AdminProfileContainer";

export interface AdminBottomBarProps {
  route: any;
}

const AdminBottomBar = ({ route }: AdminBottomBarProps) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveBackgroundColor: "white",
        tabBarActiveBackgroundColor: "white",
      }}
    >
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        initialParams={{ username: route?.params?.username }}
        options={{
          tabBarLabelStyle: {
            color: "rgba(135, 211, 124, 1)",
          },
          tabBarIcon: (Info) => {
            return (
              <Ionicons
                name="calendar-sharp"
                size={24}
                color={Info.focused ? "rgba(135, 211, 124, 1)" : "green"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AdminProfileContainer}
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
    </Tab.Navigator>
  );
};

export default AdminBottomBar;
