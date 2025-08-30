import { collection, onSnapshot, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { contactService } from './contactService';

/**
 * Service for automatically processing new interpreter submissions and client requests
 * Converts them into contacts in the Interpreter Manager system
 */
class SubmissionProcessor {
  private unsubscribeCallbacks: (() => void)[] = [];
  private processedSubmissions = new Set<string>();
  private isProcessing = false;

  /**
   * Start monitoring for new submissions and automatically process them
   */
  startAutoProcessing() {
    if (this.isProcessing) {
      console.log('Auto-processing already started');
      return;
    }

    this.isProcessing = true;
    console.log('Starting automatic submission processing...');

    // Monitor new client requests
    this.monitorClientRequests();
    
    // Monitor new interpreter applications
    this.monitorInterpreterApplications();
  }

  /**
   * Stop monitoring for new submissions
   */
  stopAutoProcessing() {
    this.unsubscribeCallbacks.forEach(unsubscribe => unsubscribe());
    this.unsubscribeCallbacks = [];
    this.isProcessing = false;
    console.log('Stopped automatic submission processing');
  }

  /**
   * Monitor for new client service requests
   */
  private monitorClientRequests() {
    try {
      const clientRequestsRef = collection(db, 'clientRequests');
      const q = query(
        clientRequestsRef,
        where('processed', '==', false),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const newRequests = snapshot.docs.filter(doc => 
          !this.processedSubmissions.has(doc.id)
        );

        if (newRequests.length > 0) {
          console.log(`Processing ${newRequests.length} new client requests`);
          
          for (const doc of newRequests) {
            try {
              const requestData = { id: doc.id, ...doc.data() };
              await this.processClientRequest(requestData);
              this.processedSubmissions.add(doc.id);
            } catch (error) {
              console.error(`Error processing client request ${doc.id}:`, error);
            }
          }
        }
      }, (error) => {
        console.error('Error monitoring client requests:', error);
      });

      this.unsubscribeCallbacks.push(unsubscribe);
    } catch (error) {
      console.error('Error setting up client request monitoring:', error);
    }
  }

  /**
   * Monitor for new interpreter applications
   */
  private monitorInterpreterApplications() {
    try {
      const interpreterApplicationsRef = collection(db, 'interpreterApplications');
      const q = query(
        interpreterApplicationsRef,
        where('processed', '==', false),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const newApplications = snapshot.docs.filter(doc => 
          !this.processedSubmissions.has(doc.id)
        );

        if (newApplications.length > 0) {
          console.log(`Processing ${newApplications.length} new interpreter applications`);
          
          for (const doc of newApplications) {
            try {
              const applicationData = { id: doc.id, ...doc.data() };
              await this.processInterpreterApplication(applicationData);
              this.processedSubmissions.add(doc.id);
            } catch (error) {
              console.error(`Error processing interpreter application ${doc.id}:`, error);
            }
          }
        }
      }, (error) => {
        console.error('Error monitoring interpreter applications:', error);
      });

      this.unsubscribeCallbacks.push(unsubscribe);
    } catch (error) {
      console.error('Error setting up interpreter application monitoring:', error);
    }
  }

  /**
   * Process a single client request and convert to contact
   */
  private async processClientRequest(request: any) {
    try {
      // Check if contact already exists
      const existingContacts = await contactService.getAllContacts();
      const existingContact = existingContacts.find(contact => 
        contact.customFields?.['Original Request ID'] === request.id ||
        (contact.email === request.email && contact.type === 'client')
      );

      if (existingContact) {
        console.log(`Contact already exists for client request ${request.id}`);
        return;
      }

      // Convert to contact
      const contactId = await contactService.convertClientRequestToContact(request);
      
      // Mark as processed in original collection
      await this.markAsProcessed('clientRequests', request.id);
      
      console.log(`Successfully processed client request ${request.id} -> contact ${contactId}`);
      
      // Trigger Fish integration if available
      await this.triggerFishIntegration('client', contactId, request);
      
    } catch (error) {
      console.error(`Error processing client request ${request.id}:`, error);
      throw error;
    }
  }

  /**
   * Process a single interpreter application and convert to contact
   */
  private async processInterpreterApplication(application: any) {
    try {
      // Check if contact already exists
      const existingContacts = await contactService.getAllContacts();
      const existingContact = existingContacts.find(contact => 
        contact.customFields?.['Original Application ID'] === application.id ||
        (contact.email === application.email && contact.type === 'interpreter')
      );

      if (existingContact) {
        console.log(`Contact already exists for interpreter application ${application.id}`);
        return;
      }

      // Convert to contact
      const contactId = await contactService.convertInterpreterApplicationToContact(application);
      
      // Mark as processed in original collection
      await this.markAsProcessed('interpreterApplications', application.id);
      
      console.log(`Successfully processed interpreter application ${application.id} -> contact ${contactId}`);
      
      // Trigger Fish integration if available
      await this.triggerFishIntegration('interpreter', contactId, application);
      
    } catch (error) {
      console.error(`Error processing interpreter application ${application.id}:`, error);
      throw error;
    }
  }

  /**
   * Mark a submission as processed in Firestore
   */
  private async markAsProcessed(collectionName: string, documentId: string) {
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, {
        processed: true,
        processedAt: Timestamp.now(),
        processedBy: 'InterpreterManager'
      });
    } catch (error) {
      console.error(`Error marking ${collectionName}/${documentId} as processed:`, error);
    }
  }

  /**
   * Trigger Fish integration for new contacts
   */
  private async triggerFishIntegration(type: 'client' | 'interpreter', contactId: string, originalData: any) {
    try {
      // This will be implemented when Fish integration is added
      console.log(`Fish integration triggered for ${type} contact ${contactId}`);
      
      // Placeholder for Fish API calls
      // await fishService.syncContact(contactId, type, originalData);
      
    } catch (error) {
      console.error(`Error triggering Fish integration for contact ${contactId}:`, error);
    }
  }

  /**
   * Process all existing unprocessed submissions (one-time batch process)
   */
  async processPendingSubmissions() {
    console.log('Processing all pending submissions...');
    
    try {
      // Process pending client requests
      const { getDocs } = await import('firebase/firestore');
      const clientRequestsRef = collection(db, 'clientRequests');
      const clientQuery = query(
        clientRequestsRef,
        where('processed', '!=', true)
      );
      
      const clientSnapshot = await getDocs(clientQuery);
      console.log(`Found ${clientSnapshot.docs.length} pending client requests`);
      
      for (const doc of clientSnapshot.docs) {
        const requestData = { id: doc.id, ...doc.data() };
        await this.processClientRequest(requestData);
      }
      
      // Process pending interpreter applications
      const interpreterApplicationsRef = collection(db, 'interpreterApplications');
      const interpreterQuery = query(
        interpreterApplicationsRef,
        where('processed', '!=', true)
      );
      
      const interpreterSnapshot = await getDocs(interpreterQuery);
      console.log(`Found ${interpreterSnapshot.docs.length} pending interpreter applications`);
      
      for (const doc of interpreterSnapshot.docs) {
        const applicationData = { id: doc.id, ...doc.data() };
        await this.processInterpreterApplication(applicationData);
      }
      
      console.log('Finished processing all pending submissions');
      
    } catch (error) {
      console.error('Error processing pending submissions:', error);
      throw error;
    }
  }

  /**
   * Get processing statistics
   */
  getProcessingStats() {
    return {
      isProcessing: this.isProcessing,
      processedCount: this.processedSubmissions.size,
      activeMonitors: this.unsubscribeCallbacks.length
    };
  }
}

// Export singleton instance
export const submissionProcessor = new SubmissionProcessor();
export default submissionProcessor;