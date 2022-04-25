import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SlotItems(item: any) {
  return (
    <View
      style={{
        justifyContent: "flex-start",
        flexDirection: "row",
        flex: 1,
        padding: "3%",
        margin: "1%",
        borderRadius: 20,
        borderBottomColor: "rgba(135, 211, 124, 1)",
        borderBottomWidth: 1,
      }}
    >
      <MaterialCommunityIcons
        style={{ justifyContent: "flex-end" }}
        name="plus-circle"
        size={24}
        color="rgba(135, 211, 124, 1)"
      />
      <Text
        style={{
          color: "darkslateblue",
          fontSize: 18,
          fontWeight: "500",
          alignSelf: "center",
        }}
      >
        {item.item}
      </Text>
    </View>
  );
}
