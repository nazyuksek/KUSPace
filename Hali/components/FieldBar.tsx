import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import * as React from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { List } from "react-native-paper";
import SlotItems from "./SlotItems";

export interface FieldBarProps {
  dataState: string[];
  onPress: () => void;
  setTime: any;
}

const { width, height } = Dimensions.get("screen");
const FieldBar = ({ dataState, onPress, setTime }: FieldBarProps) => {
  return (
    <View style={style.container}>
      <FlatList
        bounces={true}
        data={dataState}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SlotItems item={item} onPress={onPress} setTime={setTime} />
        )}
        keyExtractor={(item, index) => `${index}`}
      ></FlatList>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    margin: "7%",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "rgba(135, 211, 124, 1)",
  },
});

export default FieldBar;
