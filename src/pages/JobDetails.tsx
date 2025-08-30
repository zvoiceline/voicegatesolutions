import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, CheckCircle, Upload, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface JobListing {
  id: string;
  title: string;
  type: string;
  native: string;
  fluent: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

const JobDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();

  // Form state for job application
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

  // Job listings data with SEO-friendly IDs
  const jobListings: JobListing[] = [
    {
      id: 'greek-english-remote-interpreter',
      title: 'Greek - English Remote Interpreter',
      type: 'Remote',
      native: 'Greek',
      fluent: 'English',
      description: 'Join our team of Greek-English interpreters and empower global communication remotely. Work with healthcare, legal, and business clients to bridge language barriers.',
      requirements: [
        'Native or near-native fluency in Greek',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'spanish-english-remote-interpreter',
      title: 'Spanish - English Remote Interpreter',
      type: 'Remote',
      native: 'Spanish',
      fluent: 'English',
      description: 'Work from home, get paid well, and be part of a diverse team connecting people worldwide. Provide professional Spanish-English interpretation services.',
      requirements: [
        'Native or near-native fluency in Spanish',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'french-english-remote-interpreter',
      title: 'French - English Remote Interpreter',
      type: 'Remote',
      native: 'French',
      fluent: 'English',
      description: 'Professional French-English interpretation services for global clients. Bridge communication gaps with expert linguistic skills.',
      requirements: [
        'Native or near-native fluency in French',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'german-english-remote-interpreter',
      title: 'German - English Remote Interpreter',
      type: 'Remote',
      native: 'German',
      fluent: 'English',
      description: 'Connect German and English speakers through professional interpretation. Support international business and personal communications.',
      requirements: [
        'Native or near-native fluency in German',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'italian-english-remote-interpreter',
      title: 'Italian - English Remote Interpreter',
      type: 'Remote',
      native: 'Italian',
      fluent: 'English',
      description: 'Bridge communication gaps with professional Italian-English interpretation. Work with diverse clients across various industries.',
      requirements: [
        'Native or near-native fluency in Italian',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'portuguese-english-remote-interpreter',
      title: 'Portuguese - English Remote Interpreter',
      type: 'Remote',
      native: 'Portuguese',
      fluent: 'English',
      description: 'Provide expert Portuguese-English interpretation services remotely for healthcare, legal, business, and community organizations.',
      requirements: [
        'Native or near-native fluency in Portuguese',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'japanese-english-remote-interpreter',
      title: 'Japanese - English Remote Interpreter',
      type: 'Remote',
      native: 'Japanese',
      fluent: 'English',
      description: 'Facilitate Japanese-English communication for diverse business needs across various industries.',
      requirements: [
        'Native or near-native fluency in Japanese',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'korean-english-remote-interpreter',
      title: 'Korean - English Remote Interpreter',
      type: 'Remote',
      native: 'Korean',
      fluent: 'English',
      description: 'Enable seamless Korean-English communication across industries with professional interpretation services.',
      requirements: [
        'Native or near-native fluency in Korean',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'chinese-mandarin-english-remote-interpreter',
      title: 'Chinese (Mandarin) - English Remote Interpreter',
      type: 'Remote',
      native: 'Chinese (Mandarin)',
      fluent: 'English',
      description: 'Connect Mandarin and English speakers through professional services across healthcare, business, and legal sectors.',
      requirements: [
        'Native or near-native fluency in Chinese (Mandarin)',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'arabic-english-remote-interpreter',
      title: 'Arabic - English Remote Interpreter',
      type: 'Remote',
      native: 'Arabic',
      fluent: 'English',
      description: 'Provide critical Arabic-English interpretation for global communications across various professional settings.',
      requirements: [
        'Native or near-native fluency in Arabic',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'russian-english-remote-interpreter',
      title: 'Russian - English Remote Interpreter',
      type: 'Remote',
      native: 'Russian',
      fluent: 'English',
      description: 'Support Russian-English communication needs across various sectors with professional interpretation services.',
      requirements: [
        'Native or near-native fluency in Russian',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'hindi-english-remote-interpreter',
      title: 'Hindi - English Remote Interpreter',
      type: 'Remote',
      native: 'Hindi',
      fluent: 'English',
      description: 'Bridge Hindi and English communication for diverse client needs across healthcare, business, and legal sectors.',
      requirements: [
        'Native or near-native fluency in Hindi',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'vietnamese-english-remote-interpreter',
      title: 'Vietnamese - English Remote Interpreter',
      type: 'Remote',
      native: 'Vietnamese',
      fluent: 'English',
      description: 'Provide professional Vietnamese-English interpretation services for healthcare, legal, and business communications.',
      requirements: [
        'Native or near-native fluency in Vietnamese',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'thai-english-remote-interpreter',
      title: 'Thai - English Remote Interpreter',
      type: 'Remote',
      native: 'Thai',
      fluent: 'English',
      description: 'Connect Thai and English speakers through expert interpretation services across various professional settings.',
      requirements: [
        'Native or near-native fluency in Thai',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'turkish-english-remote-interpreter',
      title: 'Turkish - English Remote Interpreter',
      type: 'Remote',
      native: 'Turkish',
      fluent: 'English',
      description: 'Enable seamless Turkish-English communication across sectors with professional interpretation services.',
      requirements: [
        'Native or near-native fluency in Turkish',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
       ]
     },
    {
      id: 'polish-english-remote-interpreter',
      title: 'Polish - English Remote Interpreter',
      type: 'Remote',
      native: 'Polish',
      fluent: 'English',
      description: 'Support Polish-English communication for global clients.',
      requirements: [
        'Native or near-native fluency in Polish',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'dutch-english-remote-interpreter',
      title: 'Dutch - English Remote Interpreter',
      type: 'Remote',
      native: 'Dutch',
      fluent: 'English',
      description: 'Facilitate Dutch-English interpretation for international needs.',
      requirements: [
        'Native or near-native fluency in Dutch',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
     },
    {
      id: 'swedish-english-remote-interpreter',
      title: 'Swedish - English Remote Interpreter',
      type: 'Remote',
      native: 'Swedish',
      fluent: 'English',
      description: 'Bridge Swedish and English communication professionally.',
      requirements: [
        'Native or near-native fluency in Swedish',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'norwegian-english-remote-interpreter',
      title: 'Norwegian - English Remote Interpreter',
      type: 'Remote',
      native: 'Norwegian',
      fluent: 'English',
      description: 'Provide expert Norwegian-English interpretation services.',
      requirements: [
        'Native or near-native fluency in Norwegian',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
     },
    {
      id: 'finnish-english-remote-interpreter',
      title: 'Finnish - English Remote Interpreter',
      type: 'Remote',
      native: 'Finnish',
      fluent: 'English',
      description: 'Deliver professional Finnish-English interpretation.',
      requirements: [
        'Native or near-native fluency in Finnish',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'hebrew-english-remote-interpreter',
      title: 'Hebrew - English Remote Interpreter',
      type: 'Remote',
      native: 'Hebrew',
      fluent: 'English',
      description: 'Support Hebrew-English communication needs.',
      requirements: [
        'Native or near-native fluency in Hebrew',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
     },
    {
      id: 'farsi-english-remote-interpreter',
      title: 'Farsi - English Remote Interpreter',
      type: 'Remote',
      native: 'Farsi',
      fluent: 'English',
      description: 'Provide expert Farsi-English interpretation services.',
      requirements: [
        'Native or near-native fluency in Farsi',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'urdu-english-remote-interpreter',
      title: 'Urdu - English Remote Interpreter',
      type: 'Remote',
      native: 'Urdu',
      fluent: 'English',
      description: 'Bridge Urdu and English communication professionally.',
      requirements: [
        'Native or near-native fluency in Urdu',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
     },
    {
      id: 'bengali-english-remote-interpreter',
      title: 'Bengali - English Remote Interpreter',
      type: 'Remote',
      native: 'Bengali',
      fluent: 'English',
      description: 'Support Bengali-English communication needs.',
      requirements: [
        'Native or near-native fluency in Bengali',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'tagalog-english-remote-interpreter',
      title: 'Tagalog - English Remote Interpreter',
      type: 'Remote',
      native: 'Tagalog',
      fluent: 'English',
      description: 'Deliver professional Tagalog-English interpretation.',
      requirements: [
        'Native or near-native fluency in Tagalog',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
     },
    {
      id: 'indonesian-english-remote-interpreter',
      title: 'Indonesian - English Remote Interpreter',
      type: 'Remote',
      native: 'Indonesian',
      fluent: 'English',
      description: 'Provide expert Indonesian-English interpretation services.',
      requirements: [
        'Native or near-native fluency in Indonesian',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'malay-english-remote-interpreter',
      title: 'Malay - English Remote Interpreter',
      type: 'Remote',
      native: 'Malay',
      fluent: 'English',
      description: 'Bridge Malay and English communication professionally.',
      requirements: [
        'Native or near-native fluency in Malay',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
     },
    {
      id: 'swahili-english-remote-interpreter',
      title: 'Swahili - English Remote Interpreter',
      type: 'Remote',
      native: 'Swahili',
      fluent: 'English',
      description: 'Support Swahili-English communication needs.',
      requirements: [
        'Native or near-native fluency in Swahili',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'amharic-english-remote-interpreter',
      title: 'Amharic - English Remote Interpreter',
      type: 'Remote',
      native: 'Amharic',
      fluent: 'English',
      description: 'Deliver professional Amharic-English interpretation.',
      requirements: [
        'Native or near-native fluency in Amharic',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
     },
    {
      id: 'somali-english-remote-interpreter',
      title: 'Somali - English Remote Interpreter',
      type: 'Remote',
      native: 'Somali',
      fluent: 'English',
      description: 'Provide expert Somali-English interpretation services.',
      requirements: [
        'Native or near-native fluency in Somali',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'burmese-english-remote-interpreter',
      title: 'Burmese - English Remote Interpreter',
      type: 'Remote',
      native: 'Burmese',
      fluent: 'English',
      description: 'Bridge Burmese and English communication professionally.',
      requirements: [
        'Native or near-native fluency in Burmese',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
     },
    {
      id: 'khmer-english-remote-interpreter',
      title: 'Khmer - English Remote Interpreter',
      type: 'Remote',
      native: 'Khmer',
      fluent: 'English',
      description: 'Support Khmer-English communication needs.',
      requirements: [
        'Native or near-native fluency in Khmer',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    },
    {
      id: 'lao-english-remote-interpreter',
      title: 'Lao - English Remote Interpreter',
      type: 'Remote',
      native: 'Lao',
      fluent: 'English',
      description: 'Deliver professional Lao-English interpretation.',
      requirements: [
        'Native or near-native fluency in Lao',
        'Professional proficiency in English',
        'Minimum 2 years of interpreting experience',
        'Professional certification preferred',
        'Reliable internet connection and quiet workspace'
      ],
      responsibilities: [
        'Provide accurate consecutive and simultaneous interpretation',
        'Maintain confidentiality and professional ethics',
        'Adapt communication style to different contexts',
        'Participate in ongoing training and development'
      ],
      benefits: [
        'Competitive per-minute compensation',
        'Flexible scheduling',
        'Professional development opportunities',
        'Work from home'
      ]
    }
  ];
  const job = jobListings.find(j => j.id === jobId);

  if (!job) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Job Not Found</h1>
          <Link to="/careers" className="text-primary-600 hover:text-primary-700">
            ← Back to Careers
          </Link>
        </div>
      </div>
    );
  }

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
              Thank you for your interest in the {job.title} position. We'll review your application and get back to you soon.
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

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "employmentType": "CONTRACTOR",
    "workFromHome": true,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Voicegate Solutions",
      "url": "https://voicegatesolutions.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      }
    },
    "qualifications": job.requirements.join(', '),
    "responsibilities": job.responsibilities.join(', '),
    "benefits": job.benefits.join(', ')
  };

  return (
    <>
      <Helmet>
        <title>{job.title} - Remote Interpreter Jobs | Voicegate Solutions</title>
        <meta name="description" content={`${job.description} Apply now for ${job.title} position at Voicegate Solutions. Remote work, competitive pay, flexible schedule.`} />
        <meta name="keywords" content={`${job.native} interpreter, ${job.fluent} interpreter, remote interpreter jobs, ${job.native} ${job.fluent} translation, language services, interpreter careers`} />
        <meta property="og:title" content={`${job.title} - Remote Interpreter Jobs`} />
        <meta property="og:description" content={job.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${job.title} - Remote Interpreter Jobs`} />
        <meta name="twitter:description" content={job.description} />
        <link rel="canonical" href={`https://voicegatesolutions.com/careers/${job.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <Link 
                to="/careers" 
                className="flex items-center text-primary-100 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Careers
              </Link>
            </div>
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
              <div className="flex items-center text-primary-100 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="mr-6">{job.type}</span>
                <Clock className="w-5 h-5 mr-2" />
                <span className="mr-6">Contract</span>
                <Users className="w-5 h-5 mr-2" />
                <span>Interpreting</span>
              </div>
              <p className="text-xl text-primary-100">
                {job.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Job Description</h2>
                  <p className="text-neutral-700 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">Responsibilities</h3>
                  <ul className="space-y-3">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Apply for this Position</h3>
                <p className="text-neutral-600 mb-6">
                  Ready to join our team? Fill out the application form below.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Resume/CV *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md hover:border-primary-400 transition-colors">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-8 w-8 text-neutral-400" />
                        <div className="flex text-sm text-neutral-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                            <span className="text-xs">Upload a file</span>
                            <input
                              type="file"
                              name="resume"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                              required
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1 text-xs">or drag and drop</p>
                        </div>
                        <p className="text-xs text-neutral-500">PDF, DOC, DOCX up to 10MB</p>
                        {formData.resume && (
                          <p className="text-xs text-green-600 mt-2">
                            ✓ {formData.resume.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Language Skills */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Native Language *
                    </label>
                    <input
                      type="text"
                      name="nativeLanguage"
                      value={formData.nativeLanguage}
                      onChange={handleInputChange}
                      required
                      placeholder={job.native}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Interpreting Experience *
                    </label>
                    <select
                      name="interpretingExperience"
                      value={formData.interpretingExperience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    >
                      <option value="">Select experience level</option>
                      <option value="0-1 years">0-1 years</option>
                      <option value="2-3 years">2-3 years</option>
                      <option value="4-5 years">4-5 years</option>
                      <option value="6+ years">6+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Expected Pay Per Minute (USD) *
                    </label>
                    <select
                      name="expectedPayPerMinute"
                      value={formData.expectedPayPerMinute}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    >
                      <option value="">Select pay range</option>
                      <option value="$0.50 - $1.00">$0.50 - $1.00</option>
                      <option value="$1.00 - $1.50">$1.00 - $1.50</option>
                      <option value="$1.50 - $2.00">$1.50 - $2.00</option>
                      <option value="$2.00 - $2.50">$2.00 - $2.50</option>
                      <option value="$2.50 - $3.00">$2.50 - $3.00</option>
                      <option value="$3.00 - $4.00">$3.00 - $4.00</option>
                      <option value="$4.00 - $5.00">$4.00 - $5.00</option>
                      <option value="$5.00+">$5.00+</option>
                      <option value="Negotiable">Negotiable</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Additional Information
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="Tell us more about your experience and qualifications..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                  >
                    Submit Application
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-2 text-sm">About Voicegate Solutions</h4>
                  <p className="text-xs text-neutral-600">
                    We are a leading language services company connecting people across language barriers through professional interpretation and translation services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;