import React from 'react';
import { Link } from 'react-router-dom';
import { 
  VideoCall, 
  Translate, 
  Groups, 
  Business, 
  Schedule, 
  Security, 
  VerifiedUser,
  CheckCircle,
  LocalHospital,
  Gavel,
  Phone,
  Article,
  BusinessCenter,
  School,
  Engineering,
  Language
} from '@mui/icons-material';

function Services() {
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
                  <span className="text-primary-500 font-medium text-sm">Professional Language Solutions</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                  Bridge languages,
                  <span className="text-primary-500"> connect worlds</span>
                </h1>
                <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
                  Comprehensive interpretation, translation, and BPO solutions designed to break down language barriers and connect your business with global opportunities.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Get Started Today
                </Link>
                <Link to="#services" className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-200">
                  View Services
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">1,500+</div>
                  <div className="text-sm text-neutral-600">Certified Interpreters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">100+</div>
                  <div className="text-sm text-neutral-600">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">24/7</div>
                  <div className="text-sm text-neutral-600">Support</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-neutral-900">Service Analytics</h3>
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Medical Interpretation</span>
                      <span className="text-primary-500 font-semibold">45%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Legal Translation</span>
                      <span className="text-secondary-500 font-semibold">30%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-secondary-500 h-2 rounded-full" style={{width: '30%'}}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Business Services</span>
                      <span className="text-primary-400 font-semibold">25%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-primary-400 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-neutral-200">
                  <div className="flex items-center gap-2">
                    <Language className="w-5 h-5 text-primary-500" />
                    <span className="text-sm font-medium text-neutral-900">Real-time Translation</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-neutral-200">
                  <div className="flex items-center gap-2">
                    <VerifiedUser className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm font-medium text-neutral-900">Certified Quality</span>
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

      {/* Service Templates Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Our Comprehensive Language Services
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              From interpretation to translation and BPO solutions, we offer specialized language services for every need.
            </p>
          </div>

          {/* Interpretation Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Interpretation Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Video Remote Interpreting */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-500/30 rounded-lg">
                  <VideoCall className="w-6 h-6 text-primary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Video Remote Interpreting</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Professional video interpretation services connecting you with certified interpreters instantly.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    24/7 availability
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    100+ languages
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    HD video quality
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>

              {/* On-Site Interpreting */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-secondary-500/20 to-secondary-500/30 rounded-lg">
                  <Groups className="w-6 h-6 text-secondary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">On-Site Interpreting</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Professional interpreters at your location for meetings, conferences, and events.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Certified interpreters
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Flexible scheduling
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Specialized expertise
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>

              {/* Phone Interpretation */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-500/30 rounded-lg">
                  <Phone className="w-6 h-6 text-primary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Phone Interpretation</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Instant phone interpretation services available 24/7 for immediate language support.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Instant connection
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    24/7 availability
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    200+ languages
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>

              {/* Medical Interpretation */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-secondary-500/20 to-secondary-500/30 rounded-lg">
                  <LocalHospital className="w-6 h-6 text-secondary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Medical Interpretation</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Specialized medical interpretation services for healthcare providers and patients.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    HIPAA compliant
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Medical terminology
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Certified interpreters
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>

              {/* Legal Interpretation */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-500/30 rounded-lg">
                  <Gavel className="w-6 h-6 text-primary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Legal Interpretation</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Professional legal interpretation services for courts, law firms, and legal proceedings.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Court certified
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Legal terminology
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Confidentiality assured
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>

              {/* Business Interpretation */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-secondary-500/20 to-secondary-500/30 rounded-lg">
                  <BusinessCenter className="w-6 h-6 text-secondary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Business Interpretation</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Professional business interpretation services for meetings, conferences, and negotiations.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Industry expertise
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Cultural awareness
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Technical terminology
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Translation & BPO Solutions */}
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Translation & BPO Solutions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Document Translation */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-500/30 rounded-lg">
                  <Article className="w-6 h-6 text-primary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Document Translation</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Professional document translation services for legal, medical, and business documents.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Certified translations
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Fast turnaround
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Quality assurance
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>

              {/* Website Localization */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-secondary-500/20 to-secondary-500/30 rounded-lg">
                  <Language className="w-6 h-6 text-secondary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Website Localization</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Complete website localization services to reach global markets effectively.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Cultural adaptation
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    SEO optimization
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Technical integration
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>

              {/* Digital Transformation */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-500/30 rounded-lg">
                  <Business className="w-6 h-6 text-primary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Digital Transformation</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Technology consulting and digital transformation strategies for modern businesses.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Technology roadmap
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Process automation
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Digital strategy
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>

              {/* Technical Translation */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-secondary-500/20 to-secondary-500/30 rounded-lg">
                  <Engineering className="w-6 h-6 text-secondary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Technical Translation</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Specialized technical translation services for engineering, IT, and scientific documents.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Subject matter experts
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Technical accuracy
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Industry standards
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>

              {/* Educational Translation */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-500/30 rounded-lg">
                  <School className="w-6 h-6 text-primary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Educational Translation</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Academic and educational translation services for institutions and students.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Academic credentials
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Course materials
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Research papers
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>

              {/* BPO Services */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-secondary-500/20 to-secondary-500/30 rounded-lg">
                  <Business className="w-6 h-6 text-secondary-500" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">BPO Services</h4>
                <p className="text-neutral-700 text-sm mb-4 leading-relaxed">
                  Comprehensive business process outsourcing solutions for multilingual operations.
                </p>
                <ul className="space-y-1 mb-4">
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Customer support
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Data processing
                  </li>
                  <li className="flex items-center text-xs text-neutral-700">
                    <CheckCircle className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                    Content management
                  </li>
                </ul>
                <Link to="/contact" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors w-full block text-center">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Voicegate Solutions?
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              We combine language expertise with innovative technology to deliver exceptional interpretation and translation services that connect your business globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 rounded-lg p-8 text-center border border-neutral-100">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-lg">
                <Schedule className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Expert Linguists</h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Professional interpreters and translators with decades of experience providing accurate language services for your business needs.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-lg p-8 text-center border border-neutral-100">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-secondary-500/10 to-primary-500/10 rounded-lg">
                <Security className="w-8 h-8 text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Secure & Compliant</h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Full compliance with industry regulations and strict confidentiality protocols for all sensitive information and communications.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-lg p-8 text-center border border-neutral-100">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-lg">
                <VerifiedUser className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Personalized Service</h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Dedicated account managers and customized language solutions tailored to your unique industry and communication needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Break Down Language Barriers?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied clients who trust Voicegate Solutions for their language service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              to="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-500 transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;