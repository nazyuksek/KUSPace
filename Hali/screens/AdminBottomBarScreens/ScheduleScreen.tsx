import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  Alert,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScheduleCalendar from "../../components/ScheduleCalendar";
import { DateData } from "react-native-calendars";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import SimpleModal from "../../components/SimpleModal";
import { Pitch2 } from "../../src/models";
import { DataStore, Predicates } from "aws-amplify";
import { Reservation } from "../../src/models";

export interface ScheduleScreenProps {
  navigation: any;
  date: DateData;
  route: any;
}
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ScheduleScreen = ({ route, navigation }: ScheduleScreenProps) => {
  const username = route?.params.username;
  const [selected, setSelected] = React.useState("");
  const [time, setTime] = React.useState(new Date());
  const [isModalVisible, setModal] = React.useState(false);

  let schedule: string = // string to write on the modal
    "You are creating a slot on " +
    selected +
    " from " +
    time.getHours() +
    ":" +
    (time.getMinutes() === 0 ? "00" : time.getMinutes()) +
    " to " +
    (time.getHours() + 2) +
    ":" +
    (time.getMinutes() === 0 ? "00" : time.getMinutes());

  let schedule_slot: string = //string to write to the database
    selected +
    "|" +
    time.getHours() +
    ":" +
    (time.getMinutes() === 0 ? "00" : time.getMinutes()) +
    " to " +
    (time.getHours() + 2) +
    ":" +
    (time.getMinutes() === 0 ? "00" : time.getMinutes());

  // SAVE SCHEDULE TO DATABASE
  const saveSchedule = async (
    pitch_name: string,
    description: string,
    pitchowner_name: string,
    available_slots: [string],
    hourly_price: number,
    opening_hour: string,
    closing_hour: string
  ) => {
    try {
      await DataStore.save(
        new Pitch2({
          pitch_name: pitch_name,
          description: description,
          pitchowner_name: pitchowner_name,
          available_slots: available_slots,
          hourly_price: hourly_price,
          opening_hour: opening_hour,
          closing_hour: closing_hour,
          username: "alp",
        })
      );
      return console.log("Pitch saved successfully!");
    } catch (error) {
      return console.log("Error saving", error);
    }
  };

  const readSchedule = async () => {
    try {
      let pitch = await DataStore.query(Pitch2);
    } catch (error) {
      console.log("Error retrieving data", error);
    }
  };
  const deleteWholeTableEntries = async () => {
    await DataStore.delete(Pitch2, Predicates.ALL);
  };

  async function handleConfirm() {
    setModal(false);
    const pitch = await DataStore.query(Pitch2, (cond) =>
      cond.username("eq", "alp")
    );
    let updated_slots = pitch[0].available_slots!;
    updated_slots = updated_slots.concat([schedule_slot]);
    await DataStore.save(
      Pitch2.copyOf(pitch[0], (updated) => {
        updated.available_slots = updated_slots;
      })
    );
  }

  //DELETE A SPECIFIC SCHEDULE
  const handleDeleteSchedule = async (reservation_date: string) => {
    await DataStore.delete(Reservation, (cond) =>
      cond.reservation_date("eq", reservation_date)
    );
  };

  function handleCancel() {
    setModal(false);
  }
  function handleDayPress(day: string) {
    if (day === selected) {
      setSelected("");
      return;
    }
    setSelected(day);
  }
  function handleTimeChange(
    event: DateTimePickerEvent,
    selecteddate: Date | undefined
  ) {
    const currentlySelected = selecteddate! || time;
    setTime(currentlySelected);
  }

  function handleCreatePressed() {
    if (selected === "") {
      Alert.alert("Date cannot be empty! Select a date");
      return;
    }
    setModal(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemscontainer}>
        <View style={{ width: "100%", alignItems: "center", height: 300 }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              color: "rgba(135, 211, 124, 1)",
              fontWeight: "700",
            }}
          >
            Select Start Date and Time
          </Text>
          <ScheduleCalendar
            onDayPress={(date) => {
              handleDayPress(date.dateString);
            }}
            markedDates={{
              [selected]: {
                marked: true,
                selected: true,
                selectedColor: "rgba(135, 211, 124, 1)",
                selectedTextColor: "white",
              },
            }}
          ></ScheduleCalendar>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 50 }}>
          <DateTimePicker
            textColor="darkslateblue"
            style={{
              width: "95%",
              height: 250,
            }}
            value={time}
            mode={"time"}
            onChange={(event, date) => handleTimeChange(event, date)}
            display={"spinner"}
            minuteInterval={30}
          ></DateTimePicker>
        </View>
        <View
          style={{
            width: "95%",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <Button
            style={styles.button}
            textStyle={styles.buttontext}
            onPress={() => handleCreatePressed()}
            buttonText={"+"}
          ></Button>
        </View>
        <Modal
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
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
            text={schedule}
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
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  subtext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  button: {
    alignSelf: "flex-end",
    marginBottom: 10,
    backgroundColor: "rgba(135, 211, 124, 1)",
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  buttontext: {
    color: "darkslateblue",
    fontSize: 48,
    fontWeight: "500",
  },
});

export default ScheduleScreen;
