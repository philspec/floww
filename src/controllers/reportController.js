import { transactionModel } from '../models/transaction.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { dateUtils } from '../utils/dateUtils.js';

export const reportController = {
  getSummary: asyncHandler(async (req, res) => {
    const { startDate, endDate, categoryId } = req.query;
    const summary = await transactionModel.getSummary(
      req.user.id,
      startDate,
      endDate,
      categoryId
    );
    res.json(summary);
  }),

  getMonthlyReport: asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const startDate = dateUtils.getStartOfMonth();
    const endDate = dateUtils.getEndOfMonth();
    
    const summary = await transactionModel.getSummary(userId, startDate, endDate);
    res.json({
      period: `${new Date(startDate).toLocaleString('default', { month: 'long' })} ${new Date(startDate).getFullYear()}`,
      ...summary
    });
  })
};