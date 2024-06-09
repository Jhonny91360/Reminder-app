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
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={showDatepicker}
            title="Seleccionar fecha"
            color={"blueviolet"}
          />

          <Button
            onPress={showTimepicker}
            title="Seleccionar hora"
            color={"blueviolet"}
          />
        </View>

        <Text
          style={{
            backgroundColor: "blueviolet",
            padding: 20,
            color: "white",
            borderRadius: 10,
          }}
        >
          Fecha seleccionada: {date.toLocaleString()}
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
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    paddingHorizontal: 90,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});
