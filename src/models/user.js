import { db } from '../config/database.js';

export const userModel = {
  async create({ username, password, email }) {
    const result = await db.execute({
      sql: `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
      args: [username, password, email]
    });
    return result;
  },

  async findByEmail(email) {
    const result = await db.execute({
      sql: `SELECT * FROM users WHERE email = ?`,
      args: [email]
    });
    return result.rows[0];
  }
};