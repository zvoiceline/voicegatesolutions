import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Data interfaces
export interface ClientRequest {
  id?: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  serviceType?: string;
  urgency?: 'low' | 'medium' | 'high';
  preferredLanguages?: string[];
  createdAt: Timestamp | any;
  updatedAt: Timestamp | any;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'closed';
  assignedTo?: string; // Admin user ID
  notes?: string;
}

export interface InterpreterApplication {
  id?: string;
  userId?: string; // Reference to user document
  name: string;
  email: string;
  phone: string;
  address: string;
  languages: string[];
  certifications?: string[];
  experience: string;
  specializations: string[];
  availability: string;
  timezone: string;
  resume?: string; // File URL
  additionalDocuments?: string[]; // File URLs
  additionalInfo: string;
  createdAt: Timestamp | any;
  updatedAt: Timestamp | any;
  status: 'pending' | 'approved' | 'rejected' | 'interview_scheduled';
  onboardingProgress: number; // 0-6 steps
  reviewNotes?: string;
  reviewedBy?: string; // Admin user ID
  reviewedAt?: Timestamp | any;
}

export interface Resource {
  id?: string;
  title: string;
  description?: string;
  type: 'document' | 'video' | 'guide' | 'training';
  category: 'onboarding' | 'training' | 'reference' | 'policy';
  url: string;
  fileSize?: number;
  targetAudience: 'all' | 'interpreters' | 'admins';
  isRequired?: boolean;
  createdAt: Timestamp | any;
  updatedAt: Timestamp | any;
  createdBy: string; // Admin user ID
}

export interface Communication {
  id?: string;
  type: 'email' | 'sms' | 'notification';
  subject: string;
  content: string;
  recipients: string[]; // User IDs or email addresses
  recipientType: 'all' | 'interpreters' | 'admins' | 'specific';
  status: 'draft' | 'sent' | 'scheduled';
  scheduledFor?: Timestamp | any;
  sentAt?: Timestamp | any;
  createdAt: Timestamp | any;
  createdBy: string; // Admin user ID
}

export interface MailDocument {
  id?: string;
  to: string | string[];
  from?: string;
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
  template?: {
    name: string;
    data: Record<string, any>;
  };
  delivery?: {
    startTime?: Timestamp | any;
    endTime?: Timestamp | any;
    leaseExpireTime?: Timestamp | any;
    state?: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'ERROR';
    attempts?: number;
    error?: string;
  };
  createdAt?: Timestamp | any;
}

class FirestoreService {
  // Client Requests
  async createClientRequest(request: Omit<ClientRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'clientRequests'), {
        ...request,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error: any) {
      throw new Error(`Failed to create client request: ${error.message}`);
    }
  }

  async getClientRequests(): Promise<ClientRequest[]> {
    try {
      const q = query(collection(db, 'clientRequests'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClientRequest[];
    } catch (error: any) {
      throw new Error(`Failed to fetch client requests: ${error.message}`);
    }
  }

  async updateClientRequest(id: string, updates: Partial<ClientRequest>): Promise<void> {
    try {
      await updateDoc(doc(db, 'clientRequests', id), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(`Failed to update client request: ${error.message}`);
    }
  }

  // Interpreter Applications
  async createInterpreterApplication(
    application: Omit<InterpreterApplication, 'id' | 'createdAt' | 'updatedAt' | 'onboardingProgress'>
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'interpreterApplications'), {
        ...application,
        onboardingProgress: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error: any) {
      throw new Error(`Failed to create interpreter application: ${error.message}`);
    }
  }

  async getInterpreterApplications(): Promise<InterpreterApplication[]> {
    try {
      const q = query(collection(db, 'interpreterApplications'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InterpreterApplication[];
    } catch (error: any) {
      throw new Error(`Failed to fetch interpreter applications: ${error.message}`);
    }
  }

  async updateInterpreterApplication(id: string, updates: Partial<InterpreterApplication>): Promise<void> {
    try {
      await updateDoc(doc(db, 'interpreterApplications', id), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(`Failed to update interpreter application: ${error.message}`);
    }
  }

  async getInterpreterApplicationsByStatus(status: InterpreterApplication['status']): Promise<InterpreterApplication[]> {
    try {
      const q = query(
        collection(db, 'interpreterApplications'),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InterpreterApplication[];
    } catch (error: any) {
      throw new Error(`Failed to fetch interpreter applications by status: ${error.message}`);
    }
  }

  // Resources
  async createResource(resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'resources'), {
        ...resource,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error: any) {
      throw new Error(`Failed to create resource: ${error.message}`);
    }
  }

  async getResources(targetAudience?: Resource['targetAudience']): Promise<Resource[]> {
    try {
      let q;
      if (targetAudience && targetAudience !== 'all') {
        q = query(
          collection(db, 'resources'),
          where('targetAudience', 'in', [targetAudience, 'all']),
          orderBy('createdAt', 'desc')
        );
      } else {
        q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resource[];
    } catch (error: any) {
      throw new Error(`Failed to fetch resources: ${error.message}`);
    }
  }

  async updateResource(id: string, updates: Partial<Resource>): Promise<void> {
    try {
      await updateDoc(doc(db, 'resources', id), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(`Failed to update resource: ${error.message}`);
    }
  }

  async deleteResource(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'resources', id));
    } catch (error: any) {
      throw new Error(`Failed to delete resource: ${error.message}`);
    }
  }

  // Communications
  async createCommunication(communication: Omit<Communication, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'communications'), {
        ...communication,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error: any) {
      throw new Error(`Failed to create communication: ${error.message}`);
    }
  }

  async getCommunications(): Promise<Communication[]> {
    try {
      const q = query(collection(db, 'communications'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Communication[];
    } catch (error: any) {
      throw new Error(`Failed to fetch communications: ${error.message}`);
    }
  }

  async updateCommunication(id: string, updates: Partial<Communication>): Promise<void> {
    try {
      await updateDoc(doc(db, 'communications', id), {
        ...updates
      });
    } catch (error: any) {
      throw new Error(`Failed to update communication: ${error.message}`);
    }
  }

  // Mail Queue Operations (for Firebase Extension)
  async queueEmail(mailData: Omit<MailDocument, 'id' | 'createdAt' | 'delivery'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'mail'), {
        ...mailData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error queuing email:', error);
      throw error;
    }
  }

  async getMailQueue(): Promise<MailDocument[]> {
    try {
      const q = query(collection(db, 'mail'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MailDocument[];
    } catch (error) {
      console.error('Error getting mail queue:', error);
      throw error;
    }
  }

  async getMailStatus(id: string): Promise<MailDocument | null> {
    try {
      const docRef = doc(db, 'mail', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as MailDocument;
      }
      return null;
    } catch (error) {
      console.error('Error getting mail status:', error);
      throw error;
    }
  }

  // Real-time listeners
  onClientRequestsChange(callback: (requests: ClientRequest[]) => void): () => void {
    const q = query(collection(db, 'clientRequests'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const requests = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClientRequest[];
      callback(requests);
    });
  }

  onInterpreterApplicationsChange(callback: (applications: InterpreterApplication[]) => void): () => void {
    const q = query(collection(db, 'interpreterApplications'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const applications = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InterpreterApplication[];
      callback(applications);
    });
  }

  onResourcesChange(callback: (resources: Resource[]) => void): () => void {
    const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const resources = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resource[];
      callback(resources);
    });
  }

  // Analytics and Statistics
  async getStatistics(): Promise<{
    totalInterpreters: number;
    activeInterpreters: number;
    pendingApplications: number;
    totalClientRequests: number;
    newClientRequests: number;
  }> {
    try {
      const [interpretersSnapshot, clientRequestsSnapshot] = await Promise.all([
        getDocs(collection(db, 'interpreterApplications')),
        getDocs(collection(db, 'clientRequests'))
      ]);

      const interpreters = interpretersSnapshot.docs.map(doc => doc.data()) as InterpreterApplication[];
      const clientRequests = clientRequestsSnapshot.docs.map(doc => doc.data()) as ClientRequest[];

      return {
        totalInterpreters: interpreters.length,
        activeInterpreters: interpreters.filter(i => i.status === 'approved').length,
        pendingApplications: interpreters.filter(i => i.status === 'pending').length,
        totalClientRequests: clientRequests.length,
        newClientRequests: clientRequests.filter(r => r.status === 'new').length
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch statistics: ${error.message}`);
    }
  }
}

export const firestoreService = new FirestoreService();
export default firestoreService;