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

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'interpreter' | 'admin' | 'client';
  status?: 'active' | 'pending' | 'onboarding' | 'suspended';
  createdAt?: any;
  updatedAt?: any;
  profile?: {
    phone?: string;
    address?: string;
    languages?: string[];
    specializations?: string[];
    availability?: string;
    timezone?: string;
    biography?: string;
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
    role: 'interpreter' | 'admin',
    currentUserId: string
  ): Promise<User> {
    try {
      // Verify current user is admin
      const currentUserDoc = await getDoc(doc(db, 'users', currentUserId));
      if (!currentUserDoc.exists() || currentUserDoc.data().role !== 'admin') {
        throw new Error('Unauthorized: Only admins can create users');
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
        status: role === 'admin' ? 'active' : 'pending',
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
  async updateUserStatus(userId: string, status: User['status']): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update user status');
    }
  }
}

export const authService = new AuthService();
export default authService;