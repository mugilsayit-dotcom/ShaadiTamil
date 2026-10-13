import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import connectDB, { dbQuery } from './src/config/db';

dotenv.config();

const createAdmin = async () => {
  try {
    // Ensure SQLite database and tables are initialized
    await connectDB();

    const email = 'admin@example.com';
    const existingAdmin = await dbQuery.get('SELECT * FROM users WHERE email = ?', [email]);

    if (existingAdmin) {
      await dbQuery.run(
        'UPDATE users SET isAdmin = 1, isPremium = 1, isVerified = 1 WHERE email = ?',
        [email]
      );
      console.log('Existing admin account updated!');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('adminpassword123', salt);
    const _id = crypto.randomUUID();

    await dbQuery.run(
      `INSERT INTO users (
        _id, name, email, password, gender, dob, religion, caste, motherTongue, phone,
        about, education, occupation, income, location, height, maritalStatus,
        profilePicture, isAdmin, isVerified, isPremium
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, 1)`,
      [
        _id,
        'System Admin',
        email,
        hashedPassword,
        'Male',
        '1990-01-01',
        'Hindu',
        'General',
        'Tamil',
        '+919876543210',
        'I am the system administrator for Tamil Life Partner.',
        'Master of Engineering',
        'System Architect',
        '15 Lakhs',
        'Chennai',
        "5'10\"",
        'Never Married',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      ]
    );

    console.log('Admin account created successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Status Error: ${error}`);
    process.exit(1);
  }
};

createAdmin();
