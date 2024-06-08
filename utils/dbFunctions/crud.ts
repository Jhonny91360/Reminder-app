import * as SQLite from "expo-sqlite";

export const initializeDB = async () => {
  const db = await SQLite.openDatabaseAsync("reminderDB");
  await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS note (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL);
      INSERT INTO note (title, description) VALUES ('Primera nota', '123');
      INSERT INTO note (title, description) VALUES ('Segunda nota', '456');
      INSERT INTO note (title, description) VALUES ('Tercera nota', '789');
      `);
};

export const readAllNotes = async () => {
  const db = await SQLite.openDatabaseAsync("reminderDB");
  const allRows = await db.getAllAsync("SELECT * FROM note");
  if (allRows.length) {
    for (const row of allRows) {
      console.log(row);
    }
  } else {
    console.log("Resultado: ", allRows);
  }
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
