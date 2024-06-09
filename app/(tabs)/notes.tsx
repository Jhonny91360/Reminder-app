import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  ScrollView,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import NoteCard from "@/components/cards/noteCard";
import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import {
  deleteAllNotes,
  initializeDB,
  readAllNotes,
} from "@/utils/dbFunctions/crud";
import { Note } from "@/interfaces/interfaces";

export default function TabTwoScreen() {
  const pathname = usePathname();
  const [notes, setNotes] = useState<Note[]>();

  useEffect(() => {
    console.log("Entrando al useEffect");
    initializeDB();
  }, []);

  useEffect(() => {
    getNotes();
  }, [pathname]);

  const getNotes = async () => {
    const response = await readAllNotes();
    if (response) setNotes(response);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={{ color: "dark", fontSize: 24 }}>Archivador de notas</Text>

        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => router.push("/addNote")}
        >
          <Text style={{ color: "dark", fontSize: 54, marginBottom: 10 }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.cardsContainer}>
        {notes?.map((note) => {
          return (
            <NoteCard
              key={note.id}
              title={note.title}
              time={note.description}
            />
          );
        })}
      </ScrollView>
      {/* <NoteCard title="Primera nota" time="Jueves 08:00pm" />
      <NoteCard title="Segunda nota" time="Domingo 11:00am" />
      <NoteCard title="Tercera nota" time="Lunes 05:00pm" />
      <NoteCard title="Cuarta nota" time="Martes 02:00pm" /> */}
      <Button title="Leer datos" onPress={readAllNotes} />
      <Button
        title="Resetar db"
        onPress={() => {
          deleteAllNotes();
          getNotes();
        }}
      />
    </View>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
    //   headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Explore</ThemedText>
    //   </ThemedView>
    //   <ThemedText>This app includes example code to help you get started.</ThemedText>
    //   <Collapsible title="File-based routing">
    //     <ThemedText>
    //       This app has two screens:{' '}
    //       <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
    //       <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
    //     </ThemedText>
    //     <ThemedText>
    //       The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
    //       sets up the tab navigator.
    //     </ThemedText>
    //     <ExternalLink href="https://docs.expo.dev/router/introduction">
    //       <ThemedText type="link">Learn more</ThemedText>
    //     </ExternalLink>
    //   </Collapsible>
    //   <Collapsible title="Android, iOS, and web support">
    //     <ThemedText>
    //       You can open this project on Android, iOS, and the web. To open the web version, press{' '}
    //       <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
    //     </ThemedText>
    //   </Collapsible>
    //   <Collapsible title="Images">
    //     <ThemedText>
    //       For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
    //       <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
    //       different screen densities
    //     </ThemedText>
    //     <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
    //     <ExternalLink href="https://reactnative.dev/docs/images">
    //       <ThemedText type="link">Learn more</ThemedText>
    //     </ExternalLink>
    //   </Collapsible>
    //   <Collapsible title="Custom fonts">
    //     <ThemedText>
    //       Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
    //       <ThemedText style={{ fontFamily: 'SpaceMono' }}>
    //         custom fonts such as this one.
    //       </ThemedText>
    //     </ThemedText>
    //     <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
    //       <ThemedText type="link">Learn more</ThemedText>
    //     </ExternalLink>
    //   </Collapsible>
    //   <Collapsible title="Light and dark mode components">
    //     <ThemedText>
    //       This template has light and dark mode support. The{' '}
    //       <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
    //       what the user's current color scheme is, and so you can adjust UI colors accordingly.
    //     </ThemedText>
    //     <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
    //       <ThemedText type="link">Learn more</ThemedText>
    //     </ExternalLink>
    //   </Collapsible>
    //   <Collapsible title="Animations">
    //     <ThemedText>
    //       This template includes an example of an animated component. The{' '}
    //       <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
    //       the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
    //       to create a waving hand animation.
    //     </ThemedText>
    //     {Platform.select({
    //       ios: (
    //         <ThemedText>
    //           The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
    //           component provides a parallax effect for the header image.
    //         </ThemedText>
    //       ),
    //     })}
    //   </Collapsible>
    // </ParallaxScrollView>
  );
}

// const styles = StyleSheet.create({
//   headerImage: {
//     color: "#808080",
//     bottom: -90,
//     left: -35,
//     position: "absolute",
//   },
//   titleContainer: {
//     flexDirection: "row",
//     gap: 8,
//   },
// });

const styles = StyleSheet.create({
  mainContainer: {
    //bottom: -40,
    backgroundColor: "mintcream",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  buttonAdd: {
    backgroundColor: "lightgray",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 50,
    width: 80,
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    height: "100%",
    maxHeight: 450,
  },
});
