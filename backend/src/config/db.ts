import sqlite3 from 'sqlite3';
import path from 'path';
import crypto from 'crypto';

const dbPath = path.resolve(__dirname, '../../matrimony.db');

export const db = new sqlite3.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error('Could not connect to SQLite database:', err);
  } else {
    console.log('Connected to local SQLite database.');
  }
});

export const dbQuery = {
  run: (sql: string, params: any[] = []): Promise<{ lastID: any, changes: number }> => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (this: any, err: Error | null) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  },
  get: <T = any>(sql: string, params: any[] = []): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err: Error | null, row: any) => {
        if (err) reject(err);
        else resolve(row as T);
      });
    });
  },
  all: <T = any>(sql: string, params: any[] = []): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err: Error | null, rows: any[]) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });
  }
};

const connectDB = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      _id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      gender TEXT NOT NULL,
      dob TEXT NOT NULL,
      religion TEXT,
      caste TEXT,
      motherTongue TEXT,
      phone TEXT,
      about TEXT,
      education TEXT,
      occupation TEXT,
      income TEXT,
      location TEXT,
      height TEXT,
      maritalStatus TEXT,
      profilePicture TEXT DEFAULT 'https://via.placeholder.com/150',
      isAdmin INTEGER DEFAULT 0,
      isVerified INTEGER DEFAULT 0,
      isPremium INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await dbQuery.run(query);
    console.log('SQLite Matrimony tables initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize SQLite database tables:', error);
    process.exit(1);
  }
};

export default connectDB;
