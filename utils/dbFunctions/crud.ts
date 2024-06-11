import { Note } from "@/interfaces/interfaces";
import * as SQLite from "expo-sqlite";
import { number } from "yup";

export const initializeDB = async () => {
  const db = await SQLite.openDatabaseAsync("reminderDB");
  await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS note (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL);
      `);
};

export const readAllNotes = async () => {
  const db = await SQLite.openDatabaseAsync("reminderDB");
  const allRows: Note[] = await db.getAllAsync("SELECT * FROM note");
  return allRows;
  // if (allRows.length) {
  //   // for (const row of allRows) {
  //   //   console.log(row);
  //   // }
  //   console.log("Resultado: ", allRows);
  // } else {
  //   console.log("No hay resultados");
  // }
};

export const deleteAllNotes = async () => {
  const db = await SQLite.openDatabaseAsync("reminderDB");
  await db.execAsync("DELETE FROM note");
  console.log("Tabla note reseteada");
};

export const addNote = async (title: string, description: string) => {
  const db = await SQLite.openDatabaseAsync("reminderDB");
  const result = await db.runAsync(
    "INSERT INTO note (title, description) VALUES (?, ?)",
    [title, description]
  );
  console.log(result.lastInsertRowId, result.changes);
};
export const getById= async (idnote:number )=> {
    const db = await SQLite.openDatabaseAsync("reminderDB");
    const allRows: Note[] = await db.getAllAsync("SELECT * FROM note where id="+idnote);
      return allRows;
    
  

  // if (allRows.length) {
  //   // for (const row of allRows) {
  //   //   console.log(row);
  //   // }
  //   console.log("Resultado: ", allRows);
  // } else {
  //   console.log("No hay resultados");
  // }
};
