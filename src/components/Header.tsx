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
                  className="absolute top-full left-0 w-96 bg-white shadow-2xl rounded-lg border border-neutral-200 p-6 z-50"
                  onMouseEnter={() => setActiveDropdown('services')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-3">Interpretation</h3>
                      <div className="space-y-2">
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors">
                          <Headphones className="w-4 h-4 mr-2" />
                          Phone Interpretation
                        </Link>
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors">
                          <Globe className="w-4 h-4 mr-2" />
                          Video Remote
                        </Link>
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors">
                          <Users className="w-4 h-4 mr-2" />
                          On-Site Services
                        </Link>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-3">Specializations</h3>
                      <div className="space-y-2">
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors">
                          <Award className="w-4 h-4 mr-2" />
                          Medical
                        </Link>
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors">
                          <Briefcase className="w-4 h-4 mr-2" />
                          Legal
                        </Link>
                        <Link to="/services" className="flex items-center text-neutral-600 hover:text-primary-500 transition-colors">
                          <FileText className="w-4 h-4 mr-2" />
                          Business
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
              Contact
            </Link>
            
            <button
              onClick={handleInterpreterLogin}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Get Started
            </button>
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
                Contact
              </Link>
              <div className="pt-4 border-t border-neutral-200">
                <button
                  onClick={() => {
                    handleInterpreterLogin();
                    setIsMenuOpen(false);
                  }}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium w-full"
                >
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;