import { View, Text, StyleSheet, SafeAreaView, Modal } from "react-native";
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

export interface ScheduleScreenProps {
  navigation: any;
  date: DateData;
}

const ScheduleScreen = ({ navigation }: ScheduleScreenProps) => {
  const [selected, setSelected] = React.useState("");
  const [time, setTime] = React.useState(new Date());
  const [isModalVisible, setModal] = React.useState(false);
  let schedule: string =
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

  function handleConfirm() {
    setModal(false);
    //store the information
  }
  function handleCancel() {
    setModal(false);
  }
  function handleDayPress(day: string) {
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
    setModal(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemscontainer}>
        <Text
          style={{
            marginTop: 15,
            color: "rgba(135, 211, 124, 1)",
            fontWeight: "900",
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
        <DateTimePicker
          style={{ width: 100, height: 100 }}
          value={time}
          mode={"time"}
          onChange={(event, date) => handleTimeChange(event, date)}
          display={"clock"}
          is24Hour={true} //android only
          minuteInterval={30}
        ></DateTimePicker>
        <Button
          style={styles.button}
          textStyle={styles.buttontext}
          onPress={() => handleCreatePressed()}
          buttonText={"+"}
        ></Button>
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
    flex: 1, //takes up the entire free space
    backgroundColor: "white",
  },
  itemscontainer: {
    display: "flex",
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
    marginTop: 220,
    marginRight: 10,
    backgroundColor: "rgba(135, 211, 124, 1)",
    width: 75,
    height: 75,
    display: "flex",
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
