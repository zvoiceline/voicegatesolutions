import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Users, CheckCircle, Upload, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobApplication: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    resume: null as File | null,
    nativeLanguage: '',
    fluentLanguages: '',
    interpretingExperience: '',
    medicalExperience: '',
    legalAvailability: '',
    expectedPayPerMinute: '',
    additionalInfo: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Application Submitted!</h2>
            <p className="text-neutral-600 mb-6">
              Thank you for your interest. We'll review your application and get back to you soon.
            </p>
            <Link 
              to="/careers" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
            >
              Back to Careers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/careers" 
              className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">VIEW ALL JOBS</span>
            </Link>
            <Link 
                to="/" 
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                VIEW VOICEGATE SOLUTIONS →
              </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Job Description */}
          <div className="space-y-6">
            {/* Job Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Remote
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Contract
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Interpreter
                </span>
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                Contract Interpreter
              </h1>
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Remote</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Flexible Hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Multiple Languages</span>
                </div>
              </div>
            </div>

            {/* Company Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">About Our Company</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                At Voicegate Solutions we are closing the language gap by connecting people anywhere and 
                anytime through innovative technology and solutions.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Founded in 1998 Voicegate Solutions provides critical interpreting and translation services that 
                improve the quality of life with the communities we engage in. We do that by providing both remote and 
                on-site services in more than 350 languages, for over 9,000 clients with a diverse and highly 
                experienced staff, and over 10,000 contract interpreters.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Quality interpretation is critical to our shared success, and it is only possible by bringing in the best 
                interpreters in the industry.
              </p>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Position Overview</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                We currently have a need for Remote Contract Interpreters who have a sincere desire to 
                use their language skills to help people and are passionate about what they do.
              </p>
              
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Contract Responsibilities:</h3>
              <ul className="space-y-2 text-neutral-600 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Provides consecutive, first-person interpretation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Follows interpreter protocols and procedures as required by Voicegate Solutions clients</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Follows all Voicegate Solutions policies and procedures related to information confidentiality and interpreter ethics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Continuously improves vocabulary and specialized subject matter knowledge, as required for various clients</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Requirements:</h3>
              <ul className="space-y-2 text-neutral-600 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Submission of updated Resume in English at time of Application</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Completion of English Language Proficiency with a language rating of "technical proficiency"</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Successful completion of a Mock oral interpretation session</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Completion of Voicegate Solutions' online Medical Terminology, Anatomy and Physiology Assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>A full Background Check and Security Screen</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Preferred Qualifications:</h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>1+ years of interpreting experience</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Application Form */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white rounded-lg shadow-lg border border-neutral-200">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-xl font-semibold text-neutral-900">Apply for this position</h2>
                <p className="text-sm text-neutral-600 mt-1">Required fields are marked with *</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Postal
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Resume *
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4 text-center hover:border-primary-400 transition-colors">
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                      required
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                      <p className="text-sm text-neutral-600">
                        {formData.resume ? formData.resume.name : 'Attach Resume • Paste resume'}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        PDF, DOC, or DOCX (max 10MB)
                      </p>
                    </label>
                  </div>
                </div>

                {/* Language Questions */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Select your Level of Spoken English *
                  </label>
                  <select
                    name="nativeLanguage"
                    required
                    value={formData.nativeLanguage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">-- No answer --</option>
                    <option value="native">Native</option>
                    <option value="fluent">Fluent</option>
                    <option value="conversational">Conversational</option>
                    <option value="basic">Basic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    How many years of interpreting experience do you have? *
                  </label>
                  <select
                    name="interpretingExperience"
                    required
                    value={formData.interpretingExperience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">-- No answer --</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    How many years of Medical interpreting experience do you have? *
                  </label>
                  <select
                    name="medicalExperience"
                    required
                    value={formData.medicalExperience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">-- No answer --</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    How many hours of legal availability are you looking to fulfill weekly? *
                  </label>
                  <select
                    name="legalAvailability"
                    required
                    value={formData.legalAvailability}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">-- No answer --</option>
                    <option value="1-10">1-10 hours</option>
                    <option value="10-20">10-20 hours</option>
                    <option value="20-30">20-30 hours</option>
                    <option value="30+">30+ hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Expected Pay Per Minute (USD) *
                  </label>
                  <select
                    name="expectedPayPerMinute"
                    required
                    value={formData.expectedPayPerMinute}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">-- No answer --</option>
                    <option value="0.50-0.75">$0.50 - $0.75</option>
                    <option value="0.75-1.00">$0.75 - $1.00</option>
                    <option value="1.00-1.25">$1.00 - $1.25</option>
                    <option value="1.25-1.50">$1.25 - $1.50</option>
                    <option value="1.50-2.00">$1.50 - $2.00</option>
                    <option value="2.00+">$2.00+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="I acknowledge that all information in the resume uploaded and entered is true and accurate to the best of my knowledge and I will ensure that providing false information would be grounds for disqualification from this and future opportunities with Propio L.S."
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;