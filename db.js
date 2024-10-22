import { createClient } from "@libsql/client";
import dotenv from 'dotenv';

dotenv.config()
console.log(process.env.TURSO_DATABASE_URL)

async function createTables(db) {
  try {
    await db.batch(
      [
        `CREATE TABLE transactions (
            id INTEGER PRIMARY KEY,
            trans_type TEXT NOT NULL CHECK (trans_type IN ('income', 'expense')),
            category_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            amount REAL NOT NULL,
            trans_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            description TEXT,
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`,

        `CREATE TABLE categories (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            cat_type TEXT NOT NULL CHECK (cat_type IN ('income', 'expense'))
        );`,

        `CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,

        `CREATE TABLE tokens (
            id INTEGER PRIMARY KEY,
            token TEXT NOT NULL,
            expires_at DATETIME NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`
      ],
      "write"
    );
    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

async function main() {
  const config = {
    //url: "file:dbfile.db",
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
  };
  const db = createClient(config);

  await createTables(db); 
}

main();