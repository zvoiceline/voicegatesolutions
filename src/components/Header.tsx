import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Languages, Menu, X, ChevronDown, Phone, Mail, MapPin, Clock, Users, Globe, Briefcase, FileText, Award, Headphones } from 'lucide-react';
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInterpreterLogin = () => {
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Voicegate Solutions" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-700 hover:text-primary-500 font-medium transition-colors">
              Home
            </Link>
            
            {/* Services Mega Menu */}
            <div className="relative group">
              <button 
                className="text-neutral-700 hover:text-primary-500 font-medium transition-colors flex items-center"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {activeDropdown === 'services' && (
                <div 
                  className="absolute top-full left-0 w-[600px] bg-white shadow-2xl rounded-xl border border-neutral-200 p-8 z-50"
                  onMouseEnter={() => setActiveDropdown('services')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-primary-500/10 rounded-lg flex items-center justify-center mr-3">
                          <Headphones className="w-4 h-4 text-primary-500" />
                        </div>
                        <h3 className="font-semibold text-neutral-900">Interpretation Services</h3>
                      </div>
                      <div className="space-y-3">
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors group">
                          <Phone className="w-4 h-4 mr-3 text-neutral-400 group-hover:text-primary-500" />
                          <div>
                            <div className="font-medium">Phone Interpretation</div>
                            <div className="text-xs text-neutral-500">24/7 instant access</div>
                          </div>
                        </Link>
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors group">
                          <Globe className="w-4 h-4 mr-3 text-neutral-400 group-hover:text-primary-500" />
                          <div>
                            <div className="font-medium">Video Remote</div>
                            <div className="text-xs text-neutral-500">Face-to-face online</div>
                          </div>
                        </Link>
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors group">
                          <Users className="w-4 h-4 mr-3 text-neutral-400 group-hover:text-primary-500" />
                          <div>
                            <div className="font-medium">On-Site Services</div>
                            <div className="text-xs text-neutral-500">In-person interpreters</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-secondary-500/10 rounded-lg flex items-center justify-center mr-3">
                          <Award className="w-4 h-4 text-secondary-500" />
                        </div>
                        <h3 className="font-semibold text-neutral-900">Specializations</h3>
                      </div>
                      <div className="space-y-3">
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors group">
                          <Award className="w-4 h-4 mr-3 text-neutral-400 group-hover:text-primary-500" />
                          <div>
                            <div className="font-medium">Medical</div>
                            <div className="text-xs text-neutral-500">HIPAA compliant</div>
                          </div>
                        </Link>
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors group">
                          <Briefcase className="w-4 h-4 mr-3 text-neutral-400 group-hover:text-primary-500" />
                          <div>
                            <div className="font-medium">Legal</div>
                            <div className="text-xs text-neutral-500">Court certified</div>
                          </div>
                        </Link>
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors group">
                          <FileText className="w-4 h-4 mr-3 text-neutral-400 group-hover:text-primary-500" />
                          <div>
                            <div className="font-medium">Business</div>
                            <div className="text-xs text-neutral-500">Corporate meetings</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-primary-400/10 rounded-lg flex items-center justify-center mr-3">
                          <FileText className="w-4 h-4 text-primary-400" />
                        </div>
                        <h3 className="font-semibold text-neutral-900">Translation</h3>
                      </div>
                      <div className="space-y-3">
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors group">
                          <FileText className="w-4 h-4 mr-3 text-neutral-400 group-hover:text-primary-500" />
                          <div>
                            <div className="font-medium">Document Translation</div>
                            <div className="text-xs text-neutral-500">Certified accuracy</div>
                          </div>
                        </Link>
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors group">
                          <Globe className="w-4 h-4 mr-3 text-neutral-400 group-hover:text-primary-500" />
                          <div>
                            <div className="font-medium">Website Localization</div>
                            <div className="text-xs text-neutral-500">Global reach</div>
                          </div>
                        </Link>
                        <Link to="/contact" className="flex items-center bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors p-3 rounded-lg group mt-4">
                          <Phone className="w-4 h-4 mr-3" />
                          <div>
                            <div className="font-medium">Get Quote</div>
                            <div className="text-xs">Free consultation</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link to="/careers" className="text-neutral-700 hover:text-primary-500 font-medium transition-colors">
              Careers
            </Link>
            
            {/* Resources Mega Menu */}
            <div className="relative group">
              <button 
                className="text-neutral-700 hover:text-primary-500 font-medium transition-colors flex items-center"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {activeDropdown === 'resources' && (
                <div 
                  className="absolute top-full left-0 w-80 bg-white shadow-2xl rounded-lg border border-neutral-200 p-6 z-50"
                  onMouseEnter={() => setActiveDropdown('resources')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-3">Support</h3>
                      <div className="space-y-2">
                        <Link to="/contact" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors">
                          <Phone className="w-4 h-4 mr-2" />
                          24/7 Support
                        </Link>
                        <Link to="/contact" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact Us
                        </Link>
                        <Link to="/contact" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors">
                          <Clock className="w-4 h-4 mr-2" />
                          Service Hours
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link to="/contact" className="text-neutral-700 hover:text-primary-500 font-medium transition-colors">
              Contact Us
            </Link>
            
            <div className="flex space-x-3">
              <Link
                to="/contact"
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                Contact Us
              </Link>
              <Link
                to="/careers"
                className="border-2 border-primary-500 text-primary-500 px-6 py-2 rounded-lg hover:bg-primary-500 hover:text-white transition-colors font-medium"
              >
                Join Our Team
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-neutral-900 hover:text-primary-500 hover:bg-primary-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-neutral-700 hover:text-primary-500 font-medium px-2 py-1 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-neutral-700 hover:text-primary-500 font-medium px-2 py-1 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/careers" 
                className="text-neutral-700 hover:text-primary-500 font-medium px-2 py-1 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Careers
              </Link>
              <Link 
                to="/contact" 
                className="text-neutral-700 hover:text-primary-500 font-medium px-2 py-1 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <div className="pt-4 border-t border-neutral-200">
                <div className="space-y-3">
                  <Link
                    to="/contact"
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium w-full block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/careers"
                    className="border-2 border-primary-500 text-primary-500 px-6 py-3 rounded-lg hover:bg-primary-500 hover:text-white transition-colors font-medium w-full block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join Our Team
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;