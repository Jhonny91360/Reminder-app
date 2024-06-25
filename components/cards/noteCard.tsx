import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { number } from "yup";

interface NoteCardProps {
  idNote: number;
  title: string;
  description: string;
  date: string;
  imageURL?: string;
}
const NoteCard = ({
  idNote,
  title,
  description,
  date,
  imageURL,
}: NoteCardProps) => {
  const getDateAndTIme = (date: string): { date: string; time: string } => {
    const dateOnly = date.split("T")[0];
    const timeOnly = date.split("T")[1].split(".")[0];
    if (dateOnly && timeOnly) {
      return {
        date: dateOnly,
        time: timeOnly,
      };
    }
    return {
      date: "",
      time: "",
    };
  };
  return (
    <TouchableOpacity
      style={styles.mainContainerCard}
      onPress={() =>
        router.push({
          pathname: "/editNote",
          params: { idNota: idNote },
        })
      }
    >
      <Text style={styles.cardTitle}>
        <Ionicons name="pencil-sharp" /> {title}
      </Text>
      <View style={styles.cardBody}>
        <View style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <View
            style={{
              backgroundColor: "deepskyblue",
              borderRadius: 5,
              padding: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>{`${
              getDateAndTIme(date).date
            }`}</Text>
          </View>
          <View
            style={{
              backgroundColor: "deepskyblue",
              borderRadius: 5,
              padding: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>{`${
              getDateAndTIme(date).time
            }`}</Text>
          </View>
        </View>
        {imageURL && (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: imageURL }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </View>
        )}
        <View style={styles.cardDescription}>
          <Text
            style={{ color: "white", fontSize: 12, maxWidth: 80 }}
          >{`${description.slice(0, 65)}${
            description.length > 65 ? "..." : ""
          }`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainerCard: {
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    height: 180,
    padding: 10,
    marginVertical: 10,
    gap: 20,
  },
  cardTime: {
    flex: 1,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 15,
    width: "100%",
    backgroundColor: "deepskyblue",
    padding: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 3,
  },
  cardTitle: {
    textAlign: "left",
    fontSize: 18,
    width: "100%",
    padding: 2,
    borderRadius: 5,
    color: "deepskyblue",
    fontWeight: "bold",
  },
  cardBody: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
    //backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  cardDescription: {
    backgroundColor: "deepskyblue",
    borderRadius: 5,
    padding: 10,
    overflow: "scroll",
    textAlign: "left",
    flexWrap: "wrap",
    maxWidth: 110,
    //word-wrap: break-word,
    //white-space: normal,
    //overflow-wrap: break-word,
    //alignSelf: "flex-start",
  },
});

export default NoteCard;
