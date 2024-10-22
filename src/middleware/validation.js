import { body, param, query } from 'express-validator';

export const transactionValidation = [
  body('trans_type').isIn(['income', 'expense']).withMessage('Transaction type must be income or expense'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  body('category_id').isInt().withMessage('Valid category ID is required'),
  body('description').optional().trim().isLength({ max: 255 })
];

export const userValidation = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];
