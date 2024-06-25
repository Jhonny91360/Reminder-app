import { Note } from "@/interfaces/interfaces";
import * as SQLite from "expo-sqlite";
import { number } from "yup";

export const initializeDB = async () => {
  const db = await SQLite.openDatabaseAsync("reminderDB");
  await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS note (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL , imageURL TEXT, date TEXT NOT NULL );
      `);
};

export const readAllNotes = async () => {
  const db = await SQLite.openDatabaseAsync("reminderDB");
  const allRows: Note[] = await db.getAllAsync("SELECT * FROM note");
  console.log("LEcutra de notas", allRows);
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
  //await db.execAsync("DROP TABLE IF EXISTS note"); //! para resetear la tabla en caso de agregar o modificar campos
  console.log("Tabla note reseteada");
};

export const addNote = async (
  title: string,
  description: string,
  date: string,
  imageURL?: string
) => {
  console.log("Datos que recibo para guardar", {
    title,
    description,
    date,
    imageURL,
  });
  const db = await SQLite.openDatabaseAsync("reminderDB");
  const result = await db.runAsync(
    "INSERT INTO note (title, description, imageURL, date) VALUES (?, ?, ?, ?)",
    [title, description, imageURL ?? "", date]
  );
  console.log("Registro en la bdd: ", result.lastInsertRowId, result.changes);
};
export const getById = async (idnote: number) => {
  const db = await SQLite.openDatabaseAsync("reminderDB");
  const allRows: Note[] = await db.getAllAsync(
    "SELECT * FROM note where id=" + idnote
  );
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
