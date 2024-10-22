import { Router } from 'express';
import { transactionController } from '../controllers/transactionController.js';
import { authenticateToken } from '../middleware/auth.js';
import { transactionValidation } from '../middleware/validation.js';

const router = Router();

router.use(authenticateToken);

router.post('/', transactionValidation, transactionController.createTransaction);
router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransaction);
router.put('/:id', transactionValidation, transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

export default router;