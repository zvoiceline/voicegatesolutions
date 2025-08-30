import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, doc, query, where, orderBy, Timestamp } from 'firebase/firestore';

export interface Contact {
  id?: string;
  type: 'client' | 'interpreter';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'active' | 'pending' | 'inactive' | 'suspended';
  createdAt: Timestamp;
  lastContact?: Timestamp;
  source: 'website_form' | 'interpreter_application' | 'manual' | 'import' | 'fish_integration';
  tags: string[];
  customFields: Record<string, any>;
  notes?: string;
  // Client specific
  serviceRequests?: number;
  totalSpent?: number;
  // Interpreter specific
  languages?: string[];
  specializations?: string[];
  rating?: number;
  completedJobs?: number;
  // Fish integration fields
  fishId?: string;
  fishSyncStatus?: 'synced' | 'pending' | 'error';
  fishLastSync?: Timestamp;
}

export interface CustomField {
  id?: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean';
  options?: string[];
  required: boolean;
  appliesTo: 'all' | 'clients' | 'interpreters';
  createdAt: Timestamp;
}

class ContactService {
  private contactsCollection = 'contacts';
  private customFieldsCollection = 'customFields';

  // Create a new contact
  async createContact(contactData: Omit<Contact, 'id' | 'createdAt'>): Promise<string> {
    try {
      const contact: Omit<Contact, 'id'> = {
        ...contactData,
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, this.contactsCollection), contact);
      
      // Sync with Fish if enabled
      if (this.isFishEnabled()) {
        await this.syncContactWithFish(docRef.id, contact);
      }
      
      return docRef.id;
    } catch (error: any) {
      throw new Error(`Failed to create contact: ${error.message}`);
    }
  }

  // Get all contacts
  async getAllContacts(): Promise<Contact[]> {
    try {
      const q = query(collection(db, this.contactsCollection), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Contact));
    } catch (error: any) {
      throw new Error(`Failed to fetch contacts: ${error.message}`);
    }
  }

  // Get contacts by type
  async getContactsByType(type: 'client' | 'interpreter'): Promise<Contact[]> {
    try {
      const q = query(
        collection(db, this.contactsCollection),
        where('type', '==', type),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Contact));
    } catch (error: any) {
      throw new Error(`Failed to fetch ${type} contacts: ${error.message}`);
    }
  }

  // Update contact
  async updateContact(contactId: string, updates: Partial<Contact>): Promise<void> {
    try {
      const contactRef = doc(db, this.contactsCollection, contactId);
      await updateDoc(contactRef, {
        ...updates,
        lastContact: Timestamp.now()
      });
      
      // Sync with Fish if enabled
      if (this.isFishEnabled()) {
        await this.syncContactWithFish(contactId, updates);
      }
    } catch (error: any) {
      throw new Error(`Failed to update contact: ${error.message}`);
    }
  }

  // Convert client request to contact
  async convertClientRequestToContact(clientRequest: any): Promise<string> {
    try {
      const contactData: Omit<Contact, 'id' | 'createdAt'> = {
        type: 'client',
        name: clientRequest.name,
        email: clientRequest.email,
        phone: clientRequest.phone,
        company: clientRequest.company,
        status: clientRequest.status === 'new' ? 'pending' : 'active',
        source: 'website_form',
        tags: clientRequest.serviceType ? [clientRequest.serviceType] : [],
        customFields: {
          'Priority Level': clientRequest.urgency || 'Medium',
          'Service Type': clientRequest.serviceType,
          'Preferred Languages': clientRequest.preferredLanguages?.join(', ') || '',
          'Original Request ID': clientRequest.id
        },
        notes: clientRequest.message,
        serviceRequests: 1,
        totalSpent: 0
      };
      
      return await this.createContact(contactData);
    } catch (error: any) {
      throw new Error(`Failed to convert client request: ${error.message}`);
    }
  }

  // Convert interpreter application to contact
  async convertInterpreterApplicationToContact(application: any): Promise<string> {
    try {
      const contactData: Omit<Contact, 'id' | 'createdAt'> = {
        type: 'interpreter',
        name: application.name,
        email: application.email,
        phone: application.phone,
        status: application.status === 'pending' ? 'pending' : 
                application.status === 'approved' ? 'active' : 'inactive',
        source: 'interpreter_application',
        tags: application.specializations || [],
        customFields: {
          'Certification Level': 'Basic',
          'Experience': application.experience,
          'Availability': application.availability,
          'Timezone': application.timezone,
          'Original Application ID': application.id
        },
        languages: application.languages,
        specializations: application.specializations,
        rating: 0,
        completedJobs: 0
      };
      
      return await this.createContact(contactData);
    } catch (error: any) {
      throw new Error(`Failed to convert interpreter application: ${error.message}`);
    }
  }

  // Custom Fields Management
  async createCustomField(fieldData: Omit<CustomField, 'id' | 'createdAt'>): Promise<string> {
    try {
      const field: Omit<CustomField, 'id'> = {
        ...fieldData,
        createdAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, this.customFieldsCollection), field);
      return docRef.id;
    } catch (error: any) {
      throw new Error(`Failed to create custom field: ${error.message}`);
    }
  }

  async updateCustomField(fieldId: string, updates: Partial<CustomField>): Promise<void> {
    try {
      const fieldRef = doc(db, this.customFieldsCollection, fieldId);
      await updateDoc(fieldRef, updates);
    } catch (error: any) {
      throw new Error(`Failed to update custom field: ${error.message}`);
    }
  }

  async deleteCustomField(fieldId: string): Promise<void> {
    try {
      // First, remove this field from all contacts that have it
      const contactsQuery = query(collection(db, this.contactsCollection));
      const contactsSnapshot = await getDocs(contactsQuery);
      
      // Update contacts to remove the custom field
      const updatePromises = contactsSnapshot.docs.map(async (contactDoc) => {
        const contactData = contactDoc.data();
        if (contactData.customFields && contactData.customFields[fieldId]) {
          const updatedCustomFields = { ...contactData.customFields };
          delete updatedCustomFields[fieldId];
          await updateDoc(contactDoc.ref, { customFields: updatedCustomFields });
        }
      });
      
      await Promise.all(updatePromises);
      
      // Delete the custom field document
      const fieldRef = doc(db, this.customFieldsCollection, fieldId);
      await updateDoc(fieldRef, { deleted: true }); // Soft delete
    } catch (error: any) {
      throw new Error(`Failed to delete custom field: ${error.message}`);
    }
  }

  async getAllCustomFields(): Promise<CustomField[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.customFieldsCollection));
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as CustomField));
    } catch (error: any) {
      throw new Error(`Failed to fetch custom fields: ${error.message}`);
    }
  }

  // Fish Integration Methods
  private isFishEnabled(): boolean {
    // Check if Fish integration is configured
    return process.env.REACT_APP_FISH_API_KEY !== undefined;
  }

  private async syncContactWithFish(contactId: string, contactData: Partial<Contact>): Promise<void> {
    try {
      if (!this.isFishEnabled()) return;

      const fishApiKey = process.env.REACT_APP_FISH_API_KEY;
      const fishApiUrl = process.env.REACT_APP_FISH_API_URL || 'https://api.fish.com/v1';

      // Prepare Fish contact data
      const fishContactData = {
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        company: contactData.company,
        type: contactData.type,
        status: contactData.status,
        tags: contactData.tags,
        customFields: contactData.customFields,
        source: 'voicegate_solutions',
        externalId: contactId
      };

      const response = await fetch(`${fishApiUrl}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${fishApiKey}`,
          'X-API-Version': '2024-01'
        },
        body: JSON.stringify(fishContactData)
      });

      if (!response.ok) {
        throw new Error(`Fish API error: ${response.statusText}`);
      }

      const fishResponse = await response.json();
      
      // Update contact with Fish ID
      const contactRef = doc(db, this.contactsCollection, contactId);
      await updateDoc(contactRef, {
        fishId: fishResponse.id,
        fishSyncStatus: 'synced',
        fishLastSync: Timestamp.now()
      });

    } catch (error: any) {
      console.error('Fish sync error:', error);
      
      // Update sync status to error
      const contactRef = doc(db, this.contactsCollection, contactId);
      await updateDoc(contactRef, {
        fishSyncStatus: 'error',
        fishLastSync: Timestamp.now()
      });
    }
  }

  // Bulk sync with Fish
  async bulkSyncWithFish(): Promise<{ success: number; errors: number }> {
    try {
      if (!this.isFishEnabled()) {
        throw new Error('Fish integration is not configured');
      }

      const contacts = await this.getAllContacts();
      const unsyncedContacts = contacts.filter(c => !c.fishId || c.fishSyncStatus === 'error');

      let success = 0;
      let errors = 0;

      for (const contact of unsyncedContacts) {
        try {
          await this.syncContactWithFish(contact.id!, contact);
          success++;
        } catch (error) {
          errors++;
          console.error(`Failed to sync contact ${contact.id}:`, error);
        }
      }

      return { success, errors };
    } catch (error: any) {
      throw new Error(`Bulk sync failed: ${error.message}`);
    }
  }

  // Fish webhook handler for incoming data
  async handleFishWebhook(webhookData: any): Promise<void> {
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
        default:
          console.log(`Unhandled Fish webhook event: ${event}`);
      }
    } catch (error: any) {
      console.error('Fish webhook processing error:', error);
      throw error;
    }
  }

  private async processFishContactUpdate(fishContact: any): Promise<void> {
    try {
      // Find existing contact by Fish ID
      const q = query(
        collection(db, this.contactsCollection),
        where('fishId', '==', fishContact.id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Update existing contact
        const contactDoc = querySnapshot.docs[0];
        await updateDoc(contactDoc.ref, {
          name: fishContact.name,
          email: fishContact.email,
          phone: fishContact.phone,
          company: fishContact.company,
          tags: fishContact.tags || [],
          customFields: {
            ...contactDoc.data().customFields,
            ...fishContact.customFields
          },
          fishLastSync: Timestamp.now()
        });
      } else if (fishContact.externalId) {
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
        
        await this.createContact(contactData);
      }
    } catch (error: any) {
      console.error('Error processing Fish contact update:', error);
      throw error;
    }
  }

  private async processFishContactDeletion(fishContact: any): Promise<void> {
    try {
      // Find and mark contact as inactive instead of deleting
      const q = query(
        collection(db, this.contactsCollection),
        where('fishId', '==', fishContact.id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const contactDoc = querySnapshot.docs[0];
        await updateDoc(contactDoc.ref, {
          status: 'inactive',
          notes: `Contact deleted from Fish on ${new Date().toISOString()}`,
          fishLastSync: Timestamp.now()
        });
      }
    } catch (error: any) {
      console.error('Error processing Fish contact deletion:', error);
      throw error;
    }
  }

  // Analytics and reporting
  async getContactAnalytics(): Promise<{
    totalContacts: number;
    clientContacts: number;
    interpreterContacts: number;
    activeContacts: number;
    pendingContacts: number;
    fishSyncedContacts: number;
    recentActivity: any[];
  }> {
    try {
      const contacts = await this.getAllContacts();
      
      return {
        totalContacts: contacts.length,
        clientContacts: contacts.filter(c => c.type === 'client').length,
        interpreterContacts: contacts.filter(c => c.type === 'interpreter').length,
        activeContacts: contacts.filter(c => c.status === 'active').length,
        pendingContacts: contacts.filter(c => c.status === 'pending').length,
        fishSyncedContacts: contacts.filter(c => c.fishId && c.fishSyncStatus === 'synced').length,
        recentActivity: contacts
          .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          .slice(0, 10)
          .map(c => ({
            id: c.id,
            name: c.name,
            type: c.type,
            action: 'created',
            timestamp: c.createdAt
          }))
      };
    } catch (error: any) {
      throw new Error(`Failed to get analytics: ${error.message}`);
    }
  }
}

export const contactService = new ContactService();
export default contactService;