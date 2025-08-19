import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  CreditCard,
  User,
  Users,
  UserCheck,
  MessageSquare,
  FolderOpen
} from 'lucide-react';

interface SidebarProps {
  userType: 'interpreter' | 'admin';
}

function Sidebar({ userType }: SidebarProps) {
  const location = useLocation();

  const interpreterMenuItems = [
    { path: '/interpreter/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/interpreter/onboarding', label: 'Onboarding', icon: CheckSquare },
    { path: '/interpreter/resources', label: 'Resources', icon: BookOpen },
    { path: '/interpreter/payouts', label: 'Payouts', icon: CreditCard },
    { path: '/interpreter/profile', label: 'Profile', icon: User },
  ];

  const adminMenuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/interpreters', label: 'Interpreters', icon: UserCheck },
    { path: '/admin/clients', label: 'Clients', icon: Users },
    { path: '/admin/resources', label: 'Resources', icon: FolderOpen },
    { path: '/admin/communications', label: 'Communications', icon: MessageSquare },
  ];

  const menuItems = userType === 'interpreter' ? interpreterMenuItems : adminMenuItems;

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="mt-6">
        <div className="px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  isActive
                    ? 'bg-blue-50 border-r-4 border-blue-600 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                } group flex items-center px-3 py-2 text-sm font-medium transition-colors`}
              >
                <Icon className={`${
                  isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                } mr-3 h-5 w-5 flex-shrink-0`} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;