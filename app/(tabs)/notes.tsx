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
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import NoteCard from "@/components/cards/noteCard";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  deleteAllNotes,
  initializeDB,
  readAllNotes,
} from "@/utils/dbFunctions/crud";

export default function TabTwoScreen() {
  useEffect(() => {
    console.log("Entrando al useEffect");
    initializeDB();
  }, []);

  return (
    <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Notas en progreso</Text>
          <Ionicons name="add-circle-outline" style={styles.btnAdd} onPress={() => router.push("/addNote") }/>
        </View>
        <View style={styles.listado}>
            <NoteCard title="Primera nota" time="Jueves 08:00pm" />
            <NoteCard title="Segunda nota" time="Domingo 11:00am" />
            <NoteCard title="Tercera nota" time="Lunes 05:00pm" />
            <NoteCard title="Cuarta nota" time="Martes 02:00pm" />
        </View> 
      <View style={styles.footer}>
  
        <Button color='#032757' title="Leer datos" onPress={readAllNotes} />
        <Button color='#032757' title="Resetar db" onPress={deleteAllNotes} />
      </View> 
      
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
    top:50,
    flex:1,
    flexDirection: "column",
    
    gap:10
    
  },

  header: {
    flexDirection: "row",
    justifyContent:'space-between',
    height:'10%', 
    verticalAlign:'middle'
    
    

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
  btnAdd:{
    flex:1,
    verticalAlign:'middle',
    fontSize:40, 
    fontWeight: "bold",
    color: "#032757",
    textAlign:'center'
  },
  footer:{
    flexDirection: "column",
    gap:5, 
    verticalAlign:'bottom',height:'15%'


    
    
  },
  button:{
    flex:1,
    
    },
  listado:{
     flexDirection: "column",
     height:'70%'
    
    
  }

});
