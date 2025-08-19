import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import PublicLayout from './components/layouts/PublicLayout';
import DashboardLayout from './components/layouts/DashboardLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import InterpreterDashboard from './pages/interpreter/InterpreterDashboard';
import InterpreterOnboarding from './pages/interpreter/InterpreterOnboarding';
import InterpreterResources from './pages/interpreter/InterpreterResources';
import InterpreterPayouts from './pages/interpreter/InterpreterPayouts';
import InterpreterProfile from './pages/interpreter/InterpreterProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminInterpreters from './pages/admin/AdminInterpreters';
import AdminClients from './pages/admin/AdminClients';
import AdminResources from './pages/admin/AdminResources';
import AdminCommunications from './pages/admin/AdminCommunications';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="careers" element={<Careers />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              {/* Auth Route */}
              <Route path="/login" element={<Login />} />

              {/* Interpreter Portal */}
              <Route path="/interpreter" element={
                <ProtectedRoute allowedRoles={['interpreter']}>
                  <DashboardLayout userType="interpreter" />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/interpreter/dashboard" replace />} />
                <Route path="dashboard" element={<InterpreterDashboard />} />
                <Route path="onboarding" element={<InterpreterOnboarding />} />
                <Route path="resources" element={<InterpreterResources />} />
                <Route path="payouts" element={<InterpreterPayouts />} />
                <Route path="profile" element={<InterpreterProfile />} />
              </Route>

              {/* Admin Portal */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardLayout userType="admin" />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="interpreters" element={<AdminInterpreters />} />
                <Route path="clients" element={<AdminClients />} />
                <Route path="resources" element={<AdminResources />} />
                <Route path="communications" element={<AdminCommunications />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;