import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  is_verified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me/`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/token`, {
      email,
      password
    });
    const { access_token } = response.data;
    setToken(access_token);
    localStorage.setItem('token', access_token);
    await fetchUser(access_token);
  };

  const signup = async (email: string, password: string) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/users/`, {
      email,
      password
    });
  };

  const verifyEmail = async (token: string) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/verify-email/${token}`);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    verifyEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 