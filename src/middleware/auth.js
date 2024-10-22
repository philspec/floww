import jwt from 'jsonwebtoken';
import { constants } from '../config/constants.js';
import { db } from '../config/database.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, constants.JWT_SECRET);
    
    // Check if token exists in database
    const result = await db.execute({
      sql: "SELECT * FROM tokens WHERE token = ? AND expires_at > datetime('now')",
      args: [token]
    });

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};