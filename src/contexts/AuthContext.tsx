import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '../services/authService';

// User interface is now imported from authService

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  createUserByAdmin: (email: string, password: string, name: string, role: 'interpreter' | 'admin') => Promise<User>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = authService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await authService.signIn(email, password);
      setUser(userData);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const createUserByAdmin = async (email: string, password: string, name: string, role: 'interpreter' | 'admin'): Promise<User> => {
    if (!user?.id) {
      throw new Error('Must be logged in to create users');
    }
    setLoading(true);
    try {
      const newUser = await authService.createUserByAdmin(email, password, name, role, user.id);
      return newUser;
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async (): Promise<User[]> => {
    if (!user?.id) {
      throw new Error('Must be logged in to view users');
    }
    try {
      return await authService.getAllUsers(user.id);
    } catch (error: any) {
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      await authService.updateUserProfile(user.id, updates);
      setUser({ ...user, ...updates });
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      createUserByAdmin,
      updateProfile,
      resetPassword,
      getAllUsers,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}