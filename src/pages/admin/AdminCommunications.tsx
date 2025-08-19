import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Send, Users, User, Mail, MessageSquare, Filter, Search, Calendar } from 'lucide-react';

function AdminCommunications() {
  const { interpreterApplications, clientRequests } = useData();
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');
  const [recipient, setRecipient] = useState('all-interpreters');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock communication history
  const communicationHistory = [
    {
      id: '1',
      subject: 'Welcome to Voicegate Solutions',
      recipient: 'All Interpreters',
      sentAt: new Date('2024-01-15'),
      type: 'bulk',
      status: 'sent'
    },
    {
      id: '2',
      subject: 'New Training Materials Available',
      recipient: 'Maria Garcia',
      sentAt: new Date('2024-01-14'),
      type: 'individual',
      status: 'sent'
    },
    {
      id: '3',
      subject: 'Service Request Follow-up',
      recipient: 'John Smith (Client)',
      sentAt: new Date('2024-01-13'),
      type: 'client',
      status: 'sent'
    }
  ];

  const filteredHistory = communicationHistory.filter(comm =>
    comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comm.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message sending logic here
    console.log('Sending message:', { recipient, subject, message });
    
    // Reset form
    setSubject('');
    setMessage('');
    
    // Show success message (could use a toast notification)
    alert('Message sent successfully!');
  };

  const recipientOptions = [
    { value: 'all-interpreters', label: 'All Interpreters', count: interpreterApplications.length },
    { value: 'active-interpreters', label: 'Active Interpreters', count: interpreterApplications.filter(i => i.status === 'approved').length },
    { value: 'pending-interpreters', label: 'Pending Interpreters', count: interpreterApplications.filter(i => i.status === 'pending').length },
    { value: 'all-clients', label: 'All Clients', count: clientRequests.length }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
          <p className="text-gray-600 mt-2">Send messages and manage communications with interpreters and clients</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('compose')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'compose'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Compose Message
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Message History
            </button>
          </nav>
        </div>

        {/* Compose Tab */}
        {activeTab === 'compose' && (
          <div className="p-6">
            <form onSubmit={handleSendMessage} className="space-y-6">
              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {recipientOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} ({option.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Message subject"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your message here..."
                />
              </div>

              {/* Message Templates */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubject('Welcome to Voicegate Solutions');
                      setMessage('Welcome to our interpreter network! We\'re excited to have you join our team of professional interpreters...');
                    }}
                    className="text-left p-2 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    Welcome Message
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubject('New Training Materials Available');
                      setMessage('We\'ve added new training materials to help you excel in your interpretation work...');
                    }}
                    className="text-left p-2 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    Training Update
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubject('Thank you for your service request');
                      setMessage('Thank you for your interest in our language services. We\'ve received your request and will respond within 2 hours...');
                    }}
                    className="text-left p-2 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    Client Follow-up
                  </button>
                </div>
              </div>

              {/* Send Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="p-6">
            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search communications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Types</option>
                <option>Bulk Messages</option>
                <option>Individual Messages</option>
                <option>Client Messages</option>
              </select>
            </div>

            {/* Communication History */}
            <div className="space-y-4">
              {filteredHistory.map((communication) => (
                <div key={communication.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        communication.type === 'bulk' ? 'bg-blue-100' :
                        communication.type === 'individual' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        {communication.type === 'bulk' ? (
                          <Users className={`h-5 w-5 ${
                            communication.type === 'bulk' ? 'text-blue-600' :
                            communication.type === 'individual' ? 'text-green-600' :
                            'text-purple-600'
                          }`} />
                        ) : communication.type === 'individual' ? (
                          <User className="h-5 w-5 text-green-600" />
                        ) : (
                          <Mail className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{communication.subject}</h3>
                        <p className="text-sm text-gray-600">To: {communication.recipient}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {communication.sentAt.toLocaleDateString()}
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                        {communication.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHistory.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Communications Found</h3>
                <p className="text-gray-500">No communications match your search criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Messages Sent</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Bulk Messages</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-sm text-gray-600">Individual Messages</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <MessageSquare className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-600">Delivery Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCommunications;