import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Button from "./Button";

export interface SimpleModalProps {
  Headertext: string;
  text: string;
  handleConfirm?: any;
  handleCancel?: any;
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const height_modal = 150;

const SimpleModal = ({
  Headertext,
  text,
  handleCancel,
  handleConfirm,
}: SimpleModalProps) => {
  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text style={styles.text}>{Headertext}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={[styles.text, { color: "rgba(135, 211, 124, 1)" }]}>
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={[styles.text, { color: "rgba(135, 211, 124, 1)" }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    borderRadius: 10,
    shadowColor: "mintcream",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    height: height_modal,
    width: width - 80,
    paddingTop: 10,
    backgroundColor: "mintcream",
  },
  textView: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "darkslateblue",
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    padding: "3%",
    borderRadius: 10,
    shadowColor: "rgba(135, 211, 124, 1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default SimpleModal;
