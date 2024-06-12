import {
  Image,
  StyleSheet,
  Platform,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={{ borderRadius: 10 }}
        source={require("@/assets/images/splash-reminder.png")}
      ></Image>
      <Text style={styles.appTitle}>Reminder</Text>

      {/* <Link href={"/explore"} style={styles.buttonContainer}>
        <Text
          style={{
            marginHorizontal: "auto",
            backgroundColor: "red",
            marginLeft: 78,
          }}
        >
          Entrar
        </Text>
      </Link> */}
      <View style={styles.buttonContainer}>
        <Button
          title="Entrar"
          color={"deepskyblue"}
          onPress={() => router.push("/notes")}
        ></Button>
      </View>
    </View>

    //   <ParallaxScrollView
    //     headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    //     headerImage={
    //       <Image
    //         //source={require("@/assets/images/partial-react-logo.png")}
    //         // source={{
    //         //   uri: "https://images-ng.pixai.art/images/thumb/a9dbf982-a070-475b-a234-a6bb95e4808c",
    //         // }}
    //         source={require("@/assets/images/uzui.png")}
    //         style={styles.reactLogo}
    //       />
    //     }
    //   >
    //     <ThemedView style={styles.titleContainer}>
    //       <ThemedText type="title">Reminder app!</ThemedText>
    //       <HelloWave />
    //     </ThemedView>
    //     <Button
    //       title="Entrar"
    //       color={"purple"}
    //       onPress={() => Alert.alert("Bienvenido")}
    //     ></Button>
    //     <TouchableOpacity
    //       style={styles.button}
    //       onPress={() => Alert.alert("Otro botón alerta")}
    //     >
    //       <Text style={{ color: "white" }}>Probando commmit</Text>
    //     </TouchableOpacity>

    //     <ThemedView style={styles.stepContainer}>
    //       <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //       <ThemedText>
    //         Edit{" "}
    //         <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
    //         to see changes. Press{" "}
    //         <ThemedText type="defaultSemiBold">
    //           {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
    //         </ThemedText>{" "}
    //         to open developer tools.
    //       </ThemedText>
    //     </ThemedView>
    //     <ThemedView style={styles.stepContainer}>
    //       <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //       <ThemedText>
    //         Tap the Explore tab to learn more about what's included in this
    //         starter app.
    //       </ThemedText>
    //     </ThemedView>
    //     <ThemedView style={styles.stepContainer}>
    //       <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //       <ThemedText>
    //         When you're ready, run{" "}
    //         <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
    //         to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
    //         directory. This will move the current{" "}
    //         <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
    //         <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //       </ThemedText>
    //     </ThemedView>
    //   </ParallaxScrollView>
    // );
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 14,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "deepskyblue",
  },
  buttonContainer: {
    width: "80%",
    borderRadius: 5,
    overflow: "hidden",
  },
});

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 278,
//     width: 400,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
//   button: {
//     height: 50,
//     width: 300,
//     backgroundColor: "red",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     color: "white",
//   },
// });
