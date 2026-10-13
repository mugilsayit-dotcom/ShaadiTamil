import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { dbQuery } from '../config/db';

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      const user = await dbQuery.get(
        'SELECT _id, name, email, gender, dob, religion, caste, motherTongue, phone, about, education, occupation, income, location, height, maritalStatus, profilePicture, isAdmin, isVerified, isPremium FROM users WHERE _id = ?',
        [decoded.id]
      );

      if (user) {
        // Convert SQLite integer booleans (0/1) to JavaScript booleans (false/true)
        user.isAdmin = !!user.isAdmin;
        user.isVerified = !!user.isVerified;
        user.isPremium = !!user.isPremium;
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: 'Not authorized, user not found' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};
