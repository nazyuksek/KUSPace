import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as React from "react";

export interface ButtonProps {
  onPress: any;
  buttonText: string;
  style?: any;
}

const Button = ({ onPress, buttonText, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttontext}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttontext: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Button;
