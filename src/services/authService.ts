import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export type UserRole = 'super_admin' | 'interpreter_manager' | 'interpreter' | 'client';
export type UserStatus = 'active' | 'pending' | 'approved' | 'suspended' | 'rejected';
export type PermissionScope = 'all' | 'interpreters_only' | 'clients_only';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status?: UserStatus;
  permissionScope?: PermissionScope; // Only for admin roles
  approvedBy?: string; // ID of admin who approved
  approvedAt?: any;
  invitedBy?: string; // ID of admin who invited
  invitedAt?: any;
  createdAt?: any;
  updatedAt?: any;
  lastLogin?: any;
  profile?: {
    phone?: string;
    address?: string;
    languages?: string[];
    specializations?: string[];
    certifications?: string[];
    availability?: string;
    timezone?: string;
    biography?: string;
    country?: string;
    experience?: string;
    hourlyRate?: number;
    preferredContactMethod?: 'email' | 'phone' | 'both';
  };
}

class AuthService {
  // Sign in with email and password
  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (!userDoc.exists()) {
        throw new Error('User profile not found');
      }
      
      const userData = userDoc.data() as User;
      
      // Update last login
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return {
        ...userData,
        id: firebaseUser.uid,
        email: firebaseUser.email!
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    }
  }



  // Admin-only user creation method
  async createUserByAdmin(
    email: string,
    password: string,
    name: string,
    role: UserRole,
    currentUserId: string,
    permissionScope?: PermissionScope
  ): Promise<User> {
    try {
      // Verify current user has admin privileges
      const currentUserDoc = await getDoc(doc(db, 'users', currentUserId));
      if (!currentUserDoc.exists()) {
        throw new Error('Current user not found');
      }
      
      const currentUser = currentUserDoc.data();
      const canCreateUser = currentUser.role === 'super_admin' || 
                           (currentUser.role === 'interpreter_manager' && 
                            ['interpreter', 'client'].includes(role));
      
      if (!canCreateUser) {
        throw new Error('Unauthorized: Insufficient permissions to create this user type');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update Firebase Auth profile
      await updateProfile(firebaseUser, { displayName: name });
      
      // Create user document in Firestore
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name,
        role,
        status: role === 'super_admin' || role === 'interpreter_manager' ? 'active' : 'pending',
        permissionScope: ['super_admin', 'interpreter_manager'].includes(role) ? (permissionScope || 'all') : undefined,
        invitedBy: currentUserId,
        invitedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      return userData;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create user');
    }
  }

  // Get all users (admin only)
  async getAllUsers(currentUserId: string): Promise<User[]> {
    try {
      // Verify current user is admin
      const currentUserDoc = await getDoc(doc(db, 'users', currentUserId));
      if (!currentUserDoc.exists() || currentUserDoc.data().role !== 'admin') {
        throw new Error('Unauthorized: Only admins can view all users');
      }

      const usersSnapshot = await getDocs(collection(db, 'users'));
      return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch users');
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    }
  }

  // Get current user
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            callback({
              ...userData,
              id: firebaseUser.uid,
              email: firebaseUser.email!
            });
          } else {
            callback(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  }

  // Get user by ID
  async getUserById(userId: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return {
          id: userId,
          ...userDoc.data()
        } as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Update user status (admin only)
  async updateUserStatus(userId: string, status: UserStatus): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update user status');
    }
  }

  // Self-registration for clients and interpreters
  async selfRegister(
    email: string,
    password: string,
    name: string,
    role: 'interpreter' | 'client',
    profileData?: Partial<User['profile']>
  ): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update Firebase Auth profile
      await updateProfile(firebaseUser, { displayName: name });
      
      // Create user document in Firestore with pending status
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name,
        role,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        profile: profileData || {}
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      return userData;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to register user');
    }
  }

  // Approve user (for admins)
  async approveUser(userId: string, currentUserId: string): Promise<void> {
    try {
      // Verify current user has admin privileges
      const currentUserDoc = await getDoc(doc(db, 'users', currentUserId));
      if (!currentUserDoc.exists()) {
        throw new Error('Current user not found');
      }
      
      const currentUser = currentUserDoc.data();
      if (!['super_admin', 'interpreter_manager'].includes(currentUser.role)) {
        throw new Error('Unauthorized: Only admins can approve users');
      }

      await updateDoc(doc(db, 'users', userId), {
        status: 'approved',
        approvedBy: currentUserId,
        approvedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to approve user');
    }
  }

  // Reject user (for admins)
  async rejectUser(userId: string, currentUserId: string): Promise<void> {
    try {
      // Verify current user has admin privileges
      const currentUserDoc = await getDoc(doc(db, 'users', currentUserId));
      if (!currentUserDoc.exists()) {
        throw new Error('Current user not found');
      }
      
      const currentUser = currentUserDoc.data();
      if (!['super_admin', 'interpreter_manager'].includes(currentUser.role)) {
        throw new Error('Unauthorized: Only admins can reject users');
      }

      await updateDoc(doc(db, 'users', userId), {
        status: 'rejected',
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to reject user');
    }
  }

  // Get pending users for approval
  async getPendingUsers(currentUserId: string): Promise<User[]> {
    try {
      // Verify current user has admin privileges
      const currentUserDoc = await getDoc(doc(db, 'users', currentUserId));
      if (!currentUserDoc.exists()) {
        throw new Error('Current user not found');
      }
      
      const currentUser = currentUserDoc.data();
      if (!['super_admin', 'interpreter_manager'].includes(currentUser.role)) {
        throw new Error('Unauthorized: Only admins can view pending users');
      }

      const usersCollection = collection(db, 'users');
      const snapshot = await getDocs(usersCollection);
      
      return snapshot.docs
        .map(doc => ({ ...doc.data(), id: doc.id } as User))
        .filter(user => user.status === 'pending');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get pending users');
    }
  }

  // Check if user has permission to access certain features
  hasPermission(user: User, requiredRole: UserRole | UserRole[]): boolean {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(user.role) && user.status === 'approved';
  }

  // Check if user can manage other users based on permission scope
  canManageUser(currentUser: User, targetUser: User): boolean {
    if (currentUser.role === 'super_admin') {
      return true;
    }
    
    if (currentUser.role === 'interpreter_manager') {
      if (currentUser.permissionScope === 'all') {
        return ['interpreter', 'client'].includes(targetUser.role);
      } else if (currentUser.permissionScope === 'interpreters_only') {
        return targetUser.role === 'interpreter';
      } else if (currentUser.permissionScope === 'clients_only') {
        return targetUser.role === 'client';
      }
    }
    
    return false;
  }
}

export const authService = new AuthService();
export default authService;