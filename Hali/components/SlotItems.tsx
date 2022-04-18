import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

export default function SlotItems(item: any) {
  
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "3%",
        margin: "1%",
        borderRadius: 20,
        borderBottomColor: "rgba(135, 211, 124, 1)",
        borderBottomWidth: 1,
        flex: 1,
      }}
    >
      <Text
        style={{
          color: "darkslateblue",
          fontSize: 24,
          fontWeight: "500",
        }}
      >
        {item.item}
      </Text>
    </TouchableOpacity>
  );
}
