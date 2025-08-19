import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  firestoreService,
  ClientRequest,
  InterpreterApplication,
  Resource,
  Communication,
  MailDocument
} from '../services/firestoreService';

// Interfaces are now imported from firestoreService

interface DataContextType {
  clientRequests: ClientRequest[];
  interpreterApplications: InterpreterApplication[];
  resources: Resource[];
  communications: Communication[];
  statistics: {
    totalInterpreters: number;
    activeInterpreters: number;
    pendingApplications: number;
    totalClientRequests: number;
    newClientRequests: number;
  } | null;
  loading: boolean;
  error: string | null;
  
  // Client Request methods
  addClientRequest: (request: Omit<ClientRequest, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateClientRequest: (id: string, updates: Partial<ClientRequest>) => Promise<void>;
  
  // Interpreter Application methods
  addInterpreterApplication: (application: Omit<InterpreterApplication, 'id' | 'createdAt' | 'updatedAt' | 'onboardingProgress'>) => Promise<void>;
  updateInterpreterApplication: (id: string, updates: Partial<InterpreterApplication>) => Promise<void>;
  updateInterpreterStatus: (id: string, status: string, progress?: number) => Promise<void>;
  
  // Resource methods
  addResource: (resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateResource: (id: string, updates: Partial<Resource>) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;
  
  // Communication methods
  addCommunication: (communication: Omit<Communication, 'id' | 'createdAt'>) => Promise<void>;
  updateCommunication: (id: string, updates: Partial<Communication>) => Promise<void>;
  
  // Mail Queue methods
  queueEmail: (mailData: Omit<MailDocument, 'id' | 'createdAt' | 'delivery'>) => Promise<string>;
  getMailQueue: () => Promise<MailDocument[]>;
  getMailStatus: (id: string) => Promise<MailDocument | null>;
  
  // Utility methods
  refreshData: () => Promise<void>;
  refreshStatistics: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clientRequests, setClientRequests] = useState<ClientRequest[]>([]);
  const [interpreterApplications, setInterpreterApplications] = useState<InterpreterApplication[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [statistics, setStatistics] = useState<{
    totalInterpreters: number;
    activeInterpreters: number;
    pendingApplications: number;
    totalClientRequests: number;
    newClientRequests: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          loadClientRequests(),
          loadInterpreterApplications(),
          loadResources(),
          loadCommunications(),
          refreshStatistics()
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Load data functions
  const loadClientRequests = async () => {
    const requests = await firestoreService.getClientRequests();
    setClientRequests(requests);
  };

  const loadInterpreterApplications = async () => {
    const applications = await firestoreService.getInterpreterApplications();
    setInterpreterApplications(applications);
  };

  const loadResources = async () => {
    const resourceList = await firestoreService.getResources();
    setResources(resourceList);
  };

  const loadCommunications = async () => {
    const comms = await firestoreService.getCommunications();
    setCommunications(comms);
  };

  // Client Request methods
  const addClientRequest = async (request: Omit<ClientRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await firestoreService.createClientRequest({
        ...request,
        status: 'new'
      });
      await loadClientRequests(); // Reload to get the complete object
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add client request');
      throw err;
    }
  };

  const updateClientRequest = async (id: string, updates: Partial<ClientRequest>) => {
    try {
      await firestoreService.updateClientRequest(id, updates);
      await loadClientRequests(); // Reload to get updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update client request');
      throw err;
    }
  };

  // Interpreter Application methods
  const addInterpreterApplication = async (application: Omit<InterpreterApplication, 'id' | 'createdAt' | 'updatedAt' | 'onboardingProgress'>) => {
    try {
      const applicationData = {
        ...application,
        status: 'pending' as const,
        onboardingProgress: 0
      };
      await firestoreService.createInterpreterApplication(applicationData);
      await loadInterpreterApplications(); // Reload to get the complete object
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add interpreter application');
      throw err;
    }
  };

  const updateInterpreterApplication = async (id: string, updates: Partial<InterpreterApplication>) => {
    try {
      await firestoreService.updateInterpreterApplication(id, updates);
      await loadInterpreterApplications(); // Reload to get updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update interpreter application');
      throw err;
    }
  };

  const updateInterpreterStatus = async (id: string, status: string, progress?: number) => {
    try {
      const updates: Partial<InterpreterApplication> = { status: status as InterpreterApplication['status'] };
      if (progress !== undefined) {
        updates.onboardingProgress = progress;
      }
      await updateInterpreterApplication(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update interpreter status');
      throw err;
    }
  };

  // Resource methods
  const addResource = async (resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await firestoreService.createResource(resource);
      await loadResources(); // Reload to get the complete object
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add resource');
      throw err;
    }
  };

  const updateResource = async (id: string, updates: Partial<Resource>) => {
    try {
      await firestoreService.updateResource(id, updates);
      await loadResources(); // Reload to get updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update resource');
      throw err;
    }
  };

  const deleteResource = async (id: string) => {
    try {
      await firestoreService.deleteResource(id);
      setResources(prev => prev.filter(res => res.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete resource');
      throw err;
    }
  };

  // Communication methods
  const addCommunication = async (communication: Omit<Communication, 'id' | 'createdAt'>) => {
    try {
      await firestoreService.createCommunication(communication);
      await loadCommunications(); // Reload to get the complete object
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add communication');
      throw err;
    }
  };

  const updateCommunication = async (id: string, updates: Partial<Communication>) => {
    try {
      await firestoreService.updateCommunication(id, updates);
      await loadCommunications(); // Reload to get updated data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update communication');
      throw err;
    }
  };

  // Utility methods
  const refreshData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadClientRequests(),
        loadInterpreterApplications(),
        loadResources(),
        loadCommunications()
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshStatistics = async () => {
    try {
      const stats = await firestoreService.getStatistics();
      setStatistics(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh statistics');
      throw err;
    }
  };

  // Mail Queue methods
  const queueEmail = async (mailData: Omit<MailDocument, 'id' | 'createdAt' | 'delivery'>): Promise<string> => {
    try {
      return await firestoreService.queueEmail(mailData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to queue email');
      throw err;
    }
  };

  const getMailQueue = async (): Promise<MailDocument[]> => {
    try {
      return await firestoreService.getMailQueue();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get mail queue');
      throw err;
    }
  };

  const getMailStatus = async (id: string): Promise<MailDocument | null> => {
    try {
      return await firestoreService.getMailStatus(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get mail status');
      throw err;
    }
  };

  const value: DataContextType = {
    clientRequests,
    interpreterApplications,
    resources,
    communications,
    statistics,
    loading,
    error,
    addClientRequest,
    updateClientRequest,
    addInterpreterApplication,
    updateInterpreterApplication,
    updateInterpreterStatus,
    addResource,
    updateResource,
    deleteResource,
    addCommunication,
    updateCommunication,
    queueEmail,
    getMailQueue,
    getMailStatus,
    refreshData,
    refreshStatistics
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;