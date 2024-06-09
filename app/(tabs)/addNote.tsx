import { addNote } from "@/utils/dbFunctions/crud";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import DatePickerComponent from "@/components/datePicker/datePicker";

// Configuración inicial de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface FormValues {
  title: string;
  description: string;
}

const AddNote = () => {
  const [key, setKey] = useState(0);
  const [date, setDate] = useState(new Date());

  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  const clearFields = useCallback(() => {
    formik.resetForm();
    setKey((prevKey) => prevKey + 1);
  }, [formik]);

  const onSubmit = useCallback(async () => {
    try {
      await formik.validateForm();
      await formik.submitForm();

      // Añadir nota a la base de datos
      const response = await addNote(
        formik.values.title,
        formik.values.description
      );
      console.log("Respuesta del CRUD: ", response);

      // Programar notificación
      schedulePushNotification(
        date,
        formik.values.title,
        formik.values.description
      );

      // Limpiar campos
      clearFields();

      // Navegar a la pantalla de notas (debes manejar la navegación según tu stack de navegación)
      // router.push("/notes");

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Error de validación", error.message);
      } else {
        console.error("Error al enviar el formulario", error);
        Alert.alert("Error", "Ocurrió un error al enviar el formulario");
      }
    }
  }, [formik, clearFields, date]);

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Ingrese un título"),
      description: Yup.string().required("Agregue una descripción"),
    }),
    onSubmit: () => {}, // onSubmit se maneja en el método onSubmit() definido arriba
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    // Obtener canales de notificación en Android
    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        value && setChannels(value)
      );
    }

    // Manejar notificaciones recibidas
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // Manejar respuesta a notificaciones
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    // Limpiar suscripciones
    return () => {
      notificationListener.current && notificationListener.current.remove();
      responseListener.current && responseListener.current.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nueva nota</Text>
      <FormikProvider value={formik}>
        <TextInput
          style={styles.input}
          onChangeText={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          value={formik.values.title}
          placeholder="Título"
        />
        {formik.touched.title && formik.errors.title &&
          <Text style={styles.errorText}>{formik.errors.title}</Text>
        }
        <TextInput
          style={[styles.input, styles.multiline]}
          onChangeText={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          placeholder="Descripción"
          multiline
        />
        {formik.touched.description && formik.errors.description &&
          <Text style={styles.errorText}>{formik.errors.description}</Text>
        }
        <View style={styles.datePickerContainer}>
          <DatePickerComponent
            dateProp={date}
            setDateProp={(value: Date) => setDate(value)}
          />
        </View>
        <Button title="Guardar" onPress={onSubmit} />
      </FormikProvider>
    </View>
  );
};

async function schedulePushNotification(
  dateValue: Date,
  title: string,
  description: string
) {
  console.log("Fecha escogida: ", dateValue.toString());
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: description,
      data: { data: "goes here", test: { test1: "more data" } },
    },
    trigger: { date: dateValue },
  });
}

async function registerForPushNotificationsAsync() {
  let token = "";

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Permission to receive notifications was not granted");
    return token;
  }

  try {
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

    if (!projectId) {
      throw new Error("Project ID not found");
    }

    token = (await Notifications.getExpoPushTokenAsync({
      projectId,
    })).data;

    console.log("Expo Push Token:", token);

  } catch (error) {
    console.error("Error getting Expo Push token:", error);
    token = "";
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight + 20 : 0,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  multiline: {
    height: 80,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  datePickerContainer: {
    height: 300,
    marginBottom: 20,
  },
});

export default AddNote;

