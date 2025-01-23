import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MerchantLoginPage from '../pages/merchant/LoginPage';
import AdminLoginPage from '../pages/admin/LoginPage';
import MerchantDashboard from '../modules/merchant-dashboard/pages/Dashboard';
import AdminDashboard from '../modules/admin-dashboard/pages/Dashboard';
import UnauthorizedPage from '../shared/pages/UnauthorizedPage';

const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode;
  requiredRole: 'admin' | 'merchant';
}) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to={`/${requiredRole}/login`} />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default function AppRoutes() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Routes>
      {/* صفحات تسجيل الدخول */}
      <Route path="/merchant/login" element={<MerchantLoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* لوحة تحكم المتاجر */}
      <Route path="/merchant/*" element={
        <ProtectedRoute requiredRole="merchant">
          <MerchantDashboard />
        </ProtectedRoute>
      } />

      {/* لوحة تحكم المسؤولين */}
      <Route path="/admin/*" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* إعادة التوجيه الافتراضي */}
      <Route path="/" element={
        isAuthenticated ? (
          <Navigate to={`/${userRole}/dashboard`} />
        ) : (
          <Navigate to="/merchant/login" />
        )
      } />
    </Routes>
  );
}
