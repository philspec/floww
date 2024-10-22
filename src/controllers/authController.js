import jwt from 'jsonwebtoken';
import { constants } from '../config/constants.js';
import { userModel } from '../models/user.js';
import { tokenModel } from '../models/token.js';
import { passwordUtils } from '../utils/passwordUtils.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const authController = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await passwordUtils.hash(password);
    await userModel.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await passwordUtils.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, constants.JWT_SECRET, {
      expiresIn: constants.JWT_EXPIRES_IN
    });

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await tokenModel.create({
      token,
      userId: user.id,
      expiresAt: expiresAt.toISOString()
    });

    res.json({ token });
  }),

  logout: asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await tokenModel.delete(token);
    }
    res.json({ message: 'Logged out successfully' });
  })
};