import { View, Text, StyleSheet, Modal, SafeAreaView } from "react-native";
import React from "react";
import ScheduleCalendar from "../components/ScheduleCalendar";
import { DateData } from "react-native-calendars";
import FieldBar from "../components/FieldBar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataStore, Predicates } from "aws-amplify";
import { Reservation, Pitch2 } from "../src/models";
import SimpleModal from "../components/SimpleModal";

export interface ReservationScreenProps {
  route: any;
  navigation: any;
}

const ReservationScreen = ({ navigation, route }: ReservationScreenProps) => {
  const reserver_username = route?.params?.username;
  const pitch_username = route?.params?.pitch_username;
  const [isModalVisible, setModal] = React.useState(false);

  //TIME SLOT EXTRACTION
  const extractTimeSlot = async () => {
    const pitch = await DataStore.query(Pitch2, (cond) =>
      cond.username("eq", pitch_username)
    );
    if (pitch[0].available_slots === undefined) {
      return;
    }
    let slots = pitch[0].available_slots!;
    slots.forEach((element) => {
      addToMap(element!.split("|")[0], element!.split("|")[1]);
    });
  };

  //ADD TO MAP
  const addToMap = (key: string, value: string) => {
    if (map.has(key)) {
      map.set(key, map.get(key).concat([value]));
    } else {
      map.set(key, [value]);
    }
  };

  extractTimeSlot();
  let map = new Map();
  const [time, setTime] = React.useState("");
  const emptyData: string[] = [];
  const [marked, setMarked] = React.useState("");
  const [date, setDate] = React.useState("");
  let reservation_date = "";
  const [dataState, setDataState] = React.useState(emptyData);
  React.useEffect(() => {}, [time]);
  React.useEffect(() => {}, [dataState]);
  let reservation_text =
    "You are reserving a pitch on " + marked + " at " + time;

  async function handleConfirm() {
    setModal(false);
    reservation_date = marked.concat("|").concat(time);
    saveReservation(pitch_username, reserver_username, reservation_date);
    const b = await deleteAvailable(reservation_date);
    const a = await extractTimeSlot();
    setDataState(map.get(date));
  }

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
      cond.username("eq", pitch_username)
    );
    let updated_slots = pitch[0].available_slots!;
    const index = updated_slots.indexOf(reservation_date);
    let tmp = [...updated_slots];
    tmp.splice(index, 1);
    await DataStore.save(
      Pitch2.copyOf(pitch[0], (updated) => {
        updated.available_slots = tmp;
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

  function handleCancel() {
    setModal(false);
  }

  function handleDayPress(date: string): void {
    if (date === marked) {
      setMarked("");
      setDataState(emptyData);
      return;
    }
    setMarked(date);
    setDate(date);
    setDataState(map.get(date));
  }

  function handleReservePress() {
    setModal(true);
  }
  return (
    <SafeAreaView style={styles.container}>
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
        <Modal
          style={{}}
          visible={isModalVisible}
          animationType={"fade"}
          transparent={true}
          onRequestClose={() => {
            setModal(false);
          }}
        >
          <SimpleModal
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            Headertext={"Schedule Confirmation"}
            text={reservation_text}
          ></SimpleModal>
        </Modal>
      </View>
    </SafeAreaView>
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

export default ReservationScreen;
