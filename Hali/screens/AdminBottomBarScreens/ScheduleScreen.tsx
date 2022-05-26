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
import FieldBar from "../../components/FieldBar";
import TimeField from "../../components/TimeField";

export interface ScheduleScreenProps {
  navigation: any;
  date: DateData;
  route: any;
}
const width = Dimensions.get("screen").width;
const height = Dimensions.get("window").height;

const ScheduleScreen = ({ route, navigation }: ScheduleScreenProps) => {
  const username = route?.params.username;
  const [selected, setSelected] = React.useState("");
  const [time, setTime] = React.useState<string>("");
  const [validTime, setValidTime] = React.useState<boolean>(true);
  const [validTime2, setValidTime2] = React.useState<boolean>(true);
  const [time2, setTime2] = React.useState<string>("");
  const [isModalVisible, setModal] = React.useState(false);
  const [componentErrorText, setComponentErrorText] = React.useState<string>(
    "Enter a valid time!"
  );
  var isErrorTextVisible = true;
  const handleTimeValueReady = (isValid: boolean, updated: string): void => {
    setTime(updated);
    setValidTime(isValid);
  };
  let map = new Map();
  //TIME SLOT EXTRACTION
  const extractTimeSlot = async () => {
    const pitch = await DataStore.query(Pitch2, (cond) =>
      cond.username("eq", username)
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
  function checkSlotAvailability(startTime: Number, finishTime: Number) {
    var isavailable = true;
    let scheduled_slots = map.get(selected);
    if (scheduled_slots !== undefined) {
      scheduled_slots.forEach((x: string) => {
        let number1 = x.split(" ")[0];
        let number2 = x.split(" ")[1];
        let num1 = Number(number1.replace(":", ""));
        let num2 = Number(number2.replace(":", ""));
        if (
          (startTime > num1 && startTime < num2) ||
          (finishTime > num1 && finishTime < num2)
        ) {
          //if range is full slot will not be available
          isavailable = false;
        }
      });
    }
    return isavailable;
  }

  const handleTimeValueReady2 = (isValid: boolean, updated: string): void => {
    setTime2(updated);
    setValidTime2(isValid);
  };
  let schedule: string =
    "You are creating a slot on " + // string to write on the modal
    selected +
    " from " +
    time +
    " to " +
    time2;

  let schedule_slot: string = selected + "|" + time + " " + time2; //string to write to the database

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
          username: username,
        })
      );
      return console.log("Pitch saved successfully!");
    } catch (error) {
      return console.log("Error saving", error);
    }
  };

  const deleteWholeSchedule = async () => {
    const pitch = await DataStore.query(Pitch2, (cond) =>
      cond.username("eq", username)
    );
    await DataStore.save(
      Pitch2.copyOf(pitch[0], (updated) => {
        updated.available_slots = [];
      })
    );
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

  async function deleteAvailableSlots() {
    const original = await DataStore.query(Pitch2, (cond) =>
      cond.username("eq", username)
    );
    let updated_slots = original[0].available_slots!;

    await DataStore.save(
      Pitch2.copyOf(original[0], (updated) => {
        updated.available_slots = [];
      })
    );
  }

  async function handleConfirm() {
    setModal(false);
    const pitch = await DataStore.query(Pitch2, (cond) =>
      cond.username("eq", username)
    );
    let updated_slots: any;
    if (pitch[0].available_slots === undefined) {
      updated_slots = [schedule_slot];
    } else {
      updated_slots = pitch[0].available_slots!;
      updated_slots = updated_slots.concat([schedule_slot]);
    }
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

  function handleCreatePressed() {
    if (selected === "") {
      Alert.alert("Date cannot be empty! Select a date");
      return;
    }
    if (
      !checkSlotAvailability(
        Number(time.replace(":", "")),
        Number(time2.replace(":", ""))
      )
    ) {
      Alert.alert(
        "The slot you chose is already scheduled! Choose another slot"
      );
      return;
    } else {
      setModal(true);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemscontainer}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            height: 300,
          }}
        >
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
          <View style={styles.timeField}>
            <Text style={styles.subtext}>Please enter start time:</Text>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TimeField
                style={{}}
                onTimeValueReady={handleTimeValueReady}
                givenTime={time}
              ></TimeField>
              {isErrorTextVisible && (
                <Text style={styles.errorText}>
                  {validTime ? "" : componentErrorText}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.timeField}>
            <Text style={styles.subtext}>Please enter finish time:</Text>
            <View style={styles.errorText}>
              <TimeField
                style={{}}
                onTimeValueReady={handleTimeValueReady2}
                givenTime={time2}
              ></TimeField>
              {isErrorTextVisible && (
                <Text style={styles.errorText}>
                  {validTime2 ? "" : componentErrorText}
                </Text>
              )}
            </View>
          </View>
          <Button
            onPress={handleCreatePressed}
            buttonText={"+"}
            textStyle={{ fontSize: 48, color: "white" }}
            style={styles.button}
          ></Button>

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
              text={schedule}
            ></SimpleModal>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  itemscontainer: {
    display: "flex",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 48,
    fontWeight: "900",
  },
  errorText: {
    marginTop: 8,
    textAlign: "center",
    color: "red",
    fontSize: 12,
    fontWeight: "700",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  subtext: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "darkslateblue",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  button: {
    backgroundColor: "rgba(135, 211, 124, 1)",
    width: 80,
    height: 80,
    alignItems: "center",
    marginRight: 10,
    alignSelf: "flex-end",
    marginTop: height * 0.14,
    justifyContent: "center",
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  timeField: {
    marginTop: 15,
    marginLeft: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default ScheduleScreen;
