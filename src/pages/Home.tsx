import React from 'react';
import { Link } from 'react-router-dom';
import { 
  VideoCall, 
  Translate, 
  Groups, 
  VerifiedUser, 
  Schedule, 
  Language, 
  LocalHospital, 
  Gavel, 
  Business, 
  School, 
  ContactMail, 
  Person,
  Phone,
  Engineering,
  BusinessCenter
} from '@mui/icons-material';
import { ArrowRight, Users, Globe, Clock, Award, CheckCircle, Star } from 'lucide-react';

function Home() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="bg-neutral-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-neutral-900">
                Break Language
                <span className="block">Barriers Instantly</span>
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
                Connect with the world through professional interpretation and translation services. 
                Available 24/7 in over 200 languages with certified interpreters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center group"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/careers"
                  className="border-2 border-primary-500 text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-colors flex items-center justify-center"
                >
                  Join Our Team
                </Link>
              </div>
              
              {/* User avatars and stats */}
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold">JD</div>
                  <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center text-white text-sm font-semibold">SM</div>
                  <div className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center text-white text-sm font-semibold">AL</div>
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white text-sm font-semibold">+9K</div>
                </div>
                <div className="text-neutral-600">
                  <span className="font-semibold text-neutral-900">10,000+</span> people already joined the Voicegate
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Main image placeholder */}
                <div className="w-full h-96 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5"></div>
                  <Language className="w-32 h-32 text-primary-500/30" />
                </div>
                
                {/* Floating cards */}
                <div className="absolute top-8 right-4 bg-white rounded-lg p-3 shadow-lg border border-neutral-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-900">24/7 Available</span>
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-8 bg-white rounded-lg p-4 shadow-lg border border-neutral-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-900">200+ Languages</span>
                  </div>
                </div>
                
                <div className="absolute bottom-16 left-4 bg-white rounded-lg p-4 shadow-lg border border-neutral-200">
                  <div className="text-sm text-neutral-600 mb-1">Accuracy Rate</div>
                  <div className="text-2xl font-bold text-primary-500 mb-2">99%</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-8 bg-primary-500 rounded-sm"></div>
                    <div className="w-2 h-6 bg-secondary-500 rounded-sm"></div>
                    <div className="w-2 h-4 bg-primary-400 rounded-sm"></div>
                    <div className="w-2 h-3 bg-primary-500 rounded-sm"></div>
                    <div className="w-2 h-10 bg-secondary-500 rounded-sm"></div>
                    <div className="w-2 h-12 bg-primary-500 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-500/10 rounded-full">
                <VerifiedUser className="w-8 h-8 text-primary-500" />
              </div>
              <div className="text-4xl font-bold text-primary-500 mb-2">1,500+</div>
              <div className="text-neutral-900 font-medium">Certified Interpreters</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-secondary-500/10 rounded-full">
                <CheckCircle className="w-8 h-8 text-secondary-500" />
              </div>
              <div className="text-4xl font-bold text-secondary-500 mb-2">3+</div>
              <div className="text-neutral-900 font-medium">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-400/10 rounded-full">
                <Schedule className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-4xl font-bold text-primary-400 mb-2">24/7</div>
              <div className="text-neutral-900 font-medium">Support Available</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-500/10 rounded-full">
                <Language className="w-8 h-8 text-primary-500" />
              </div>
              <div className="text-4xl font-bold text-primary-500 mb-2">100+</div>
              <div className="text-neutral-900 font-medium">Languages Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Our Language Services
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Professional interpretation and translation services tailored to your specific needs across multiple industries and languages.
            </p>
          </div>

          {/* Featured Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Medical Interpretation */}
            <div className="bg-white rounded-lg p-6 border border-neutral-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mr-4">
                  <LocalHospital className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Medical Interpretation</h3>
              </div>
              <p className="text-neutral-700 text-sm mb-4">
                Certified medical interpreters for healthcare settings and patient consultations.
              </p>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• HIPAA compliant</li>
                <li>• Medical terminology</li>
                <li>• 24/7 availability</li>
              </ul>
            </div>

            {/* Legal Interpretation */}
            <div className="bg-white rounded-lg p-6 border border-neutral-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-500/10 rounded-lg flex items-center justify-center mr-4">
                  <Gavel className="w-6 h-6 text-secondary-500" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Legal Interpretation</h3>
              </div>
              <p className="text-neutral-700 text-sm mb-4">
                Certified legal interpreters for court proceedings, depositions, and legal consultations.
              </p>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• Court certified</li>
                <li>• Legal terminology</li>
                <li>• Confidential service</li>
              </ul>
            </div>

            {/* Phone Interpretation */}
            <div className="bg-white rounded-lg p-6 border border-neutral-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Phone Interpretation</h3>
              </div>
              <p className="text-neutral-700 text-sm mb-4">
                On-demand phone interpretation services available 24/7 in over 200 languages.
              </p>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• Instant connection</li>
                <li>• 200+ languages</li>
                <li>• 24/7 availability</li>
              </ul>
            </div>

            {/* Document Translation */}
            <div className="bg-white rounded-lg p-6 border border-neutral-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-500/10 rounded-lg flex items-center justify-center mr-4">
                  <Engineering className="w-6 h-6 text-secondary-500" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Document Translation</h3>
              </div>
              <p className="text-neutral-700 text-sm mb-4">
                Professional document translation services with certified accuracy and fast turnaround.
              </p>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• Certified translations</li>
                <li>• Fast turnaround</li>
                <li>• Quality assurance</li>
              </ul>
            </div>

            {/* Business Interpretation */}
            <div className="bg-white rounded-lg p-6 border border-neutral-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mr-4">
                  <BusinessCenter className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Business Interpretation</h3>
              </div>
              <p className="text-neutral-700 text-sm mb-4">
                Professional interpretation services for business meetings, conferences, and negotiations.
              </p>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• Conference interpretation</li>
                <li>• Business meetings</li>
                <li>• Contract negotiations</li>
              </ul>
            </div>

            {/* Website Localization */}
            <div className="bg-white rounded-lg p-6 border border-neutral-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-500/10 rounded-lg flex items-center justify-center mr-4">
                  <Language className="w-6 h-6 text-secondary-500" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Website Localization</h3>
              </div>
              <p className="text-neutral-700 text-sm mb-4">
                Complete website localization services to reach global markets effectively.
              </p>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li>• Cultural adaptation</li>
                <li>• SEO optimization</li>
                <li>• Multi-language support</li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary-500/5 to-primary-400/5 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Need More Language Services?
              </h3>
              <p className="text-neutral-700 mb-6 max-w-2xl mx-auto">
                We offer comprehensive interpretation and translation services across 200+ languages including medical, legal, business, and technical specializations.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors group"
            >
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Specialized interpretation and translation services tailored to your industry's unique requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-500/10 rounded-full">
                  <LocalHospital className="w-8 h-8 text-primary-500" />
                </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Healthcare</h3>
              <p className="text-neutral-700 text-sm">Medical interpretation and translation for healthcare providers and patients</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-400/10 rounded-full">
                <Gavel className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Legal</h3>
              <p className="text-neutral-700 text-sm">Legal interpretation and document translation for law firms and courts</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-500/10 rounded-full">
                  <Business className="w-8 h-8 text-primary-500" />
                </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Business</h3>
              <p className="text-neutral-700 text-sm">Business interpretation for meetings, conferences, and international negotiations</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-400/10 rounded-full">
                  <School className="w-8 h-8 text-primary-400" />
                </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Education</h3>
              <p className="text-neutral-700 text-sm">Educational interpretation and translation for schools and universities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Clients */}
            <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-16 h-16 opacity-20 flex items-center justify-center bg-primary-500/10 rounded-full">
                <ContactMail className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Need Language Services?</h3>
              <p className="text-neutral-700 mb-6">
                Get instant access to professional interpreters and translators. 
                Request a consultation and we'll match you with the perfect language expert.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-neutral-700">
                  <Clock className="h-5 w-5 text-primary-500 mr-3" />
                  24/7 availability
                </li>
                <li className="flex items-center text-neutral-700">
                  <Star className="h-5 w-5 text-primary-500 mr-3" />
                  Certified interpreters
                </li>
                <li className="flex items-center text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-3" />
                  Quality guaranteed
                </li>
              </ul>
              <Link
                to="/contact"
                className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-flex items-center group"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* For Advisors */}
            <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-16 h-16 opacity-20 flex items-center justify-center bg-primary-500/10 rounded-full">
                <Person className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Join Our Interpreter Network</h3>
              <p className="text-neutral-700 mb-6">
                Work flexible hours, earn competitive rates, and be part of a professional network 
                that values your language expertise. Apply today and start earning immediately.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-neutral-700">
                  <Clock className="h-5 w-5 text-primary-500 mr-3" />
                  Work anytime, anywhere
                </li>
                <li className="flex items-center text-neutral-700">
                  <Star className="h-5 w-5 text-primary-500 mr-3" />
                  Competitive hourly rates
                </li>
                <li className="flex items-center text-neutral-700">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-3" />
                  Ongoing training & support
                </li>
              </ul>
              <Link
                to="/careers"
                className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-flex items-center group"
              >
                Join Our Team
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="relative rounded-2xl p-12 text-center text-white mt-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-90 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Break Language Barriers?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied clients who trust us with their interpretation and translation needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  to="/careers"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                >
                  Join Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;