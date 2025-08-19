import React from 'react';
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
  DollarSign
} from 'lucide-react';

function AdminDashboard() {
  const { clientRequests, interpreterApplications } = useData();

  const stats = {
    totalInterpreters: interpreterApplications.length,
    activeInterpreters: interpreterApplications.filter(app => app.status === 'approved').length,
    pendingApplications: interpreterApplications.filter(app => app.status === 'pending').length,
    clientRequests: clientRequests.length,
    newRequests: clientRequests.filter(req => req.status === 'new').length
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor platform activity and manage operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Interpreters</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalInterpreters}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Interpreters</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeInterpreters}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Client Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.clientRequests}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stats.newRequests > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  {stats.newRequests} New Client Request{stats.newRequests > 1 ? 's' : ''}
                </h3>
                <p className="text-blue-800">Requires immediate attention from the team.</p>
              </div>
            </div>
          </div>
        )}

        {stats.pendingApplications > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900">
                  {stats.pendingApplications} Pending Application{stats.pendingApplications > 1 ? 's' : ''}
                </h3>
                <p className="text-yellow-800">Interpreter applications awaiting review.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Onboarding Completion Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">75%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Response Time</span>
              <span className="text-sm font-medium text-gray-900">2.3 hours</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Client Satisfaction</span>
              <span className="text-sm font-medium text-gray-900">4.8/5.0</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Monthly Growth</span>
              <span className="text-sm font-medium text-green-600">+12%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>Year to date</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Performance chart would display here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;