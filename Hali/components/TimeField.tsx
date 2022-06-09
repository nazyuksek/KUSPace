import React, { useEffect, useState } from "react";
import { TextInput, TextStyle, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useDebounce from "../hooks/useDebounce";

export interface TimeFieldProps {
  style: any;
  onTimeValueReady: Function;
  givenTime: string;
}
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const TimeField = ({ givenTime, onTimeValueReady, style }: TimeFieldProps) => {
  const [time, setTime] = useState<string>("");
  const {
    state: debouncedTime,
    setDebouncedState: setDebouncedTime,
    debounce,
  } = useDebounce(time, 250);

  function validate(value: string) {
    let regex = new RegExp("([01][0-9]):[0-5][0-9]$");
    let regex2 = new RegExp("([2][0-3]):[0-5][0-9]$");
    return (
      (value.length ? regex.test(value) : true) ||
      (value.length ? regex2.test(value) : true)
    );
  }

  useEffect(() => {
    if (!givenTime) return;
    setTime(givenTime);
  }, [givenTime, setTime]);

  useEffect((): void => {
    onTimeValueReady(validate(debouncedTime), debouncedTime);
  }, [debouncedTime, onTimeValueReady]);

  useEffect((): (() => void) => {
    setDebouncedTime(time);

    return () => {
      debounce.cancel();
    };
  }, [debounce, time, setDebouncedTime]);

  return (
    <TextInput
      keyboardType="number-pad"
      maxLength={5}
      onChangeText={(text: string) => setTime(text)}
      placeholder="00:00"
      value={time}
      style={styles.input}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    alignSelf: "center",
    marginLeft: 8,
    width: width * 0.15,
    height: height * 0.05,
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: "rgba(135, 211, 124, 1)",
    borderColor: "rgba(135, 211, 124, 1)",
    alignItems: "center",
    textAlign: "center",
    fontSize: 16,
    color: "white",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default TimeField;
