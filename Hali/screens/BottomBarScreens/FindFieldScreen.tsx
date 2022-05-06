import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ScheduleCalendar from "../../components/ScheduleCalendar";
import { DateData } from "react-native-calendars";
import FieldBar from "../../components/FieldBar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataStore } from "aws-amplify";
import { Reservation } from "../../src/models";

export interface FindFieldScreenProps {
  route: any;
}

const FindFieldScreen = ({ route }: FindFieldScreenProps) => {
  const reserver_username = route?.params?.username;
  const [time, setTime] = React.useState("");
  React.useEffect(() => {}, [time]);

  const saveReservation = async (
    pitch_id: string,
    reserver_username: string,
    reservation_date: string
  ) => {
    try {
      await DataStore.save(
        new Reservation({
          pitch_id: pitch_id,
          reserver_username: reserver_username,
          reservation_date: reservation_date,
        })
      );

      return console.log("Reservation saved successfully!");
    } catch (error) {
      return console.log("Error saving", error);
    }
  };

  const readD = async () => {
    try {
      const posts = await DataStore.query(Reservation);
      console.log(
        "Posts retrieved successfully!",
        JSON.stringify(posts, null, 2)
      );
    } catch (error) {
      console.log("Error retrieving posts", error);
    }
  };
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
  let reservation_date = "";
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

  function handleReservePress() {
    reservation_date = marked.concat(" ").concat(time);
    saveReservation("123", reserver_username, reservation_date);
    readD();
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
        <FieldBar
          dataState={dataState}
          onPress={() => {
            handleReservePress();
          }}
          setTime={setTime}
        ></FieldBar>
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
