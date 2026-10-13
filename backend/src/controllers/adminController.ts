import { Request, Response } from 'express';
import { dbQuery } from '../config/db';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await dbQuery.all(
      'SELECT _id, name, email, gender, dob, religion, caste, motherTongue, phone, about, education, occupation, income, location, height, maritalStatus, profilePicture, isAdmin, isVerified, isPremium, createdAt, updatedAt FROM users'
    );
    const mapped = users.map((u) => ({
      ...u,
      isAdmin: !!u.isAdmin,
      isVerified: !!u.isVerified,
      isPremium: !!u.isPremium,
    }));
    res.json(mapped);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const user = await dbQuery.get('SELECT * FROM users WHERE _id = ?', [req.params.id]);

    if (user) {
      await dbQuery.run('UPDATE users SET isVerified = 1 WHERE _id = ?', [req.params.id]);
      const updatedUser = await dbQuery.get('SELECT * FROM users WHERE _id = ?', [req.params.id]);
      if (updatedUser) {
        updatedUser.isAdmin = !!updatedUser.isAdmin;
        updatedUser.isVerified = !!updatedUser.isVerified;
        updatedUser.isPremium = !!updatedUser.isPremium;
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await dbQuery.get('SELECT * FROM users WHERE _id = ?', [req.params.id]);

    if (user) {
      await dbQuery.run('DELETE FROM users WHERE _id = ?', [req.params.id]);
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleUserPremium = async (req: Request, res: Response) => {
  try {
    const user = await dbQuery.get('SELECT * FROM users WHERE _id = ?', [req.params.id]);

    if (user) {
      const nextPremium = user.isPremium ? 0 : 1;
      await dbQuery.run('UPDATE users SET isPremium = ? WHERE _id = ?', [nextPremium, req.params.id]);
      
      const updatedUser = await dbQuery.get('SELECT * FROM users WHERE _id = ?', [req.params.id]);
      if (updatedUser) {
        updatedUser.isAdmin = !!updatedUser.isAdmin;
        updatedUser.isVerified = !!updatedUser.isVerified;
        updatedUser.isPremium = !!updatedUser.isPremium;
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
