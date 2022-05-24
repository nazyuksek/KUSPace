import React, { useEffect, useState } from "react";
import { TextInput, TextStyle, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useDebounce from "../hooks/useDebounce";

export interface TimeFieldProps {
  style: any;
  onTimeValueReady: Function;
  givenTime: string;
}

const TimeField = ({ givenTime, onTimeValueReady, style }: TimeFieldProps) => {
  const [time, setTime] = useState<string>("");
  const {
    state: debouncedTime,
    setDebouncedState: setDebouncedTime,
    debounce,
  } = useDebounce(time, 250);

  function validate(value: string) {
    let regex = new RegExp("^(0?[1-9]|1[012]):[0-5][0-9]$");
    return value.length ? regex.test(value) : true;
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
    marginLeft: 10,
    width: 100,
    height: 50,
    borderRadius: 15,
    borderWidth: 3,
    backgroundColor: "rgba(135, 211, 124, 1)",
    borderColor: "rgba(135, 211, 124, 1)",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
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
