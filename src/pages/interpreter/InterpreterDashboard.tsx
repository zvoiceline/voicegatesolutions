import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  ArrowRight,
  BookOpen,
  CreditCard
} from 'lucide-react';

function InterpreterDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Here's an overview of your interpreter account</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Account Status</div>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-yellow-700">Onboarding</span>
          </div>
        </div>
      </div>

      {/* Status Alert */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-yellow-800">Complete Your Onboarding</h3>
            <p className="text-sm text-yellow-700 mt-1">
              You're 4 steps away from being fully activated. Complete your onboarding to start receiving assignments.
            </p>
            <Link 
              to="/interpreter/onboarding"
              className="inline-flex items-center mt-3 text-sm font-medium text-yellow-800 hover:text-yellow-900"
            >
              Continue Onboarding
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Onboarding Progress</p>
              <p className="text-2xl font-bold text-gray-900">67%</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-2/3"></div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hours This Month</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Earnings This Month</p>
              <p className="text-2xl font-bold text-gray-900">$0.00</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">N/A</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link 
              to="/interpreter/onboarding"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">Complete Onboarding</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>

            <Link 
              to="/interpreter/resources"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-green-600 mr-3" />
                <span className="font-medium text-gray-900">View Training Resources</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>

            <Link 
              to="/interpreter/payouts"
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-purple-600 mr-3" />
                <span className="font-medium text-gray-900">Set Up Payout Method</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Account Created</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Application Approved</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium text-gray-900">Welcome to Voicegate Solutions!</h4>
            <p className="text-sm text-gray-600 mt-1">
              Complete your onboarding process to start receiving interpretation assignments. 
              Our team is here to support you every step of the way.
            </p>
            <p className="text-xs text-gray-500 mt-2">3 days ago</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-medium text-gray-900">New Training Materials Available</h4>
            <p className="text-sm text-gray-600 mt-1">
              We've added new medical interpretation training modules to help you excel in healthcare settings.
            </p>
            <p className="text-xs text-gray-500 mt-2">1 week ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterpreterDashboard;