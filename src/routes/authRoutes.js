import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { userValidation } from '../middleware/validation.js';

const router = Router();

router.post('/register', userValidation, authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;