import { View, Text, StyleSheet, Modal, Image } from "react-native";
import React from "react";
import { DataStore } from "aws-amplify";
import { Pitch2, Reservation } from "../../src/models";
import FieldBar from "../../components/FieldBar";
import SimpleModal from "../../components/SimpleModal";

export interface ReservationScreenProps {
  route: any;
  navigation: any;
}
const ReservationsScreen = ({ route, navigation }: ReservationScreenProps) => {
  const reserver_username = route?.params?.username;
  let empty_map = new Map();
  const emptyData: string[] = [];
  const [isModalVisible, setModal] = React.useState(false);
  const [map, setMap] = React.useState(empty_map);
  const [dataState, setDataState] = React.useState(emptyData);
  const [text, setText] = React.useState("");

  const cancelReservation = async (id: string) => {
    await DataStore.delete(Reservation, (p) => p.id("eq", id));
    getReservations();
  };

  const handleCancelPress = () => {
    setModal(true);
  };

  //ADDS THE CANCELLED SLOT FROM TO PITCH TABLE BACK
  const addCancelledReservation = async (id: string) => {
    const reservation_cancelled = await DataStore.query(Reservation, (p) =>
      p.id("eq", id)
    );
    const pitch = await DataStore.query(Pitch2, (cond) =>
      cond.username("eq", reservation_cancelled[0].pitch_id!)
    );
    let reservation_date = reservation_cancelled[0].reservation_date!;
    let updated_slots = pitch[0].available_slots!;
    let tmp = [...updated_slots];
    tmp.push(reservation_date);
    await DataStore.save(
      Pitch2.copyOf(pitch[0], (updated) => {
        updated.available_slots = tmp;
      })
    );
  };

  const getReservations = async () => {
    let data: string[] = [];
    const reservation = await DataStore.query(Reservation, (cond) =>
      cond.reserver_username("eq", reserver_username)
    );
    for (var i = 0; i < reservation.length; i++) {
      const pitch = await DataStore.query(Pitch2, (p) =>
        p.username("eq", reservation[i].pitch_id!)
      );

      let dataString: string =
        reservation[i].reservation_date!.split("|")[0] +
        "\n" +
        reservation[i].reservation_date!.split("|")[1] +
        "\nat " +
        pitch[0].pitch_name +
        "\nin " +
        pitch[0].district;
      map.set(dataString, reservation[i].id);
      data.push(dataString);
    }
    setMap(map);
    setDataState(data);
  };
  getReservations();

  async function handleConfirm() {
    setModal(false);
    addCancelledReservation(map.get(text));
    cancelReservation(map.get(text));
  }

  function handleCancel() {
    setModal(false);
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundimage}
        source={require("../../assets/images/football.jpeg")}
      />
      <View style={styles.itemscontainer}>
        <FieldBar
          dataState={dataState}
          onPress={() => {
            handleCancelPress();
          }}
          setString={setText}
          icon_name={"minus-circle"}
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
            Headertext={"Reservation Cancel"}
            text={"Do you want to cancel your reservation?"}
          ></SimpleModal>
        </Modal>
      </View>
    </View>
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
  text: {
    color: "darkslateblue",
    fontSize: 48,
    fontWeight: "900",
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "rgba(135, 211, 124, 1)",
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
