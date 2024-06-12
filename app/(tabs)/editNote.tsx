import { useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { addNote } from "@/utils/dbFunctions/crud";
import { router} from "expo-router";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useState, useRef } from "react";
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

const editNote = () => {
    console.log("entra");
  const {idNota}=useLocalSearchParams();
  console.log("entra1");
  console.log("Entrando al idNota:"+{idNota});
  const [id, setKey] = useState(0);
  const [date, setDate] = useState(new Date());

  //notificaciones
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const onSubmit = async () => {
    if (!newNoteFormik.values.title || !newNoteFormik.values.description)
      return Alert.alert("Debe llenar los campos");
    const response = await addNote(
      newNoteFormik.values.title,
      newNoteFormik.values.description
    );
    console.log("LA repuesta del crud: ", response);
    schedulePushNotification(
      date,
      newNoteFormik.values.title,
      newNoteFormik.values.description
    );
    clearFields();
    //seteandoAlarma();
    router.push("/notes");
  };

  const clearFields = () => {
    newNoteFormik.values.title = "";
    newNoteFormik.values.description = "";
    setKey((preValue) => preValue + 1);
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

  //Useeffect notificaciones
  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  ///

  console.log("valores formik: ", newNoteFormik.values);

  return (
    <View style={styles.mainContainer} >
      
      <FormikProvider value={newNoteFormik}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Editar nota:  {idNota}</Text>
      </View>
        <TextInput
          style={styles.inputText}
          onChangeText={newNoteFormik.handleChange("title")}
          value={newNoteFormik.values.title}
          placeholder="Ingrese el titulo de la nota"
        />
        <TextInput
          style={styles.inputTextArea}
          onChangeText={newNoteFormik.handleChange("description")}
          value={newNoteFormik.values.description}
          placeholder="Ingrese la Descripcion"
          multiline
        />
        <View style={{ height: 300 }}>
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
  console.log("fecha escogida: ", dateValue.toString());
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
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

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
    borderRadius:5
  },
  inputTextArea: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:5, 
  },
  pageTitle:{
    flex:4,
    verticalAlign:'middle',
    fontSize:30, 
    fontWeight: "bold",
    color: "deepskyblue",
    textAlign:'center',
    textAlignVertical:'center'


  },
  header: {
    flexDirection: "row",
    justifyContent:'space-between',
    height:'10%', 
    verticalAlign:'middle'
  },
});

export default editNote;
