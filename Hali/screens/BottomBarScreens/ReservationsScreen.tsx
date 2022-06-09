import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { DataStore } from "aws-amplify";
import { Pitch2, Reservation } from "../../src/models";
import FieldBar from "../../components/FieldBar";

export interface ReservationScreenProps {
  route: any;
  navigation: any;
}

const ReservationsScreen = ({ route, navigation }: ReservationScreenProps) => {
  const reserver_username = route?.params?.username;
  const pitch_username = route?.params?.pitch_username;

  const getReservations = async (data: string[]) => {
    const reservation = await DataStore.query(Reservation, (cond) =>
      cond.reservation_date("eq", reserver_username)
    );
    for (var i = 0; i < reservation.length; i++) {
      const pitch = await DataStore.query(Pitch2, (p) =>
        p.username("eq", reservation[0].pitch_id!)
      );
      data.push(
        "Reservation on: " +
          reservation[i].reservation_date! +
          " at " +
          pitch[0].pitch_name +
          "in " +
          pitch[0].district
      );
    }
  };
  const data: string[] = [];
  getReservations(data);

  const [isModalVisible, setModal] = React.useState(false);
  const [dataState, setDataState] = React.useState(data);
  const [text, setText] = React.useState("");
  React.useEffect(() => {}, [dataState]);
  let reservation_date = "";
  const cancelReservation = async () => {
    await DataStore.delete(Reservation, (p) =>
      p.reserver_username("eq", reserver_username)
    );
  };

  const handleCancelPress = () => {
    setModal(true);
  };

  const getReservationDate = async (reserver_username: string) => {
    const reservation = await DataStore.query(Reservation, (cond) =>
      cond.reservation_date("eq", reserver_username)
    );
    reservation_date = reservation[0].reservation_date!;
  };

  function handleConfirm() {
    setModal(false);
    cancelReservation();
    getReservationDate(reserver_username);
    addCancelledReservation(reservation_date);
  }
  function handleCancel() {
    setModal(false);
  }

  //ADDS THE CANCELLED SLOT FROM TO PITCH TABLE BACK
  const addCancelledReservation = async (reservation_date: string) => {
    const pitch = await DataStore.query(Pitch2, (cond) =>
      cond.username("eq", pitch_username)
    );
    let updated_slots = pitch[0].available_slots!;
    let tmp = [...updated_slots];
    tmp.push(reservation_date);
    await DataStore.save(
      Pitch2.copyOf(pitch[0], (updated) => {
        updated.available_slots = tmp;
      })
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemscontainer}>
        <FieldBar
          dataState={dataState}
          onPress={() => {
            handleCancelPress();
          }}
          setString={setText}
          icon_name={"minus-circle"}
        ></FieldBar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "darkslateblue",
    fontSize: 48,
    fontWeight: "900",
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
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

export default ReservationsScreen;
