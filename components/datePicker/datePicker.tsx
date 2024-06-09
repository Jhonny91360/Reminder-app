import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

enum Mode {
  TIME = "time",
  DATE = "date",
}

interface Props {
  dateProp: Date;
  setDateProp: (value: Date) => void;
}
export default function DatePickerComponent({ dateProp, setDateProp }: Props) {
  const [date, setDate] = useState(dateProp);
  const [mode, setMode] = useState<Mode>(Mode.DATE);
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    currentDate && setDate(currentDate);
    currentDate && setDateProp(currentDate);
  };

  const showMode = (currentMode: Mode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode(Mode.DATE);
  };

  const showTimepicker = () => {
    showMode(Mode.TIME);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        <View style={{ marginTop: 30 }}>
          <Button onPress={showTimepicker} title="Show time picker!" />
        </View>

        <Text
          style={{
            marginTop: 20,
            backgroundColor: "blue",
            padding: 20,
            color: "white",
            borderRadius: 10,
          }}
        >
          selected: {date.toLocaleString()}
        </Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blueviolet",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
});
