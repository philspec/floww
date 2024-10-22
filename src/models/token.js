import { db } from '../config/database.js';

export const tokenModel = {
  async create({ token, userId, expiresAt }) {
    const result = await db.execute({
      sql: `INSERT INTO tokens (token, user_id, expires_at) VALUES (?, ?, ?)`,
      args: [token, userId, expiresAt]
    });
    return result;
  },

  async delete(token) {
    const result = await db.execute({
      sql: `DELETE FROM tokens WHERE token = ?`,
      args: [token]
    });
    return result;
  }
};