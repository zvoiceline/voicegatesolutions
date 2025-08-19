import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Languages, LogOut, User } from 'lucide-react';

function DashboardHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Voicegate Solutions" className="h-8" />
            <span className="text-sm text-neutral-700 ml-2">
              {user?.role === 'admin' ? 'Admin Portal' : 'Interpreter Portal'}
            </span>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-neutral-600" />
              <span className="text-neutral-900 font-medium">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;