import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, doc, query, where, orderBy, Timestamp, writeBatch } from 'firebase/firestore';
import { contactService, Contact } from './contactService';

export interface FishSyncLog {
  id?: string;
  operation: 'sync' | 'webhook' | 'bulk_sync' | 'conflict_resolution';
  status: 'success' | 'error' | 'warning';
  contactId?: string;
  fishId?: string;
  message: string;
  details?: any;
  timestamp: Timestamp;
}

export interface FishConfig {
  apiKey: string;
  apiUrl: string;
  webhookSecret: string;
  syncInterval: number; // minutes
  autoSync: boolean;
  conflictResolution: 'fish_wins' | 'local_wins' | 'manual';
  enabledFeatures: {
    bidirectionalSync: boolean;
    realTimeUpdates: boolean;
    bulkOperations: boolean;
    customFieldMapping: boolean;
  };
}

export interface FishSyncStats {
  totalContacts: number;
  syncedContacts: number;
  pendingSync: number;
  errorContacts: number;
  lastSyncTime?: Timestamp;
  syncSuccess: number;
  syncErrors: number;
  conflictsResolved: number;
}

class FishIntegrationService {
  private syncLogsCollection = 'fishSyncLogs';
  private configCollection = 'fishConfig';
  private syncInterval: NodeJS.Timeout | null = null;

  // Configuration Management
  async getFishConfig(): Promise<FishConfig | null> {
    try {
      const configQuery = query(collection(db, this.configCollection));
      const configSnapshot = await getDocs(configQuery);
      
      if (!configSnapshot.empty) {
        return configSnapshot.docs[0].data() as FishConfig;
      }
      return null;
    } catch (error: any) {
      console.error('Error getting Fish config:', error);
      return null;
    }
  }

  async updateFishConfig(config: Partial<FishConfig>): Promise<void> {
    try {
      const configQuery = query(collection(db, this.configCollection));
      const configSnapshot = await getDocs(configQuery);
      
      if (!configSnapshot.empty) {
        const configDoc = configSnapshot.docs[0];
        await updateDoc(configDoc.ref, config);
      } else {
        await addDoc(collection(db, this.configCollection), {
          ...config,
          createdAt: Timestamp.now()
        });
      }
    } catch (error: any) {
      throw new Error(`Failed to update Fish config: ${error.message}`);
    }
  }

  // Enhanced Sync Operations
  async syncContactWithFish(contactId: string, options: {
    forceSync?: boolean;
    direction?: 'to_fish' | 'from_fish' | 'bidirectional';
  } = {}): Promise<void> {
    const config = await this.getFishConfig();
    if (!config || !config.apiKey) {
      throw new Error('Fish integration not configured');
    }

    try {
      const contacts = await contactService.getAllContacts();
      const contact = contacts.find(c => c.id === contactId);
      
      if (!contact) {
        throw new Error('Contact not found');
      }

      const direction = options.direction || 'to_fish';
      
      if (direction === 'to_fish' || direction === 'bidirectional') {
        await this.pushContactToFish(contact, config);
      }
      
      if (direction === 'from_fish' || direction === 'bidirectional') {
        await this.pullContactFromFish(contact.fishId!, config);
      }

      await this.logSyncOperation({
        operation: 'sync',
        status: 'success',
        contactId,
        fishId: contact.fishId,
        message: `Contact synced successfully (${direction})`,
        timestamp: Timestamp.now()
      });

    } catch (error: any) {
      await this.logSyncOperation({
        operation: 'sync',
        status: 'error',
        contactId,
        message: `Sync failed: ${error.message}`,
        details: error,
        timestamp: Timestamp.now()
      });
      throw error;
    }
  }

  private async pushContactToFish(contact: Contact, config: FishConfig): Promise<void> {
    const fishContactData = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      type: contact.type,
      status: contact.status,
      tags: contact.tags,
      customFields: contact.customFields,
      source: 'voicegate_solutions',
      externalId: contact.id,
      lastModified: contact.lastContact?.toDate().toISOString()
    };

    const url = contact.fishId 
      ? `${config.apiUrl}/contacts/${contact.fishId}`
      : `${config.apiUrl}/contacts`;
    
    const method = contact.fishId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
        'X-API-Version': '2024-01'
      },
      body: JSON.stringify(fishContactData)
    });

    if (!response.ok) {
      throw new Error(`Fish API error: ${response.statusText}`);
    }

    const fishResponse = await response.json();
    
    // Update contact with Fish ID if it's a new contact
    if (!contact.fishId) {
      await contactService.updateContact(contact.id!, {
        fishId: fishResponse.id,
        fishSyncStatus: 'synced',
        fishLastSync: Timestamp.now()
      });
    } else {
      await contactService.updateContact(contact.id!, {
        fishSyncStatus: 'synced',
        fishLastSync: Timestamp.now()
      });
    }
  }

  private async pullContactFromFish(fishId: string, config: FishConfig): Promise<void> {
    const response = await fetch(`${config.apiUrl}/contacts/${fishId}`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'X-API-Version': '2024-01'
      }
    });

    if (!response.ok) {
      throw new Error(`Fish API error: ${response.statusText}`);
    }

    const fishContact = await response.json();
    
    // Find local contact by Fish ID
    const contacts = await contactService.getAllContacts();
    const localContact = contacts.find(c => c.fishId === fishId);

    if (localContact) {
      // Check for conflicts
      const hasConflicts = await this.detectConflicts(localContact, fishContact);
      
      if (hasConflicts && config.conflictResolution === 'manual') {
        await this.logSyncOperation({
          operation: 'sync',
          status: 'warning',
          contactId: localContact.id,
          fishId,
          message: 'Conflict detected - manual resolution required',
          details: { localContact, fishContact },
          timestamp: Timestamp.now()
        });
        return;
      }

      const shouldUpdate = config.conflictResolution === 'fish_wins' || !hasConflicts;
      
      if (shouldUpdate) {
        await contactService.updateContact(localContact.id!, {
          name: fishContact.name,
          email: fishContact.email,
          phone: fishContact.phone,
          company: fishContact.company,
          tags: fishContact.tags || localContact.tags,
          customFields: {
            ...localContact.customFields,
            ...fishContact.customFields
          },
          fishLastSync: Timestamp.now()
        });
      }
    }
  }

  private async detectConflicts(localContact: Contact, fishContact: any): Promise<boolean> {
    const localModified = localContact.lastContact?.toDate() || localContact.createdAt.toDate();
    const fishModified = new Date(fishContact.lastModified || fishContact.updatedAt);
    
    // Check if both have been modified recently (within 5 minutes of each other)
    const timeDiff = Math.abs(localModified.getTime() - fishModified.getTime());
    const hasTimeConflict = timeDiff < 5 * 60 * 1000; // 5 minutes
    
    // Check for data conflicts
    const hasDataConflict = 
      localContact.name !== fishContact.name ||
      localContact.email !== fishContact.email ||
      localContact.phone !== fishContact.phone;
    
    return hasTimeConflict && hasDataConflict;
  }

  // Bulk Operations
  async bulkSyncWithFish(options: {
    direction?: 'to_fish' | 'from_fish' | 'bidirectional';
    contactIds?: string[];
    batchSize?: number;
  } = {}): Promise<{ success: number; errors: number; conflicts: number }> {
    const config = await this.getFishConfig();
    if (!config || !config.apiKey) {
      throw new Error('Fish integration not configured');
    }

    const { direction = 'bidirectional', batchSize = 50 } = options;
    let { contactIds } = options;
    
    if (!contactIds) {
      const contacts = await contactService.getAllContacts();
      contactIds = contacts
        .filter(c => !c.fishId || c.fishSyncStatus === 'error')
        .map(c => c.id!)
        .slice(0, 100); // Limit to 100 contacts for safety
    }

    let success = 0;
    let errors = 0;
    let conflicts = 0;

    // Process in batches
    for (let i = 0; i < contactIds.length; i += batchSize) {
      const batch = contactIds.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (contactId) => {
        try {
          await this.syncContactWithFish(contactId, { direction });
          return { status: 'success' };
        } catch (error: any) {
          if (error.message.includes('Conflict detected')) {
            return { status: 'conflict' };
          }
          return { status: 'error', error };
        }
      });

      const results = await Promise.allSettled(batchPromises);
      
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          switch (result.value.status) {
            case 'success':
              success++;
              break;
            case 'conflict':
              conflicts++;
              break;
            case 'error':
              errors++;
              break;
          }
        } else {
          errors++;
        }
      });

      // Add delay between batches to avoid rate limiting
      if (i + batchSize < contactIds.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    await this.logSyncOperation({
      operation: 'bulk_sync',
      status: errors > success ? 'error' : 'success',
      message: `Bulk sync completed: ${success} success, ${errors} errors, ${conflicts} conflicts`,
      details: { success, errors, conflicts, direction },
      timestamp: Timestamp.now()
    });

    return { success, errors, conflicts };
  }

  // Real-time Sync Management
  async startRealTimeSync(): Promise<void> {
    const config = await this.getFishConfig();
    if (!config || !config.autoSync) {
      return;
    }

    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    this.syncInterval = setInterval(async () => {
      try {
        await this.bulkSyncWithFish({ direction: 'bidirectional', batchSize: 25 });
      } catch (error) {
        console.error('Real-time sync error:', error);
      }
    }, config.syncInterval * 60 * 1000); // Convert minutes to milliseconds
  }

  async stopRealTimeSync(): Promise<void> {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  // Webhook Management
  async handleFishWebhook(webhookData: any, signature: string): Promise<void> {
    const config = await this.getFishConfig();
    if (!config) {
      throw new Error('Fish integration not configured');
    }

    // Verify webhook signature
    if (!this.verifyWebhookSignature(webhookData, signature, config.webhookSecret)) {
      throw new Error('Invalid webhook signature');
    }

    try {
      const { event, data } = webhookData;

      switch (event) {
        case 'contact.created':
        case 'contact.updated':
          await this.processFishContactUpdate(data);
          break;
        case 'contact.deleted':
          await this.processFishContactDeletion(data);
          break;
        case 'contact.merged':
          await this.processFishContactMerge(data);
          break;
        default:
          console.log(`Unhandled Fish webhook event: ${event}`);
      }

      await this.logSyncOperation({
        operation: 'webhook',
        status: 'success',
        fishId: data.id,
        message: `Webhook processed: ${event}`,
        details: { event, data },
        timestamp: Timestamp.now()
      });

    } catch (error: any) {
      await this.logSyncOperation({
        operation: 'webhook',
        status: 'error',
        message: `Webhook processing failed: ${error.message}`,
        details: { webhookData, error },
        timestamp: Timestamp.now()
      });
      throw error;
    }
  }

  private verifyWebhookSignature(payload: any, signature: string, secret: string): boolean {
    // Implement HMAC signature verification
    // This is a placeholder - implement actual signature verification
    return true;
  }

  private async processFishContactUpdate(fishContact: any): Promise<void> {
    const contacts = await contactService.getAllContacts();
    const existingContact = contacts.find(c => c.fishId === fishContact.id);

    if (existingContact) {
      await contactService.updateContact(existingContact.id!, {
        name: fishContact.name,
        email: fishContact.email,
        phone: fishContact.phone,
        company: fishContact.company,
        tags: fishContact.tags || existingContact.tags,
        customFields: {
          ...existingContact.customFields,
          ...fishContact.customFields
        },
        fishLastSync: Timestamp.now()
      });
    } else {
      // Create new contact from Fish data
      const contactData: Omit<Contact, 'id' | 'createdAt'> = {
        type: fishContact.type || 'client',
        name: fishContact.name,
        email: fishContact.email,
        phone: fishContact.phone,
        company: fishContact.company,
        status: 'active',
        source: 'fish_integration',
        tags: fishContact.tags || [],
        customFields: fishContact.customFields || {},
        fishId: fishContact.id,
        fishSyncStatus: 'synced',
        fishLastSync: Timestamp.now()
      };
      
      await contactService.createContact(contactData);
    }
  }

  private async processFishContactDeletion(fishContact: any): Promise<void> {
    const contacts = await contactService.getAllContacts();
    const existingContact = contacts.find(c => c.fishId === fishContact.id);

    if (existingContact) {
      // Mark as inactive instead of deleting
      await contactService.updateContact(existingContact.id!, {
        status: 'inactive',
        tags: [...existingContact.tags, 'deleted_from_fish'],
        fishSyncStatus: 'synced',
        fishLastSync: Timestamp.now()
      });
    }
  }

  private async processFishContactMerge(mergeData: any): Promise<void> {
    const { primaryContact, mergedContact } = mergeData;
    const contacts = await contactService.getAllContacts();
    
    const primaryLocal = contacts.find(c => c.fishId === primaryContact.id);
    const mergedLocal = contacts.find(c => c.fishId === mergedContact.id);

    if (primaryLocal && mergedLocal) {
      // Merge data into primary contact
      await contactService.updateContact(primaryLocal.id!, {
        tags: [...new Set([...primaryLocal.tags, ...mergedLocal.tags])],
        customFields: {
          ...mergedLocal.customFields,
          ...primaryLocal.customFields
        },
        notes: [primaryLocal.notes, mergedLocal.notes].filter(Boolean).join('\n\n'),
        fishLastSync: Timestamp.now()
      });

      // Mark merged contact as inactive
      await contactService.updateContact(mergedLocal.id!, {
        status: 'inactive',
        tags: [...mergedLocal.tags, 'merged_in_fish'],
        fishLastSync: Timestamp.now()
      });
    }
  }

  // Analytics and Reporting
  async getFishSyncStats(): Promise<FishSyncStats> {
    try {
      const contacts = await contactService.getAllContacts();
      const syncedContacts = contacts.filter(c => c.fishId && c.fishSyncStatus === 'synced');
      const pendingSync = contacts.filter(c => c.fishSyncStatus === 'pending');
      const errorContacts = contacts.filter(c => c.fishSyncStatus === 'error');

      // Get recent sync logs
      const logsQuery = query(
        collection(db, this.syncLogsCollection),
        orderBy('timestamp', 'desc')
      );
      const logsSnapshot = await getDocs(logsQuery);
      const logs = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FishSyncLog[];

      const recentLogs = logs.slice(0, 100); // Last 100 operations
      const successCount = recentLogs.filter(l => l.status === 'success').length;
      const errorCount = recentLogs.filter(l => l.status === 'error').length;
      const conflictCount = recentLogs.filter(l => l.message.includes('conflict')).length;

      const lastSyncLog = logs.find(l => l.operation === 'bulk_sync' || l.operation === 'sync');

      return {
        totalContacts: contacts.length,
        syncedContacts: syncedContacts.length,
        pendingSync: pendingSync.length,
        errorContacts: errorContacts.length,
        lastSyncTime: lastSyncLog?.timestamp,
        syncSuccess: successCount,
        syncErrors: errorCount,
        conflictsResolved: conflictCount
      };
    } catch (error: any) {
      throw new Error(`Failed to get sync stats: ${error.message}`);
    }
  }

  async getSyncLogs(limit: number = 50): Promise<FishSyncLog[]> {
    try {
      const logsQuery = query(
        collection(db, this.syncLogsCollection),
        orderBy('timestamp', 'desc')
      );
      const logsSnapshot = await getDocs(logsQuery);
      
      return logsSnapshot.docs
        .slice(0, limit)
        .map(doc => ({ id: doc.id, ...doc.data() })) as FishSyncLog[];
    } catch (error: any) {
      throw new Error(`Failed to get sync logs: ${error.message}`);
    }
  }

  private async logSyncOperation(logData: Omit<FishSyncLog, 'id'>): Promise<void> {
    try {
      await addDoc(collection(db, this.syncLogsCollection), logData);
    } catch (error) {
      console.error('Failed to log sync operation:', error);
    }
  }

  // Conflict Resolution
  async getConflicts(): Promise<Array<{
    contactId: string;
    fishId: string;
    localData: Contact;
    fishData: any;
    conflictFields: string[];
  }>> {
    const logs = await this.getSyncLogs(200);
    const conflictLogs = logs.filter(l => l.status === 'warning' && l.message.includes('conflict'));
    
    return conflictLogs.map(log => ({
      contactId: log.contactId!,
      fishId: log.fishId!,
      localData: log.details.localContact,
      fishData: log.details.fishContact,
      conflictFields: this.identifyConflictFields(log.details.localContact, log.details.fishContact)
    }));
  }

  private identifyConflictFields(localContact: Contact, fishContact: any): string[] {
    const conflicts: string[] = [];
    
    if (localContact.name !== fishContact.name) conflicts.push('name');
    if (localContact.email !== fishContact.email) conflicts.push('email');
    if (localContact.phone !== fishContact.phone) conflicts.push('phone');
    if (localContact.company !== fishContact.company) conflicts.push('company');
    
    return conflicts;
  }

  async resolveConflict(contactId: string, fishId: string, resolution: 'use_local' | 'use_fish' | 'merge'): Promise<void> {
    const contacts = await contactService.getAllContacts();
    const localContact = contacts.find(c => c.id === contactId);
    
    if (!localContact) {
      throw new Error('Local contact not found');
    }

    const config = await this.getFishConfig();
    if (!config) {
      throw new Error('Fish integration not configured');
    }

    // Get Fish contact data
    const response = await fetch(`${config.apiUrl}/contacts/${fishId}`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'X-API-Version': '2024-01'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Fish contact data');
    }

    const fishContact = await response.json();

    switch (resolution) {
      case 'use_local':
        await this.pushContactToFish(localContact, config);
        break;
      case 'use_fish':
        await this.pullContactFromFish(fishId, config);
        break;
      case 'merge':
        // Implement smart merge logic
        const mergedData = {
          name: localContact.name || fishContact.name,
          email: localContact.email || fishContact.email,
          phone: localContact.phone || fishContact.phone,
          company: localContact.company || fishContact.company,
          tags: [...new Set([...localContact.tags, ...(fishContact.tags || [])])],
          customFields: {
            ...fishContact.customFields,
            ...localContact.customFields
          }
        };
        
        await contactService.updateContact(contactId, mergedData);
        await this.pushContactToFish({ ...localContact, ...mergedData }, config);
        break;
    }

    await this.logSyncOperation({
      operation: 'conflict_resolution',
      status: 'success',
      contactId,
      fishId,
      message: `Conflict resolved using ${resolution}`,
      timestamp: Timestamp.now()
    });
  }
}

export const fishIntegrationService = new FishIntegrationService();
export default fishIntegrationService;