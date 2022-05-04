import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';

function CalendarView({markedDates, selectedDate, onSelectDate}) {
  const markedSelectedDate = {
      ...markedDates,
      [selectedDate]: {
          selected: true,
          marked: markedDates[selectedDate]?.marked,
      }
  }

  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDate}
      onDayPress={(day) => {
        onSelectDate(day.dateString);
      }}
      theme={{
        selectedDayBackgroundColor: '#FF7C44',
        arrowColor: '#FF7C44',
        dotColor: '#FF7C44',
        todayTextColor: '#FF7C44',
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarView;