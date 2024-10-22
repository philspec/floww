import { db } from '../config/database.js';

export const categoryModel = {
  async getAll() {
    const result = await db.execute(`SELECT * FROM categories`);
    return result.rows;
  },

  async create({ name, cat_type }) {
    const result = await db.execute({
      sql: `INSERT INTO categories (name, cat_type) VALUES (?, ?)`,
      args: [name, cat_type]
    });
    return result;
  }
};