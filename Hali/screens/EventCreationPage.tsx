import {
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import ScheduleCalendar from "../components/ScheduleCalendar";
import { DateData } from "react-native-calendars";
import FieldBar from "../components/FieldBar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataStore, Predicates } from "aws-amplify";
import { Reservation, Pitch2 } from "../src/models";
import SimpleModal from "../components/SimpleModal";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { MatchAnnounce } from "../src/models";

export interface EventCreationPageProps {
  route: any;
  navigation: any;
}

const EventCreationPage = ({ navigation, route }: EventCreationPageProps) => {
  // const hour = route?.params?.reservation_date;
  // const pitch_name = route?.params?.pitch_name;
  const [attendees, setAttendees] = React.useState("");
  const [capacity, setCapacity] = React.useState("");
  const [name, setName] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [isModalVisible, setModal] = React.useState(false);
  const hour = "12:00-14:00";
  const pitch_name = "Simay Spor Tesisleri";
  function handleConfirm() {
    setModal(false);
    saveEvent(hour, pitch_name, parseInt(attendees), parseInt(capacity), name);
    navigation.navigate("Events");
  }
  function handleCancel() {
    setModal(false);
  }

  const saveEvent = async (
    hour: string,
    pitch_name: string,
    number_of_attendees: number,
    total_capacity: number,
    announcement_name: string
  ) => {
    try {
      await DataStore.save(
        new MatchAnnounce({
          hour: hour,
          pitch_name: pitch_name,
          number_of_attendees: number_of_attendees,
          attendees_list: [],
          total_capacity: total_capacity,
          announcement_name: announcement_name,
        })
      );
      return console.log("Event saved successfully!");
    } catch (error) {
      return console.log("Error saving", error);
    }
  };

  const eventRead = () => {
    
  }
  const onEventCreatePressed = () => {
    setModal(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundimage}
        source={require("../assets/images/football.jpeg")}
      />
      <View style={styles.itemscontainer}>
        <Text style={styles.text}>CREATE AN EVENT!</Text>
        <Text style={styles.subtext}>
          Please fill in the details about your event
        </Text>
        <TextField
          text={"Number of Attendees"}
          style={{ marginTop: 15 }}
          textState={attendees}
          setText={setAttendees}
          setSearch={setSearch}
          value={attendees}
        ></TextField>
        <TextField
          text={"Total Capacity"}
          style={{ marginTop: 15 }}
          textState={capacity}
          setText={setCapacity}
          setSearch={setSearch}
          value={capacity}
        ></TextField>
        <TextField
          text={"Name"}
          style={{ marginTop: 15 }}
          textState={name}
          setText={setName}
          setSearch={setSearch}
          value={name}
        ></TextField>
        <Button
          style={{
            backgroundColor: "white",
            marginTop: 30,
          }}
          buttonText="Create Event"
          onPress={() => onEventCreatePressed()}
        />
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
            Headertext={"Event Confirmation"}
            text={"Do you want to create this event?"}
          ></SimpleModal>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundimage: {
    flex: 1,
    position: "absolute",
    display: "flex",
    alignSelf: "center",
    width: "100%",
    height: "120%",
    opacity: 0.05,
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "rgba(135, 211, 124, 1)",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "900",
  },
  itemscontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

export default EventCreationPage;
