import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { dbQuery } from '../config/db';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, gender, dob } = req.body;

  try {
    const userExists = await dbQuery.get('SELECT * FROM users WHERE email = ?', [email]);

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const _id = crypto.randomUUID();

    await dbQuery.run(
      'INSERT INTO users (_id, name, email, password, gender, dob, isAdmin, isVerified, isPremium) VALUES (?, ?, ?, ?, ?, ?, 0, 0, 0)',
      [_id, name, email, hashedPassword, gender, dob]
    );

    const user = await dbQuery.get('SELECT _id, name, email, isAdmin, gender FROM users WHERE _id = ?', [_id]);

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: !!user.isAdmin,
        gender: user.gender,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await dbQuery.get('SELECT * FROM users WHERE email = ?', [email]);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: !!user.isAdmin,
        gender: user.gender,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  try {
    const user = await dbQuery.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await dbQuery.run('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

    res.json({ message: 'Password reset successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
