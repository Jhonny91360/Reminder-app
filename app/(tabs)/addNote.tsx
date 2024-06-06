import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

interface FormValues {
  title: string;
}

const AddNote = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async () => {
    console.log("Nota creada");
  };

  const newNoteFormik = useFormik<FormValues>({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Ingrese un título"),
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
});

export default AddNote;
