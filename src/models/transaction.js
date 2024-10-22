import { db } from '../config/database.js';

export const transactionModel = {
  async create({ trans_type, category_id, user_id, amount, description }) {
    const result = await db.execute({
      sql: `INSERT INTO transactions (trans_type, category_id, user_id, amount, description) 
            VALUES (?, ?, ?, ?, ?)`,
      args: [trans_type, category_id, user_id, amount, description]
    });
    return { ...result, lastInsertRowid: Number(result.lastInsertRowid) };
  },

  async getAll(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const result = await db.execute({
      sql: `SELECT t.*, c.name as category_name 
            FROM transactions t 
            JOIN categories c ON t.category_id = c.id 
            WHERE t.user_id = ? 
            ORDER BY t.trans_date DESC 
            LIMIT ? OFFSET ?`,
      args: [userId, limit, offset]
    });
    return result.rows;
  },

  async getById(id, userId) {
    const result = await db.execute({
      sql: `SELECT t.*, c.name as category_name 
            FROM transactions t 
            JOIN categories c ON t.category_id = c.id 
            WHERE t.id = ? AND t.user_id = ?`,
      args: [id, userId]
    });
    return result.rows[0];
  },

  async update(id, userId, { trans_type, category_id, amount, description }) {
    const result = await db.execute({
      sql: `UPDATE transactions 
            SET trans_type = ?, category_id = ?, amount = ?, description = ? 
            WHERE id = ? AND user_id = ?`,
      args: [trans_type, category_id, amount, description, id, userId]
    });
    return result;
  },

  async delete(id, userId) {
    const result = await db.execute({
      sql: `DELETE FROM transactions WHERE id = ? AND user_id = ?`,
      args: [id, userId]
    });
    return result;
  },

  async getSummary(userId, startDate = null, endDate = null, categoryId = null) {
    let sql = `
      SELECT 
        SUM(CASE WHEN trans_type = 'income' THEN amount ELSE 0 END) as total_income,
        SUM(CASE WHEN trans_type = 'expense' THEN amount ELSE 0 END) as total_expenses
      FROM transactions 
      WHERE user_id = ?`;
    
    const args = [userId];

    if (startDate) {
      sql += ` AND trans_date >= ?`;
      args.push(startDate);
    }
    if (endDate) {
      sql += ` AND trans_date <= ?`;
      args.push(endDate);
    }
    if (categoryId) {
      sql += ` AND category_id = ?`;
      args.push(categoryId);
    }

    const result = await db.execute({ sql, args });
    const summary = result.rows[0];
    summary.balance = summary.total_income - summary.total_expenses;
    return summary;
  }
};