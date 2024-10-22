import { transactionModel } from '../models/transaction.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const transactionController = {
  createTransaction: asyncHandler(async (req, res) => {
    const { trans_type, category_id, amount, description } = req.body;
    const user_id = req.user.id;

    const result = await transactionModel.create({
      trans_type,
      category_id,
      user_id,
      amount,
      description
    });

    const transactionId = Number(result.lastInsertRowid); // Conversion

    res.status(201).json({
      message: 'Transaction created successfully',
      transactionId
    });
  }),

  getAllTransactions: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const transactions = await transactionModel.getAll(req.user.id, page);
    res.json(transactions);
  }),

  getTransaction: asyncHandler(async (req, res) => {
    const transaction = await transactionModel.getById(req.params.id, req.user.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  }),

  updateTransaction: asyncHandler(async (req, res) => {
    const { trans_type, category_id, amount, description } = req.body;
    const result = await transactionModel.update(req.params.id, req.user.id, {
      trans_type,
      category_id,
      amount,
      description
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction updated successfully' });
  }),

  deleteTransaction: asyncHandler(async (req, res) => {
    const result = await transactionModel.delete(req.params.id, req.user.id);
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  })
};