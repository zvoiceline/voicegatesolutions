import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { emailTemplateService } from '../services/emailTemplateService';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

function Contact() {
  const { addClientRequest, queueEmail } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Store the client request in Firestore
      await addClientRequest({
        ...formData,
        status: 'new'
      });
      
      // Generate and queue emails
      const emails = emailTemplateService.createContactFormEmails(formData);
      
      // Queue admin notification email
      await queueEmail(emails.adminNotification);
      
      // Queue auto-reply email to customer
      await queueEmail(emails.autoReply);
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // You might want to show an error message to the user here
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23f97316%27 fill-opacity=%270.03%27%3E%3Ccircle cx=%2730%27 cy=%2730%27 r=%272%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 rounded-full">
                  <span className="text-primary-500 font-medium text-sm">Ready to Connect?</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                  Let's start the
                  <span className="text-primary-500"> conversation</span>
                </h1>
                <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
                  Ready to break down language barriers? Contact us for professional interpretation, translation, or BPO services tailored to your needs.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact-form" className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Send Message
                </a>
                <a href="tel:1-800-864-2357" className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-200">
                  Call Now
                </a>
              </div>
              
              {/* Contact Stats */}
              <div className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">2hrs</div>
                  <div className="text-sm text-neutral-600">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">24/7</div>
                  <div className="text-sm text-neutral-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">100%</div>
                  <div className="text-sm text-neutral-600">Satisfaction</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Contact Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-neutral-900">Contact Channels</h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">Email</div>
                        <div className="text-sm text-neutral-600">2hr response</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg">
                      <div className="w-10 h-10 bg-secondary-500/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-secondary-500" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">Phone</div>
                        <div className="text-sm text-neutral-600">24/7 available</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg">
                      <div className="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-accent-500" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">Live Chat</div>
                        <div className="text-sm text-neutral-600">Instant support</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-neutral-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-neutral-900">Online Now</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-neutral-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span className="text-sm font-medium text-neutral-900">Nationwide</span>
                  </div>
                </div>
              </div>
              
              {/* Background Elements */}
              <div className="absolute top-8 right-8 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-8 left-8 w-24 h-24 bg-secondary-500/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Reach out to us through any of the channels below. Our team is ready to 
                  discuss your language service needs and provide a customized solution.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Email Us</h3>
                    <p className="text-neutral-600">contact@voicegatesolutions.com</p>
                    <p className="text-sm text-neutral-500">We respond within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Call Us</h3>
                    <p className="text-neutral-600">1-800-VOICE-LS (1-800-864-2357)</p>
                    <p className="text-sm text-neutral-500">Available 24/7 for urgent requests</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Service Area</h3>
                    <p className="text-neutral-600">Nationwide Coverage</p>
                    <p className="text-sm text-neutral-500">Remote and on-site services available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Business Hours</h3>
                    <p className="text-neutral-600">Monday - Friday: 8:00 AM - 8:00 PM EST</p>
                    <p className="text-sm text-neutral-500">Emergency services available 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-neutral-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Request Service</h3>
              
              {submitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-green-800 font-medium">Request submitted successfully!</p>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    We'll contact you within 2 hours to discuss your needs.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Tell us about your language service needs, timeline, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:bg-primary-400 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              How We Can Help
            </h2>
            <p className="text-xl text-neutral-600">
              Professional language services tailored to your industry needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Medical & Healthcare</h3>
              <ul className="text-neutral-600 space-y-2">
                <li>• Patient consultations</li>
                <li>• Medical procedures</li>
                <li>• Telehealth appointments</li>
                <li>• Medical document translation</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Legal Services</h3>
              <ul className="text-neutral-600 space-y-2">
                <li>• Court proceedings</li>
                <li>• Depositions</li>
                <li>• Legal consultations</li>
                <li>• Document translation</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Business & Corporate</h3>
              <ul className="text-neutral-600 space-y-2">
                <li>• Conference interpretation</li>
                <li>• Business meetings</li>
                <li>• Contract translation</li>
                <li>• BPO interpreter supply</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;