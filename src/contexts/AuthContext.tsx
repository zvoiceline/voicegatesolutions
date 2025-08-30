import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, UserRole, UserStatus, PermissionScope } from '../services/authService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  selfRegister: (email: string, password: string, name: string, role: 'interpreter' | 'client', profileData?: Partial<User['profile']>) => Promise<User>;
  createUserByAdmin: (email: string, password: string, name: string, role: UserRole, permissionScope?: PermissionScope) => Promise<User>;
  approveUser: (userId: string) => Promise<void>;
  rejectUser: (userId: string) => Promise<void>;
  getPendingUsers: () => Promise<User[]>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  canManageUser: (targetUser: User) => boolean;
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

  const selfRegister = async (email: string, password: string, name: string, role: 'interpreter' | 'client', profileData?: Partial<User['profile']>): Promise<User> => {
    setLoading(true);
    try {
      const newUser = await authService.selfRegister(email, password, name, role, profileData);
      return newUser;
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createUserByAdmin = async (email: string, password: string, name: string, role: UserRole, permissionScope?: PermissionScope): Promise<User> => {
    if (!user?.id) {
      throw new Error('Must be logged in to create users');
    }
    setLoading(true);
    try {
      const newUser = await authService.createUserByAdmin(email, password, name, role, user.id, permissionScope);
      return newUser;
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (userId: string): Promise<void> => {
    if (!user?.id) {
      throw new Error('Must be logged in to approve users');
    }
    try {
      await authService.approveUser(userId, user.id);
    } catch (error: any) {
      throw error;
    }
  };

  const rejectUser = async (userId: string): Promise<void> => {
    if (!user?.id) {
      throw new Error('Must be logged in to reject users');
    }
    try {
      await authService.rejectUser(userId, user.id);
    } catch (error: any) {
      throw error;
    }
  };

  const getPendingUsers = async (): Promise<User[]> => {
    if (!user?.id) {
      throw new Error('Must be logged in to view pending users');
    }
    try {
      return await authService.getPendingUsers(user.id);
    } catch (error: any) {
      throw error;
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

  const hasPermission = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    return authService.hasPermission(user, requiredRole);
  };

  const canManageUser = (targetUser: User): boolean => {
    if (!user) return false;
    return authService.canManageUser(user, targetUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      selfRegister,
      createUserByAdmin,
      approveUser,
      rejectUser,
      getPendingUsers,
      updateProfile,
      resetPassword,
      getAllUsers,
      hasPermission,
      canManageUser,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}