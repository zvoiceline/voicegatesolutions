import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Clock, DollarSign, Globe, Users, CheckCircle, Upload } from 'lucide-react';

function Careers() {
  const { addInterpreterApplication } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    languages: '',
    experience: '',
    specializations: '',
    availability: '',
    timezone: '',
    resume: '',
    additionalInfo: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInterpreterApplication({
      ...formData,
      languages: formData.languages.split(',').map(lang => lang.trim()),
      specializations: formData.specializations.split(',').map(spec => spec.trim()).filter(spec => spec),
      status: 'pending'
    });
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      languages: '',
      experience: '',
      specializations: '',
      availability: '',
      timezone: '',
      resume: '',
      additionalInfo: ''
    });
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
      <section className="bg-neutral-50 relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-400/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 rounded-full">
                  <span className="text-primary-500 font-medium text-sm">Join Our Network</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                  Build your career,
                  <span className="text-primary-500"> earn flexibly</span>
                </h1>
                <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
                  Work flexible hours, get paid per minute, and be part of a professional network that values your expertise. Start earning immediately with competitive rates.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#application-form" className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Apply Now
                </a>
                <a href="#benefits" className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-200">
                  Learn More
                </a>
              </div>
              
              {/* Career Stats */}
              <div className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">1,500+</div>
                  <div className="text-sm text-neutral-600">Active Interpreters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">$25+</div>
                  <div className="text-sm text-neutral-600">Per Hour</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">24/7</div>
                  <div className="text-sm text-neutral-600">Flexible Work</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Career Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-neutral-900">Career Benefits</h3>
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">Flexible Hours</div>
                        <div className="text-sm text-neutral-600">Work when you want</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary-400/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">Per-Minute Pay</div>
                        <div className="text-sm text-neutral-600">Competitive rates</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary-600/10 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">Remote Work</div>
                        <div className="text-sm text-neutral-600">Work from anywhere</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-neutral-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary-500" />
                    <span className="text-sm font-medium text-neutral-900">Growing Team</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-neutral-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium text-neutral-900">Hiring Now</span>
                  </div>
                </div>
              </div>
              
              {/* Background Elements */}
              <div className="absolute top-8 right-8 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-8 left-8 w-24 h-24 bg-primary-400/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Join over 1,500 professional interpreters who choose Voicegate Solutions for flexible, 
              rewarding work opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Flexible Schedule</h3>
              <p className="text-neutral-600">Work anytime, anywhere. Choose your own hours and availability.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Per-Minute Pay</h3>
              <p className="text-neutral-600">Competitive rates with payment for actual work time. No waiting around.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Remote Work</h3>
              <p className="text-neutral-600">Work from home with our advanced platform and support system.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Professional Growth</h3>
              <p className="text-neutral-600">Ongoing training, certification support, and career development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Apply Today
            </h2>
            <p className="text-xl text-neutral-600">
              Complete the application below to join our professional interpreter network.
            </p>
          </div>

          {submitted && (
            <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-6 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-primary-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-500">Application Submitted!</h3>
                  <p className="text-neutral-700">We'll review your application and contact you within 2-3 business days.</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Street, City, State, ZIP"
                />
              </div>

              <div>
                <label htmlFor="languages" className="block text-sm font-medium text-neutral-700 mb-2">
                  Working Languages *
                </label>
                <input
                  type="text"
                  id="languages"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="e.g., Spanish, Portuguese, French (comma-separated)"
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-neutral-700 mb-2">
                  Resume/CV *
                </label>
                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                  <Upload className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600">Upload your resume or CV</p>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className="inline-block mt-2 bg-primary-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-neutral-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Tell us about your experience, certifications, specializations, etc."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Application Process
            </h2>
            <p className="text-xl text-neutral-600">
              Simple steps to join our interpreter network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Apply</h3>
              <p className="text-neutral-600">Submit your application with required documents</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Review</h3>
              <p className="text-neutral-600">We review your qualifications and experience</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Test</h3>
              <p className="text-neutral-600">Complete language proficiency and skills assessment</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                4
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Start</h3>
              <p className="text-neutral-600">Begin working and earning immediately</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Careers;