import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ScheduleCalendar from "../../components/ScheduleCalendar";
import { DateData } from "react-native-calendars";
import FieldBar from "../../components/FieldBar";

export interface FindFieldScreenProps {}

const FindFieldScreen = ({}: FindFieldScreenProps) => {
  const timeSlots = [
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
  ];

  const emptyData: string[] = [];
  const [marked, setMarked] = React.useState("");

  const [dataState, setDataState] = React.useState(emptyData);

  function handleDayPress(date: string): void {
    if (date === marked) {
      setMarked("");
      setDataState(emptyData);
      return;
    }
    setMarked(date);
    setDataState(timeSlots);
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemscontainer}>
        <ScheduleCalendar
          markedDates={{
            [marked]: {
              marked: true,
              selected: true,
              selectedColor: "rgba(135, 211, 124, 1)",
              selectedTextColor: "white",
            },
          }}
          onDayPress={(date) => handleDayPress(date.dateString)}
        ></ScheduleCalendar>
        <FieldBar dataState={dataState}></FieldBar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 48,
    fontWeight: "900",
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
  itemscontainer: {
    display: "flex",
    alignItems: "center",
  },
  subtext: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 20,
  },
});

export default FindFieldScreen;
