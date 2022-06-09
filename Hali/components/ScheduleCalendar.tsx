import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import {
  Calendar,
  CalendarList,
  Agenda,
  DateData,
} from "react-native-calendars";
import { todayString } from "react-native-calendars/src/expandableCalendar/commons";

export interface CalendarProps {
  calendarStyle?: {};
  theme?: {};
  markedDates: any;
  onDayPress: { (date: DateData): void };
}
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const ScheduleCalendar = ({
  calendarStyle,
  markedDates,
  onDayPress,
}: CalendarProps) => {
  let date: Date = new Date();
  date.setDate(date.getDate() + 1);
  return (
    <View style={[styles.calendar, calendarStyle]}>
      <Calendar
        onDayPress={onDayPress}
        minDate={date.toDateString()}
        theme={{
          /*    "stylesheet.day.basic": {
            base: {
              width: "100%",
              height: height * 0.4,
            },
          }, */
          todayTextColor: "rgba(135, 211, 124, 1)",
          arrowColor: "rgba(135, 211, 124, 1)",
          calendarBackground: "white",
          textSectionTitleDisabledColor: "darkslateblue",
          dayTextColor: "darkslateblue",
          monthTextColor: "darkslateblue",
          indicatorColor: "darkslateblue",
          textDayFontFamily: "space-mono",
          textMonthFontFamily: "space-mono",
          textDayHeaderFontFamily: "space-mono",
          textDayFontWeight: "500",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "500",
          textDayFontSize: 18,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 16,
        }}
        markedDates={markedDates}
      >
        <Agenda></Agenda>
      </Calendar>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    width: "100%",

    display: "flex",
  },
});

export default ScheduleCalendar;
