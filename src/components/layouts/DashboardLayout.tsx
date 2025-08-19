import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../DashboardHeader';
import Sidebar from '../Sidebar';

interface DashboardLayoutProps {
  userType: 'interpreter' | 'admin';
}

function DashboardLayout({ userType }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <div className="flex">
        <Sidebar userType={userType} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;