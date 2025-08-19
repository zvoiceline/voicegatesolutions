import { MailDocument } from './firestoreService';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

class EmailTemplateService {
  // Contact form submission email to admin
  generateContactFormNotification(formData: ContactFormData): EmailTemplate {
    const subject = `New Contact Form Submission from ${formData.name}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #2563eb; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #111827;">${formData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0; color: #111827;">
                  <a href="mailto:${formData.email}" style="color: #2563eb; text-decoration: none;">${formData.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Company:</td>
                <td style="padding: 8px 0; color: #111827;">${formData.company}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">Message</h3>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
              <p style="margin: 0; color: #374151; line-height: 1.6;">${formData.message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This email was sent from the Voicegate Solutions contact form.
            </p>
          </div>
        </div>
      </div>
    `;
    
    const text = `
New Contact Form Submission

Contact Information:
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}

Message:
${formData.message}

---
This email was sent from the Voicegate Solutions contact form.
    `;
    
    return { subject, html, text };
  }
  
  // Auto-reply email to the person who submitted the contact form
  generateContactFormAutoReply(formData: ContactFormData): EmailTemplate {
    const subject = 'Thank you for contacting Voicegate Solutions';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 28px;">Voicegate Solutions</h1>
            <p style="color: #6b7280; margin: 5px 0 0 0;">Professional Language Services</p>
          </div>
          
          <h2 style="color: #374151; margin-bottom: 20px;">Thank you for your inquiry, ${formData.name}!</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            We have received your message and appreciate your interest in our language services. 
            Our team will review your request and respond within <strong>2 hours</strong> during business hours.
          </p>
          
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 6px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">What happens next?</h3>
            <ul style="color: #374151; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Our team will review your specific requirements</li>
              <li style="margin-bottom: 8px;">We'll match you with the most suitable language professionals</li>
              <li style="margin-bottom: 8px;">You'll receive a customized quote and service proposal</li>
              <li>We'll schedule a consultation to discuss your needs in detail</li>
            </ul>
          </div>
          
          <div style="margin: 30px 0;">
            <h3 style="color: #374151; margin-bottom: 15px;">Need immediate assistance?</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
              <div style="flex: 1; min-width: 200px;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">📞 Call us:</p>
                <p style="margin: 5px 0 0 0; color: #2563eb; font-weight: bold;">1-800-VOICE-LS</p>
                <p style="margin: 0; color: #6b7280; font-size: 12px;">Available 24/7 for urgent requests</p>
              </div>
              <div style="flex: 1; min-width: 200px;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">✉️ Email us:</p>
                <p style="margin: 5px 0 0 0; color: #2563eb; font-weight: bold;">support@voiceline-ls.com</p>
                <p style="margin: 0; color: #6b7280; font-size: 12px;">We respond within 2 hours</p>
              </div>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Best regards,<br>
              <strong>The Voicegate Solutions Team</strong>
            </p>
          </div>
        </div>
      </div>
    `;
    
    const text = `
Thank you for contacting Voicegate Solutions!

Dear ${formData.name},

We have received your message and appreciate your interest in our language services. Our team will review your request and respond within 2 hours during business hours.

What happens next?
• Our team will review your specific requirements
• We'll match you with the most suitable language professionals  
• You'll receive a customized quote and service proposal
• We'll schedule a consultation to discuss your needs in detail

Need immediate assistance?
📞 Call us: 1-800-VOICE-LS (Available 24/7 for urgent requests)
✉️ Email us: support@voiceline-ls.com (We respond within 2 hours)

Best regards,
The Voicegate Solutions Team
    `;
    
    return { subject, html, text };
  }
  
  // Create mail document for Firebase extension
  createContactFormEmails(formData: ContactFormData): {
    adminNotification: Omit<MailDocument, 'id' | 'createdAt' | 'delivery'>;
    autoReply: Omit<MailDocument, 'id' | 'createdAt' | 'delivery'>;
  } {
    const adminTemplate = this.generateContactFormNotification(formData);
    const autoReplyTemplate = this.generateContactFormAutoReply(formData);
    
    return {
      adminNotification: {
        to: 'support@voiceline-ls.com',
        from: 'support@voiceline-ls.com',
        replyTo: formData.email,
        subject: adminTemplate.subject,
        html: adminTemplate.html,
        text: adminTemplate.text
      },
      autoReply: {
        to: formData.email,
        from: 'support@voiceline-ls.com',
        replyTo: 'support@voiceline-ls.com',
        subject: autoReplyTemplate.subject,
        html: autoReplyTemplate.html,
        text: autoReplyTemplate.text
      }
    };
  }
}

export const emailTemplateService = new EmailTemplateService();
export default emailTemplateService;