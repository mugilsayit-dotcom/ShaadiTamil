import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isPremium?: boolean;
  gender?: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (name: string, email: string, password: string, createdFor?: string, gender?: string, dob?: string) => Promise<{ error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USER_KEY = "shaaditamil_user";
const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? "http://localhost:5000/api" 
    : "/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { error: data.message || "Failed to log in" };
      }

      setUser(data);
      localStorage.setItem(USER_KEY, JSON.stringify(data));
      return {};
    } catch (error) {
      return { error: "Network error, please try again." };
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    createdFor?: string,
    gender?: string,
    dob?: string
  ) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          gender: gender || "Unspecified", 
          dob: dob || new Date().toISOString() 
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { error: data.message || "Failed to sign up" };
      }

      setUser(data);
      localStorage.setItem(USER_KEY, JSON.stringify(data));
      return {};
    } catch (error) {
      return { error: "Network error, please try again." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
