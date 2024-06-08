import { addNote } from "@/utils/dbFunctions/crud";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

interface FormValues {
  title: string;
  description: string;
}

const AddNote = () => {
  const onSubmit = async () => {
    const response = await addNote(
      newNoteFormik.values.title,
      newNoteFormik.values.description
    );
    console.log("LA repuesta del crud: ", response);
  };

  const newNoteFormik = useFormik<FormValues>({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Ingrese un título"),
      description: Yup.string().required("Agruegue una descripción"),
    }),
    onSubmit,
  });

  console.log("valores formik: ", newNoteFormik.values);

  return (
    <View style={styles.mainContainer}>
      <Text> Nueva nota</Text>
      <FormikProvider value={newNoteFormik}>
        <TextInput
          style={styles.inputText}
          onChangeText={newNoteFormik.handleChange("title")}
          value={newNoteFormik.values.title}
          placeholder="Título"
        />
        <TextInput
          style={styles.inputTextArea}
          onChangeText={newNoteFormik.handleChange("description")}
          value={newNoteFormik.values.description}
          placeholder="Descripción"
          multiline
        />
        <Button title="Guardar" onPress={onSubmit} />
      </FormikProvider>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    top: 40,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  inputText: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputTextArea: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddNote;
