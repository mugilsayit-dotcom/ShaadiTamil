// Deprecated Mongoose model. Database has been migrated to SQL (SQLite).
// Please use dbQuery from src/config/db.ts to execute SQL queries.

export interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  religion?: string;
  caste?: string;
  motherTongue?: string;
  phone?: string;
  about?: string;
  education?: string;
  occupation?: string;
  income?: string;
  location?: string;
  height?: string;
  maritalStatus?: string;
  profilePicture?: string;
  isAdmin: boolean;
  isVerified: boolean;
  isPremium: boolean;
  createdAt?: string;
  updatedAt?: string;
}
