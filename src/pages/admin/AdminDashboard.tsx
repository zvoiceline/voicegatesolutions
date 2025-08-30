import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import {
  Users,
  UserCheck,
  Clock,
  TrendingUp,
  MessageSquare,
  Calendar,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Filter,
  Search,
  Download,
  Eye,
  Trash2,
  Mail,
  Phone,
  MapPin,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const { clientRequests, interpreterApplications } = useData();
  const [activeTab, setActiveTab] = useState<'applications' | 'contacts'>('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const stats = {
    totalInterpreters: interpreterApplications.length,
    activeInterpreters: interpreterApplications.filter(app => app.status === 'approved').length,
    pendingApplications: interpreterApplications.filter(app => app.status === 'pending').length,
    clientRequests: clientRequests.length,
    newRequests: clientRequests.filter(req => req.status === 'new').length
  };

  const handleStatusChange = (id: string, newStatus: string, type: 'application' | 'contact') => {
    // This would integrate with your existing data context methods
    console.log(`Updating ${type} ${id} to status: ${newStatus}`);
  };

  const handleDelete = (id: string, type: 'application' | 'contact') => {
    // This would integrate with your existing data context methods
    console.log(`Deleting ${type}: ${id}`);
  };

  const filteredApplications = interpreterApplications.filter(app => {
    const matchesSearch = 
      app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.languages?.some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredContacts = clientRequests.filter(contact => {
    const matchesSearch = 
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'new':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
      case 'contacted':
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const recentActivity = [
    {
      id: '1',
      type: 'client_request',
      message: 'New service request from Tech Corp',
      time: '2 hours ago',
      icon: MessageSquare,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: '2',
      type: 'interpreter_application',
      message: 'New interpreter application from Maria Garcia',
      time: '4 hours ago',
      icon: UserCheck,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: '3',
      type: 'onboarding',
      message: 'Interpreter completed onboarding step',
      time: '1 day ago',
      icon: CheckCircle,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Back to Website
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Total Applications</p>
                <p className="text-2xl font-semibold text-neutral-900">{stats.totalInterpreters}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Pending Review</p>
                <p className="text-2xl font-semibold text-neutral-900">{stats.pendingApplications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Contact Requests</p>
                <p className="text-2xl font-semibold text-neutral-900">{stats.clientRequests}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">This Week</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {interpreterApplications.filter(app => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    const appDate = app.createdAt?.toDate ? app.createdAt.toDate() : new Date(app.createdAt);
                    return appDate > weekAgo;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-neutral-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                Job Applications ({interpreterApplications.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contacts'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                Contact Submissions ({clientRequests.length})
              </button>
            </nav>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  {activeTab === 'applications' ? (
                    <>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="interview_scheduled">Interview Scheduled</option>
                    </>
                  ) : (
                    <>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                    </>
                  )}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-3 py-2 border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
            </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'applications' ? (
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <div key={application.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="text-lg font-semibold text-neutral-900">
                              {application.name}
                            </h3>
                            <p className="text-sm text-neutral-600">{application.languages?.join(', ')}</p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-600">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {application.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {application.phone}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(application.createdAt?.toDate ? application.createdAt.toDate() : application.createdAt)}
                          </div>
                        </div>
                        
                        <div className="mt-2 text-sm text-neutral-600">
                          <span className="font-medium">Experience:</span> {application.experience} | 
                          <span className="font-medium"> Specializations:</span> {application.specializations?.join(', ')} | 
                          <span className="font-medium"> Availability:</span> {application.availability}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <select
                          value={application.status}
                          onChange={(e) => handleStatusChange(application.id!, e.target.value, 'application')}
                          className="px-3 py-1 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                          <option value="interview_scheduled">Interview Scheduled</option>
                        </select>
                        
                        <button className="p-2 text-neutral-400 hover:text-neutral-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        <button 
                          onClick={() => handleDelete(application.id!, 'application')}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredApplications.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-neutral-400" />
                    <h3 className="mt-2 text-sm font-medium text-neutral-900">No applications found</h3>
                    <p className="mt-1 text-sm text-neutral-500">No job applications match your current filters.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="text-lg font-semibold text-neutral-900">{contact.name}</h3>
                            {contact.company && (
                              <p className="text-sm text-neutral-600">{contact.company}</p>
                            )}
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Service Request
                          </span>
                        </div>
                        
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-600">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              {contact.phone}
                            </div>
                          )}
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(contact.createdAt?.toDate ? contact.createdAt.toDate() : contact.createdAt)}
                          </div>
                        </div>
                        
                        <div className="mt-3 p-3 bg-neutral-50 rounded-md">
                          <p className="text-sm text-neutral-700">{contact.message}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <select
                          value={contact.status}
                          onChange={(e) => handleStatusChange(contact.id!, e.target.value, 'contact')}
                          className="px-3 py-1 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="closed">Closed</option>
                        </select>
                        
                        <button 
                          onClick={() => handleDelete(contact.id!, 'contact')}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredContacts.length === 0 && (
                  <div className="text-center py-8">
                    <Mail className="mx-auto h-12 w-12 text-neutral-400" />
                    <h3 className="mt-2 text-sm font-medium text-neutral-900">No contacts found</h3>
                    <p className="mt-1 text-sm text-neutral-500">No contact submissions match your current filters.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;