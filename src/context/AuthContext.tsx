import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'farmer' | 'client') => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration purposes
const mockUsers: User[] = [
  {
    id: '1',
    email: 'farmer@example.com',
    name: 'John Smith',
    role: 'farmer',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'client@example.com',
    name: 'Jane Doe',
    role: 'client',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user in local storage
    const savedUser = localStorage.getItem('honey_auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'password') { // Simple password check
        setUser(foundUser);
        localStorage.setItem('honey_auth_user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'farmer' | 'client') => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        email,
        name,
        role,
        createdAt: new Date().toISOString(),
      };

      // In a real app, this would be an API call to create a user
      // For demo, we'll just set the state
      setUser(newUser);
      localStorage.setItem('honey_auth_user', JSON.stringify(newUser));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('honey_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};