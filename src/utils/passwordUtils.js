import bcrypt from 'bcryptjs';
import { constants } from '../config/constants.js';

export const passwordUtils = {
  async hash(password) {
    return await bcrypt.hash(password, constants.PASSWORD_SALT_ROUNDS);
  },

  async compare(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
};
