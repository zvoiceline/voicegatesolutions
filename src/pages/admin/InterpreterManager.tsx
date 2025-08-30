import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { contactService, Contact, CustomField } from '../../services/contactService';
import { submissionProcessor } from '../../services/submissionProcessor';
import FishIntegrationManager from '../../components/FishIntegrationManager';
import {
  Users,
  UserCheck,
  Building2,
  Search,
  Filter,
  Plus,
  Edit3,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Globe,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Download,
  Upload,
  Settings
} from 'lucide-react';

// Contact and CustomField interfaces are now imported from contactService

function InterpreterManager() {
  // Note: clientRequests and interpreterApplications are now processed automatically
  // by the submissionProcessor service
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'client' | 'interpreter'>('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateRangeFilter, setDateRangeFilter] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState<'name' | 'createdAt' | 'lastContact' | 'status'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Modal states
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCustomFieldModal, setShowCustomFieldModal] = useState(false);
  const [showCustomFieldManagerModal, setShowCustomFieldManagerModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editingCustomField, setEditingCustomField] = useState<CustomField | null>(null);
  const [showFishIntegrationModal, setShowFishIntegrationModal] = useState(false);

  // Load contacts and custom fields from service
  useEffect(() => {
    const loadData = async () => {
      try {
        // Start automatic submission processing
        submissionProcessor.startAutoProcessing();
        
        // Process any pending submissions first
        await submissionProcessor.processPendingSubmissions();
        
        // Load existing contacts
        const existingContacts = await contactService.getAllContacts();
        
        // Convert Firestore timestamps to Date objects for display
        const processedContacts = existingContacts.map(contact => ({
          ...contact,
          createdAt: contact.createdAt.toDate(),
          lastContact: contact.lastContact?.toDate()
        }));
        
        setContacts(processedContacts as any);
        
        // Load custom fields
        const fields = await contactService.getAllCustomFields();
        setCustomFields(fields);
        
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };
    
    loadData();
    
    // Cleanup function to stop processing when component unmounts
    return () => {
      submissionProcessor.stopAutoProcessing();
    };
  }, []);
  
  // Refresh contacts data (called when new submissions are processed)
  const refreshContacts = async () => {
    try {
      const existingContacts = await contactService.getAllContacts();
      const processedContacts = existingContacts.map(contact => ({
        ...contact,
        createdAt: contact.createdAt.toDate(),
        lastContact: contact.lastContact?.toDate()
      }));
      setContacts(processedContacts as any);
    } catch (error) {
      console.error('Error refreshing contacts:', error);
    }
  };
  
  // Set up periodic refresh to catch newly processed submissions
  useEffect(() => {
    const interval = setInterval(refreshContacts, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Filter and sort contacts
  const filteredContacts = contacts
    .filter(contact => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        contact.name.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.phone?.toLowerCase().includes(searchLower) ||
        contact.company?.toLowerCase().includes(searchLower) ||
        contact.notes?.toLowerCase().includes(searchLower) ||
        Object.values(contact.customFields || {}).some(value => 
          String(value).toLowerCase().includes(searchLower)
        );
      
      if (!matchesSearch) return false;
      if (filterType !== 'all' && contact.type !== filterType) return false;
      if (filterStatus !== 'all' && contact.status !== filterStatus) return false;
      if (filterSource !== 'all' && contact.source !== filterSource) return false;
      if (selectedTags.length > 0 && !selectedTags.some(tag => contact.tags.includes(tag))) return false;
      
      // Date range filtering
      if (dateRangeFilter.start || dateRangeFilter.end) {
        const contactDate = contact.createdAt instanceof Date ? 
          contact.createdAt : 
          contact.createdAt?.toDate ? contact.createdAt.toDate() : new Date();
        
        if (dateRangeFilter.start) {
          const startDate = new Date(dateRangeFilter.start);
          if (contactDate < startDate) return false;
        }
        
        if (dateRangeFilter.end) {
          const endDate = new Date(dateRangeFilter.end);
          endDate.setHours(23, 59, 59, 999); // End of day
          if (contactDate > endDate) return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'createdAt':
          aValue = a.createdAt instanceof Date ? a.createdAt : 
            a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
          bValue = b.createdAt instanceof Date ? b.createdAt : 
            b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
          break;
        case 'lastContact':
          aValue = a.lastContact instanceof Date ? a.lastContact : 
            a.lastContact?.toDate ? a.lastContact.toDate() : new Date(0);
          bValue = b.lastContact instanceof Date ? b.lastContact : 
            b.lastContact?.toDate ? b.lastContact.toDate() : new Date(0);
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // Statistics
  const stats = {
    totalContacts: contacts.length,
    clients: contacts.filter(c => c.type === 'client').length,
    interpreters: contacts.filter(c => c.type === 'interpreter').length,
    activeContacts: contacts.filter(c => c.status === 'active').length,
    pendingContacts: contacts.filter(c => c.status === 'pending').length
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowContactModal(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleSaveContact = (updatedContact: Contact) => {
    setContacts(prev => prev.map(c => c.id === updatedContact.id ? updatedContact : c));
    setEditingContact(null);
  };

  const handleAddCustomField = async (field: Omit<CustomField, 'id' | 'createdAt'>) => {
    try {
      await contactService.createCustomField(field);
      const updatedFields = await contactService.getAllCustomFields();
      setCustomFields(updatedFields);
      setShowCustomFieldModal(false);
    } catch (error) {
      console.error('Error adding custom field:', error);
    }
  };
  
  const handleEditCustomField = async (fieldId: string, updates: Partial<CustomField>) => {
    try {
      await contactService.updateCustomField(fieldId, updates);
      const updatedFields = await contactService.getAllCustomFields();
      setCustomFields(updatedFields);
      setEditingCustomField(null);
    } catch (error) {
      console.error('Error updating custom field:', error);
    }
  };
  
  const handleDeleteCustomField = async (fieldId: string) => {
    if (!confirm('Are you sure you want to delete this custom field? This will remove the field from all contacts.')) {
      return;
    }
    
    try {
      await contactService.deleteCustomField(fieldId);
      const updatedFields = await contactService.getAllCustomFields();
      setCustomFields(updatedFields);
    } catch (error) {
      console.error('Error deleting custom field:', error);
    }
  };
  
  const handleUpdateContactCustomFields = async (contactId: string, customFields: Record<string, any>) => {
    try {
      await contactService.updateContact(contactId, { customFields });
      await refreshContacts();
    } catch (error) {
      console.error('Error updating contact custom fields:', error);
    }
  };

  const allTags = Array.from(new Set(contacts.flatMap(c => c.tags)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interpreter Manager</h1>
          <p className="text-gray-600 mt-2">Comprehensive contact and project management system</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFishIntegrationModal(true)}
            className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Globe className="h-4 w-4 mr-2" />
            Fish Integration
          </button>
          <button
            onClick={() => setShowCustomFieldManagerModal(true)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Settings className="h-4 w-4 mr-2" />
            Custom Fields
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Contacts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clients</p>
              <p className="text-2xl font-bold text-gray-900">{stats.clients}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Interpreters</p>
              <p className="text-2xl font-bold text-gray-900">{stats.interpreters}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeContacts}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingContacts}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Filters & Search</h3>
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            <Filter className="w-4 h-4" />
            {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
          </button>
        </div>
        
        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts, emails, notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="client">Clients ({contacts.filter(c => c.type === 'client').length})</option>
               <option value="interpreter">Interpreters ({contacts.filter(c => c.type === 'interpreter').length})</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt">Created Date</option>
                <option value="name">Name</option>
                <option value="lastContact">Last Contact</option>
                <option value="status">Status</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source
                </label>
                <select
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Sources</option>
                  <option value="website_form">Website Form</option>
                  <option value="interpreter_application">Interpreter Application</option>
                  <option value="manual">Manual Entry</option>
                  <option value="import">Import</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={dateRangeFilter.start}
                    onChange={(e) => setDateRangeFilter(prev => ({ ...prev, start: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Start date"
                  />
                  <input
                    type="date"
                    value={dateRangeFilter.end}
                    onChange={(e) => setDateRangeFilter(prev => ({ ...prev, end: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="End date"
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </button>
                  <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Upload className="h-4 w-4 mr-1" />
                    Import
                  </button>
                </div>
              </div>
            </div>
            
            {/* Clear Filters Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setFilterStatus('all');
                  setFilterSource('all');
                  setSelectedTags([]);
                  setDateRangeFilter({ start: '', end: '' });
                  setSortBy('createdAt');
                  setSortOrder('desc');
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Filter by Tags:</p>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredContacts.length} of {contacts.length} contacts
          {(searchTerm || filterType !== 'all' || filterStatus !== 'all' || filterSource !== 'all' || selectedTags.length > 0 || dateRangeFilter.start || dateRangeFilter.end) && 
            ' (filtered)'}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleContactClick(contact)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        contact.type === 'client' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {contact.type === 'client' ? (
                          <Building2 className={`h-5 w-5 ${
                            contact.type === 'client' ? 'text-green-600' : 'text-purple-600'
                          }`} />
                        ) : (
                          <UserCheck className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-500">{contact.email}</div>
                        {contact.company && (
                          <div className="text-xs text-gray-400">{contact.company}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      contact.type === 'client' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {contact.type === 'client' ? 'Client' : 'Interpreter'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      contact.status === 'active' ? 'bg-green-100 text-green-800' :
                      contact.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      contact.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contact.source.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {contact.createdAt instanceof Date ? contact.createdAt.toLocaleDateString() : 
                   contact.createdAt?.toDate ? contact.createdAt.toDate().toLocaleDateString() : 
                   new Date().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactClick(contact);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditContact(contact);
                        }}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Contacts Found</h3>
            <p className="text-gray-500">No contacts match your current filters.</p>
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {showContactModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedContact.email}</p>
                </div>
                {selectedContact.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{selectedContact.phone}</p>
                  </div>
                )}
                {selectedContact.company && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <p className="text-gray-900">{selectedContact.company}</p>
                  </div>
                )}
              </div>

              {/* Custom Fields */}
              {Object.keys(selectedContact.customFields).length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Custom Fields</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedContact.customFields).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                        <p className="text-gray-900">{value || 'N/A'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {selectedContact.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedContact.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedContact.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedContact.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Field Modal */}
      {showCustomFieldModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add Custom Field</h2>
              <button
                onClick={() => setShowCustomFieldModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const field: Omit<CustomField, 'id' | 'createdAt'> = {
                name: formData.get('name') as string,
                type: formData.get('type') as any,
                required: formData.get('required') === 'on',
                appliesTo: formData.get('appliesTo') as any,
                options: formData.get('type') === 'select' ? 
                    ((formData.get('options') as string) || '')?.split(',').map(o => o.trim()).filter(o => o) : undefined
              };
              handleAddCustomField(field);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g., Priority Level, Industry"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                <select
                  name="type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => {
                    const optionsDiv = document.getElementById('options-div');
                    if (optionsDiv) {
                      optionsDiv.style.display = e.target.value === 'select' ? 'block' : 'none';
                    }
                  }}
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="select">Select (Dropdown)</option>
                  <option value="boolean">Boolean (Yes/No)</option>
                </select>
              </div>

              <div id="options-div" style={{ display: 'none' }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Options (comma-separated)</label>
                <input
                  type="text"
                  name="options"
                  placeholder="Low, Medium, High, Critical"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Separate options with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Applies To</label>
                <select
                  name="appliesTo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Contacts</option>
                  <option value="clients">Clients Only</option>
                  <option value="interpreters">Interpreters Only</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="required"
                  id="required"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
                  Required field
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCustomFieldModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Custom Field Manager Modal */}
      {showCustomFieldManagerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Manage Custom Fields</h3>
              <button
                onClick={() => setShowCustomFieldManagerModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {customFields.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No custom fields created yet.</p>
                <button
                  onClick={() => {
                    setShowCustomFieldManagerModal(false);
                    setShowCustomFieldModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create First Custom Field
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {customFields.map((field) => (
                  <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{field.name}</h4>
                        <div className="mt-1 text-sm text-gray-500 space-x-4">
                          <span>Type: <span className="font-medium">{field.type}</span></span>
                          <span>Applies to: <span className="font-medium">{field.appliesTo}</span></span>
                          {field.required && <span className="text-red-600 font-medium">Required</span>}
                        </div>
                        {field.options && (
                          <div className="mt-2">
                            <span className="text-sm text-gray-500">Options: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {field.options.map((option, index) => (
                                <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => setEditingCustomField(field)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit field"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                           onClick={() => field.id && handleDeleteCustomField(field.id)}
                           className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                           title="Delete field"
                         >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <button
                onClick={() => {
                  setShowCustomFieldManagerModal(false);
                  setShowCustomFieldModal(true);
                }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Field
              </button>
              <button
                onClick={() => setShowCustomFieldManagerModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
         </div>
       )}
       
       {/* Edit Custom Field Modal */}
       {editingCustomField && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg p-6 w-full max-w-md">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold">Edit Custom Field</h3>
               <button
                 onClick={() => setEditingCustomField(null)}
                 className="text-gray-400 hover:text-gray-600"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <form
               onSubmit={(e) => {
                 e.preventDefault();
                 const formData = new FormData(e.currentTarget);
                 const updates: Partial<CustomField> = {
                   name: formData.get('name') as string,
                   type: formData.get('type') as any,
                   required: formData.get('required') === 'on',
                   appliesTo: formData.get('appliesTo') as any,
                   options: formData.get('type') === 'select' ? 
                     ((formData.get('options') as string) || '')?.split(',').map(o => o.trim()).filter(o => o) : undefined
                 };
                 if (editingCustomField.id) {
                   handleEditCustomField(editingCustomField.id, updates);
                 }
               }}
             >
               <div className="space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Field Name
                   </label>
                   <input
                     type="text"
                     name="name"
                     required
                     defaultValue={editingCustomField.name}
                     placeholder="e.g., Priority Level, Industry"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Field Type
                   </label>
                   <select
                     name="type"
                     required
                     defaultValue={editingCustomField.type}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     onChange={(e) => {
                       const optionsDiv = document.getElementById('edit-options-div');
                       if (optionsDiv) {
                         optionsDiv.style.display = e.target.value === 'select' ? 'block' : 'none';
                       }
                     }}
                   >
                     <option value="text">Text</option>
                     <option value="number">Number</option>
                     <option value="date">Date</option>
                     <option value="select">Select (Dropdown)</option>
                     <option value="boolean">Boolean (Yes/No)</option>
                   </select>
                 </div>
                 
                 <div id="edit-options-div" style={{ display: editingCustomField.type === 'select' ? 'block' : 'none' }}>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Options (comma-separated)
                   </label>
                   <input
                     type="text"
                     name="options"
                     defaultValue={editingCustomField.options?.join(', ') || ''}
                     placeholder="Low, Medium, High, Critical"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                   />
                   <p className="text-xs text-gray-500 mt-1">Separate options with commas</p>
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     Applies To
                   </label>
                   <select
                     name="appliesTo"
                     required
                     defaultValue={editingCustomField.appliesTo}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                   >
                     <option value="all">All Contacts</option>
                     <option value="clients">Clients Only</option>
                     <option value="interpreters">Interpreters Only</option>
                   </select>
                 </div>
                 
                 <div className="flex items-center">
                   <input
                     type="checkbox"
                     name="required"
                     id="edit-required"
                     defaultChecked={editingCustomField.required}
                     className="mr-2 rounded"
                   />
                   <label htmlFor="edit-required" className="text-sm text-gray-700">
                     Required field
                   </label>
                 </div>
               </div>
               
               <div className="flex justify-end space-x-3 mt-6">
                 <button
                   type="button"
                   onClick={() => setEditingCustomField(null)}
                   className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                 >
                   Cancel
                 </button>
                 <button
                   type="submit"
                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                 >
                   Update Field
                 </button>
               </div>
             </form>
           </div>
         </div>
       )}
       
       {/* Fish Integration Modal */}
       {showFishIntegrationModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-semibold">Fish Integration Manager</h3>
               <button
                 onClick={() => setShowFishIntegrationModal(false)}
                 className="text-gray-400 hover:text-gray-600"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <FishIntegrationManager />
             
             <div className="flex justify-end mt-6 pt-4 border-t">
               <button
                 onClick={() => setShowFishIntegrationModal(false)}
                 className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
               >
                 Close
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 }

export default InterpreterManager;