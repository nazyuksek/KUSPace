import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SlotItemsProps {
  setTime: any;
  item: any;
  onPress: () => void;
}

export default function SlotItems({ item, setTime, onPress }: SlotItemsProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: "3%",
        margin: "1%",
        borderRadius: 20,
        borderBottomColor: "rgba(135, 211, 124, 1)",
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          width: "50%",
          marginLeft: "25%",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            color: "darkslateblue",
            fontSize: 22,
            fontWeight: "500",
            alignSelf: "center",
          }}
        >
          {item}
        </Text>
      </View>
      <View
        style={{
          width: "25%",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            onPress();
            setTime(item);
          }}
        >
          <MaterialCommunityIcons
            style={{ justifyContent: "center", alignItems: "center" }}
            name="plus-circle"
            size={32}
            color="rgba(135, 211, 124, 1)"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
