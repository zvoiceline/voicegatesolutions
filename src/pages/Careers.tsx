import React, { useState, useMemo } from 'react';
import { Clock, DollarSign, Globe, Users, Search, X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function Careers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Job listings data
  const jobListings = [
    {
      id: "greek-english-remote-interpreter",
      title: "Greek - English Remote interpreters",
      type: "Remote",
      native: "Greek",
      fluent: "English",
      description: "Join our team of Greek-English interpreters and empower global communication remotely."
    },
    {
      id: "spanish-english-remote-interpreter",
      title: "Spanish - English Remote interpreters",
      type: "Remote",
      native: "Spanish",
      fluent: "English",
      description: "Work from home, get paid well, and be part of a diverse team connecting people worldwide."
    },
    {
      id: "french-english-remote-interpreter",
      title: "French - English Remote interpreters",
      type: "Remote",
      native: "French",
      fluent: "English",
      description: "Professional French-English interpretation services for global clients."
    },
    {
      id: "german-english-remote-interpreter",
      title: "German - English Remote interpreters",
      type: "Remote",
      native: "German",
      fluent: "English",
      description: "Connect German and English speakers through professional interpretation."
    },
    {
      id: "italian-english-remote-interpreter",
      title: "Italian - English Remote interpreters",
      type: "Remote",
      native: "Italian",
      fluent: "English",
      description: "Bridge communication gaps with professional Italian-English interpretation."
    },
    {
      id: "portuguese-english-remote-interpreter",
      title: "Portuguese - English Remote interpreters",
      type: "Remote",
      native: "Portuguese",
      fluent: "English",
      description: "Provide expert Portuguese-English interpretation services remotely."
    },
    {
      id: "japanese-english-remote-interpreter",
      title: "Japanese - English Remote interpreters",
      type: "Remote",
      native: "Japanese",
      fluent: "English",
      description: "Facilitate Japanese-English communication for diverse business needs."
    },
    {
      id: "korean-english-remote-interpreter",
      title: "Korean - English Remote interpreters",
      type: "Remote",
      native: "Korean",
      fluent: "English",
      description: "Enable seamless Korean-English communication across industries."
    },
    {
      id: "chinese-mandarin-english-remote-interpreter",
      title: "Chinese (Mandarin) - English Remote interpreters",
      type: "Remote",
      native: "Chinese (Mandarin)",
      fluent: "English",
      description: "Connect Mandarin and English speakers through professional services."
    },
    {
      id: "arabic-english-remote-interpreter",
      title: "Arabic - English Remote interpreters",
      type: "Remote",
      native: "Arabic",
      fluent: "English",
      description: "Provide critical Arabic-English interpretation for global communications."
    },
    {
      id: "russian-english-remote-interpreter",
      title: "Russian - English Remote interpreters",
      type: "Remote",
      native: "Russian",
      fluent: "English",
      description: "Support Russian-English communication needs across various sectors."
    },
    {
      id: "hindi-english-remote-interpreter",
      title: "Hindi - English Remote interpreters",
      type: "Remote",
      native: "Hindi",
      fluent: "English",
      description: "Bridge Hindi and English communication for diverse client needs."
    },
    {
      id: "vietnamese-english-remote-interpreter",
      title: "Vietnamese - English Remote interpreters",
      type: "Remote",
      native: "Vietnamese",
      fluent: "English",
      description: "Provide professional Vietnamese-English interpretation services."
    },
    {
      id: "thai-english-remote-interpreter",
      title: "Thai - English Remote interpreters",
      type: "Remote",
      native: "Thai",
      fluent: "English",
      description: "Connect Thai and English speakers through expert interpretation."
    },
    {
      id: "turkish-english-remote-interpreter",
      title: "Turkish - English Remote interpreters",
      type: "Remote",
      native: "Turkish",
      fluent: "English",
      description: "Enable seamless Turkish-English communication across sectors."
    },
    {
      id: "polish-english-remote-interpreter",
      title: "Polish - English Remote interpreters",
      type: "Remote",
      native: "Polish",
      fluent: "English",
      description: "Support Polish-English communication for global clients."
    },
    {
      id: "dutch-english-remote-interpreter",
      title: "Dutch - English Remote interpreters",
      type: "Remote",
      native: "Dutch",
      fluent: "English",
      description: "Facilitate Dutch-English interpretation for international needs."
    },
    {
      id: "swedish-english-remote-interpreter",
      title: "Swedish - English Remote interpreters",
      type: "Remote",
      native: "Swedish",
      fluent: "English",
      description: "Bridge Swedish and English communication professionally."
    },
    {
      id: "norwegian-english-remote-interpreter",
      title: "Norwegian - English Remote interpreters",
      type: "Remote",
      native: "Norwegian",
      fluent: "English",
      description: "Provide expert Norwegian-English interpretation services."
    },
    {
      id: "finnish-english-remote-interpreter",
      title: "Finnish - English Remote interpreters",
      type: "Remote",
      native: "Finnish",
      fluent: "English",
      description: "Connect Finnish and English speakers through professional services."
    },
    {
      id: "hebrew-english-remote-interpreter",
      title: "Hebrew - English Remote interpreters",
      type: "Remote",
      native: "Hebrew",
      fluent: "English",
      description: "Enable Hebrew-English communication across diverse industries."
    },
    {
      id: "farsi-persian-english-remote-interpreter",
      title: "Farsi (Persian) - English Remote interpreters",
      type: "Remote",
      native: "Farsi (Persian)",
      fluent: "English",
      description: "Support Farsi-English interpretation for global communications."
    },
    {
      id: "urdu-english-remote-interpreter",
      title: "Urdu - English Remote interpreters",
      type: "Remote",
      native: "Urdu",
      fluent: "English",
      description: "Bridge Urdu and English communication for diverse client needs."
    },
    {
      id: "bengali-english-remote-interpreter",
      title: "Bengali - English Remote interpreters",
      type: "Remote",
      native: "Bengali",
      fluent: "English",
      description: "Provide professional Bengali-English interpretation services."
    },
    {
      id: "tagalog-english-remote-interpreter",
      title: "Tagalog - English Remote interpreters",
      type: "Remote",
      native: "Tagalog",
      fluent: "English",
      description: "Connect Tagalog and English speakers through expert interpretation."
    },
    {
      id: "indonesian-english-remote-interpreter",
      title: "Indonesian - English Remote interpreters",
      type: "Remote",
      native: "Indonesian",
      fluent: "English",
      description: "Facilitate Indonesian-English communication for international clients."
    },
    {
      id: "malay-english-remote-interpreter",
      title: "Malay - English Remote interpreters",
      type: "Remote",
      native: "Malay",
      fluent: "English",
      description: "Support Malay-English interpretation across various sectors."
    },
    {
      id: "swahili-english-remote-interpreter",
      title: "Swahili - English Remote interpreters",
      type: "Remote",
      native: "Swahili",
      fluent: "English",
      description: "Bridge Swahili and English communication professionally."
    },
    {
      id: "amharic-english-remote-interpreter",
      title: "Amharic - English Remote interpreters",
      type: "Remote",
      native: "Amharic",
      fluent: "English",
      description: "Provide expert Amharic-English interpretation services."
    },
    {
      id: "somali-english-remote-interpreter",
      title: "Somali - English Remote interpreters",
      type: "Remote",
      native: "Somali",
      fluent: "English",
      description: "Connect Somali and English speakers through professional services."
    },
    {
      id: "burmese-english-remote-interpreter",
      title: "Burmese - English Remote interpreters",
      type: "Remote",
      native: "Burmese",
      fluent: "English",
      description: "Enable Burmese-English communication for diverse client needs."
    },
    {
      id: "khmer-english-remote-interpreter",
      title: "Khmer - English Remote interpreters",
      type: "Remote",
      native: "Khmer",
      fluent: "English",
      description: "Support Khmer-English interpretation for global communications."
    },
    {
      id: "lao-english-remote-interpreter",
      title: "Lao - English Remote interpreters",
      type: "Remote",
      native: "Lao",
      fluent: "English",
      description: "Bridge Lao and English communication through expert interpretation."
    }
  ];

  // Available languages for filtering
  const availableLanguages = Array.from(new Set(jobListings.map(job => job.native))).sort();

  // Filtered job listings based on search and language filter
  const filteredJobs = useMemo(() => {
    return jobListings.filter(job => {
      const matchesSearch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.native.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.fluent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLanguage = selectedLanguages.length === 0 || 
        selectedLanguages.includes(job.native);
      
      return matchesSearch && matchesLanguage;
    });
  }, [searchTerm, selectedLanguages]);

  const handleLanguageFilter = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLanguages([]);
  };



  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="bg-neutral-50 relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-400/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-500/10 rounded-full">
                  <span className="text-primary-500 font-medium text-xs sm:text-sm">Join Our Network</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                  Build your career,
                  <span className="text-primary-500"> earn flexibly</span>
                </h1>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-lg">
                  Work flexible hours, get paid per minute, and be part of a professional network that values your expertise. Start earning immediately with competitive rates.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/job-application" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Apply Now
                </Link>
                <a href="#benefits" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-200 text-sm sm:text-base">
                  Learn More
                </a>
              </div>
              
              {/* Career Stats */}
              <div className="flex items-center gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary-500">1,500+</div>
                  <div className="text-xs sm:text-sm text-neutral-600">Active Interpreters</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary-500">$25+</div>
                  <div className="text-xs sm:text-sm text-neutral-600">Per Hour</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary-500">24/7</div>
                  <div className="text-xs sm:text-sm text-neutral-600">Flexible Work</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative z-10">
                {/* Main Career Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-neutral-200">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900">Career Benefits</h3>
                    <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 bg-neutral-50 rounded-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900 text-sm sm:text-base">Flexible Hours</div>
                        <div className="text-xs sm:text-sm text-neutral-600">Work when you want</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 bg-neutral-50 rounded-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900 text-sm sm:text-base">Per-Minute Pay</div>
                        <div className="text-xs sm:text-sm text-neutral-600">Competitive rates</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 bg-neutral-50 rounded-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900 text-sm sm:text-base">Remote Work</div>
                        <div className="text-xs sm:text-sm text-neutral-600">Work from anywhere</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 border border-neutral-200">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-900">Growing Team</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 border border-neutral-200">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-900">Hiring Now</span>
                  </div>
                </div>
              </div>
              
              {/* Background Elements */}
              <div className="absolute top-6 sm:top-8 right-6 sm:right-8 w-24 sm:w-32 h-24 sm:h-32 bg-primary-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 w-20 sm:w-24 h-20 sm:h-24 bg-primary-400/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4">
              Navigate our available vacancies
            </h2>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
              <div className="flex-1 w-full max-w-md lg:max-w-none">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search by language, position, or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-4 pl-14 pr-12 border-2 border-neutral-200 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 text-sm md:text-base shadow-lg hover:shadow-xl bg-white group-hover:border-primary-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300">
                    <Search className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 group-focus-within:text-primary-500" />
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              <div className="w-full lg:w-80 xl:w-96">
                <div className="bg-gradient-to-br from-white to-neutral-50 border-2 border-neutral-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                      <span className="text-sm md:text-base text-neutral-700 font-semibold">
                        {filteredJobs.length} of {jobListings.length} positions
                      </span>
                    </div>
                    <button 
                      onClick={resetFilters}
                      className="text-xs md:text-sm text-primary-600 hover:text-primary-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-all duration-200"
                    >
                      Reset All
                    </button>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-neutral-900 text-base md:text-lg flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full"></div>
                        Filter by Language
                      </h3>
                      <button 
                        onClick={() => setSelectedLanguages([])}
                        className="text-xs text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded hover:bg-primary-50 transition-all duration-200"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary-200 scrollbar-track-neutral-100">
                      {availableLanguages.map((language) => (
                        <label key={language} className="flex items-center justify-between cursor-pointer hover:bg-primary-50 p-3 rounded-xl transition-all duration-200 group border border-transparent hover:border-primary-200">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={selectedLanguages.includes(language)}
                              onChange={() => handleLanguageFilter(language)}
                              className="mr-3 w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-2 rounded border-2 border-neutral-300 transition-all duration-200" 
                            />
                            <span className="text-sm md:text-base text-neutral-700 font-medium group-hover:text-primary-700 transition-colors duration-200">{language}</span>
                          </div>
                          <span className="text-xs font-semibold text-neutral-500 bg-neutral-200 group-hover:bg-primary-100 group-hover:text-primary-700 px-2.5 py-1.5 rounded-full transition-all duration-200">
                            {jobListings.filter(job => job.native === language).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredJobs.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-neutral-300 mb-6">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">No jobs found</h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">We couldn't find any positions matching your search criteria. Try adjusting your filters or search terms.</p>
                  <button 
                    onClick={resetFilters}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <div key={index} className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-xl hover:border-purple-200 transition-all duration-300 group">
                  {/* Job Type Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-purple-200">
                      {job.type}
                    </span>
                  </div>
                  
                  {/* Job Title */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-purple-700 transition-colors">
                    {job.title}
                  </h3>
                  
                  {/* Language Requirements */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-500">Native</span>
                      <span className="text-sm font-semibold text-neutral-900 bg-neutral-100 px-2 py-1 rounded">
                        {job.native}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-500">Fluent</span>
                      <span className="text-sm font-semibold text-neutral-900 bg-neutral-100 px-2 py-1 rounded">
                        {job.fluent}
                      </span>
                    </div>
                  </div>
                  
                  {/* Job Description */}
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6 line-clamp-3">
                    {job.description}
                  </p>
                  
                  {/* Apply Button */}
                  <Link 
                    to={`/careers/${job.id}`}
                    className="block w-full bg-gradient-to-r from-neutral-900 to-neutral-800 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-center"
                  >
                    Apply Now
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>



      {/* Process Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4">
              Application Process
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600">
              Simple steps to join our interpreter network
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 font-bold text-base sm:text-lg">
                1
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">Apply</h3>
              <p className="text-sm sm:text-base text-neutral-600">Submit your application with required documents</p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 font-bold text-base sm:text-lg">
                2
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">Review</h3>
              <p className="text-sm sm:text-base text-neutral-600">We review your qualifications and experience</p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 font-bold text-base sm:text-lg">
                3
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">Test</h3>
              <p className="text-sm sm:text-base text-neutral-600">Complete language proficiency and skills assessment</p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 font-bold text-base sm:text-lg">
                4
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">Start</h3>
              <p className="text-sm sm:text-base text-neutral-600">Begin working and earning immediately</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Careers;