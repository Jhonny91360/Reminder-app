import { Pressable,StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";  

interface NoteCardProps {
  idNote: number;
  title: string;
  time: string;
}
const NoteCard = ({idNote, title, time }:NoteCardProps) => {
  return (
    <TouchableOpacity style={styles.mainContainerCard}   onPress={() => 
            
      router.push({
        pathname:"/editNote",
        params:{idNota:idNote},
      })
    
    } >
       <Text style={styles.cardTime}>{idNote}:  {time}</Text>
      <Text style={styles.cardTitle}><Ionicons name="pencil-sharp"/>  {title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainerCard: {
    flexDirection:'column',
    alignItems:'stretch',
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    height: 100,
    padding: 10,
    marginVertical: 10,
  },
  cardTime:{
    flex:1,
    textAlign:'right',
    fontWeight:'bold',
    fontSize:15,
    width:'100%',
    backgroundColor:'deepskyblue',
    padding:2,
    borderTopLeftRadius:5,
    borderTopRightRadius:3
  

  }, 
  cardTitle:{
    flex:3,
    textAlign:'left',
    fontSize:15, 
    width:'100%',
    
    padding:2,
 

  }
});

export default NoteCard;
