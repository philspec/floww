import { Router } from 'express';
import { categoryController } from '../controllers/categoryController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use(authenticateToken);

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);

export default router;