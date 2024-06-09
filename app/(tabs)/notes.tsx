import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";
import { deleteAllNotes, initializeDB, readAllNotes } from "@/utils/dbFunctions/crud";
import NoteCard from "@/components/cards/noteCard";
import { Note } from "@/interfaces/interfaces";

const TabTwoScreen = () => {
  const pathname = usePathname();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Archivador de Notas</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/addNote")}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notes.map((note) => (
          <NoteCard key={note.id} title={note.title} time={note.description} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Leer datos" onPress={readAllNotes} />
        <Button
          title="Resetear DB"
          onPress={() => {
            deleteAllNotes();
            getNotes();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default TabTwoScreen;
