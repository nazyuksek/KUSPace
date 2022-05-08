import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ScheduleCalendar from "../../components/ScheduleCalendar";
import { DateData } from "react-native-calendars";
import FieldBar from "../../components/FieldBar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataStore, Predicates } from "aws-amplify";
import { Reservation, Pitch2 } from "../../src/models";

export interface FindFieldScreenProps {
  route: any;
  pitch_id: string;
}

const FindFieldScreen = ({ route, pitch_id }: FindFieldScreenProps) => {
  const reserver_username = route?.params?.username;
  let map = new Map();
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

  //DELETES THE RESERVED AVAILABLE SLOT FROM THE PITCH TABLE
  const deleteAvailable = async (reservation_date: string) => {
    const pitch = await DataStore.query(Pitch2, (cond) =>
      cond.username("eq", pitch_id)
    );
    let updated_slots = pitch[0].available_slots!;
    const index = updated_slots.indexOf(reservation_date);
    updated_slots.splice(index, 1);
    await DataStore.save(
      Pitch2.copyOf(pitch[0], (updated) => {
        updated.available_slots = updated_slots;
      })
    );
  };

  const readD = async () => {
    try {
      const posts = await DataStore.query(Reservation);
    } catch (error) {
      console.log("Error retrieving posts", error);
    }
  };
  let slots = [
    "2022-05-25|12.00-14.00",
    "2022-05-25|14.00-16.00",
    "2022-05-23|12.00-14.00",
  ];
  //TIME SLOT EXTRACTION
  const extractTimeSlot = async () => {
    // const pitch = await DataStore.query(Pitch2, (cond) =>
    //   cond.username("eq", pitch_id)
    // );
    //  let slots = pitch[0].available_slots!;
    slots.forEach((element) => {
      addToMap(element!.split("|")[0], element!.split("|")[1]);
    });
  };
  extractTimeSlot();

  //ADD TO MAP
  const addToMap = (key: string, value: string) => {
    if (map.has(key)) {
      map.set(key, map.get(key).concat([value]));
    } else {
      map.set(key, [value]);
    }
  };

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
    setDataState(map.get(date));
  }

  function handleReservePress() {
    reservation_date = marked.concat("|").concat(time);
    saveReservation(pitch_id, reserver_username, reservation_date);
    deleteAvailable(reservation_date);
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
