import { addNote } from "@/utils/dbFunctions/crud";
import { router } from "expo-router";
import { FormikProvider, useFormik, FormikHelpers } from "formik";
import { useEffect, useState, useRef } from "react";
import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import * as Calendar from "expo-calendar";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaFrameContext } from "react-native-safe-area-context";
import DatePickerComponent from "@/components/datePicker/datePicker";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

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
  const [showDatePicker, setShowDatePicker] = useState(false);

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
  /////////////////////

  const onSubmit = async () => {
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

  const seteandoAlarma = async () => {
    const { status: calendarStatus } =
      await Calendar.requestCalendarPermissionsAsync();
    console.log("------> Estado del calendario: ", calendarStatus);

    if (calendarStatus !== "granted") {
      Alert.alert("Tiene que habilitar permisos de calendario");
      return;
    }
    const defaultCalendar = await Calendar.getCalendarsAsync();
    // const calendars = await Calendar.getCalendarsAsync(
    //   Calendar.EntityTypes.EVENT
    // );
    // console.log("Here are all your calendars:", calendars);

    // const defaultCalendar =
    //   calendars.find((cal) => cal.allowsModifications) || calendars[0];

    // console.log("------->Calendar con permisos encontrado: ", defaultCalendar);
    if (!defaultCalendar) {
      Alert.alert("No se encontró un calendario con permisos de modificación");
      return;
    }

    const date = new Date();
    const alarmTime = date.getTime();
    console.log("---------------> Fecha enviada: ", date.toLocaleString());

    const eventDetails = {
      title: "Probando alarma",
      startDate: new Date(alarmTime),
      endDate: new Date(alarmTime), // Duración de 5 minutos
      timeZone: "local",
      reminderMinutes: 0,
      alarms: [{ relativeOffset: 0, method: Calendar.AlarmMethod.ALERT }],
    };
    console.log("cantidad de calendarios", defaultCalendar.length);
    await Calendar.createEventAsync(defaultCalendar[0].id, eventDetails);
    //Alert.alert("Alarm set for:", date.toLocaleString());
    console.log("Alarm set for:", date.toLocaleString());
  };

  useEffect(() => {
    //seteandoAlarma();
    //schedulePushNotification(date);
  }, [date]);

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
    <View style={styles.mainContainer} key={key}>
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
        <View style={{ height: 300 }}>
          <DatePickerComponent
            dateProp={date}
            setDateProp={(value: Date) => setDate(value)}
          />
        </View>

        {/* <Button title="Create a new calendar" onPress={createCalendar} /> */}
        <Button title="Guardar" onPress={onSubmit} />
      </FormikProvider>
    </View>
  );
};

// async function getDefaultCalendarSource() {
//   const defaultCalendar = await Calendar.getDefaultCalendarAsync();
//   return defaultCalendar.source;
// }

// async function createCalendar() {
//   const defaultCalendarSource =
//     Platform.OS === "ios"
//       ? await getDefaultCalendarSource()
//       : { isLocalAccount: true, name: "Expo Calendar" };
//   const newCalendarID = await Calendar.createCalendarAsync({
//     title: "Expo Calendar",
//     color: "blue",
//     entityType: Calendar.EntityTypes.EVENT,
//     sourceId: defaultCalendarSource.id,
//     source: defaultCalendarSource,
//     name: "internalCalendarName",
//     ownerAccount: "personal",
//     accessLevel: Calendar.CalendarAccessLevel.OWNER,
//   });
//   console.log(`Your new calendar ID is: ${newCalendarID}`);
// }

async function schedulePushNotification(
  dateValue: Date,
  title: string,
  description: string
) {
  //const trigger = new Date(Date.now());
  //trigger.setMinutes(trigger.getMinutes() + 1);
  //trigger.setSeconds(trigger.getSeconds() + 10);
  console.log("fecha escogida: ", dateValue.toString());
  await Notifications.scheduleNotificationAsync({
    content: {
      //title: "Probando 10seg! 📬",
      title: title,
      //body: "Here is the notification body",
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
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
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
  },
  inputTextArea: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddNote;
