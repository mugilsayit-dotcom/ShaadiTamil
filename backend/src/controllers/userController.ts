import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { dbQuery } from '../config/db';

interface AuthRequest extends Request {
  user?: any;
}

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await dbQuery.get('SELECT * FROM users WHERE _id = ?', [req.user._id]);

    if (user) {
      user.isAdmin = !!user.isAdmin;
      user.isVerified = !!user.isVerified;
      user.isPremium = !!user.isPremium;
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await dbQuery.get('SELECT * FROM users WHERE _id = ?', [req.user._id]);

    if (user) {
      let hashedPassword = user.password;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(req.body.password, salt);
      }

      await dbQuery.run(
        `UPDATE users SET
          name = ?,
          about = ?,
          religion = ?,
          caste = ?,
          motherTongue = ?,
          phone = ?,
          education = ?,
          occupation = ?,
          income = ?,
          location = ?,
          height = ?,
          maritalStatus = ?,
          gender = ?,
          dob = ?,
          profilePicture = ?,
          password = ?,
          updatedAt = CURRENT_TIMESTAMP
        WHERE _id = ?`,
        [
          req.body.name ?? user.name,
          req.body.about ?? user.about,
          req.body.religion ?? user.religion,
          req.body.caste ?? user.caste,
          req.body.motherTongue ?? user.motherTongue,
          req.body.phone ?? user.phone,
          req.body.education ?? user.education,
          req.body.occupation ?? user.occupation,
          req.body.income ?? user.income,
          req.body.location ?? user.location,
          req.body.height ?? user.height,
          req.body.maritalStatus ?? user.maritalStatus,
          req.body.gender ?? user.gender,
          req.body.dob ?? user.dob,
          req.body.profilePicture ?? user.profilePicture,
          hashedPassword,
          req.user._id,
        ]
      );

      const updatedUser = await dbQuery.get('SELECT * FROM users WHERE _id = ?', [req.user._id]);
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

export const getMatches = async (req: AuthRequest, res: Response) => {
  try {
    const user = await dbQuery.get('SELECT * FROM users WHERE _id = ?', [req.user._id]);

    if (user) {
      const oppGender = user.gender === 'Male' ? 'Female' : 'Male';
      const matches = await dbQuery.all(
        'SELECT _id, name, email, gender, dob, religion, caste, motherTongue, phone, about, education, occupation, income, location, height, maritalStatus, profilePicture, isAdmin, isVerified, isPremium FROM users WHERE gender = ?',
        [oppGender]
      );
      const mapped = matches.map((m) => ({
        ...m,
        isAdmin: !!m.isAdmin,
        isVerified: !!m.isVerified,
        isPremium: !!m.isPremium,
      }));
      res.json(mapped);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await dbQuery.all(
      'SELECT _id, name, email, gender, dob, religion, caste, motherTongue, phone, about, education, occupation, income, location, height, maritalStatus, profilePicture, isAdmin, isVerified, isPremium FROM users'
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
