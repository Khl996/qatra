import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

// استيراد المخططات بشكل منفصل
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));
const MerchantLayout = React.lazy(() => import('./layouts/MerchantLayout'));

// استيراد الصفحات
const MerchantLoginPage = React.lazy(() => import('./pages/merchant/auth/MerchantLoginPage'));
const MerchantRegisterPage = React.lazy(() => import('./pages/merchant/auth/MerchantRegisterPage'));
const RegisterSuccessPage = React.lazy(() => import('./pages/merchant/auth/RegisterSuccessPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/merchant/auth/ForgotPasswordPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const MerchantDashboard = React.lazy(() => import('./pages/merchant/dashboard/MerchantDashboard'));
const PointsManagementPage = React.lazy(() => import('./pages/merchant/points/PointsManagementPage'));
const OffersManagementPage = React.lazy(() => import('./pages/merchant/offers/OffersManagementPage'));
const StatisticsPage = React.lazy(() => import('./pages/merchant/statistics/StatisticsPage'));
const SalesPage = React.lazy(() => import('./pages/merchant/sales/SalesPage'));
const FinancePage = React.lazy(() => import('./pages/merchant/finance/FinancePage'));
const ReportsPage = React.lazy(() => import('./pages/merchant/reports/ReportsPage'));
const SettingsPage = React.lazy(() => import('./pages/merchant/settings/SettingsPage'));
const AdminLoginPage = React.lazy(() => import('./pages/admin/auth/AdminLoginPage'));
const AdminDashboard = React.lazy(() => import('./pages/admin/dashboard/AdminDashboard'));
const StoresManagement = React.lazy(() => import('./pages/admin/stores/StoresManagement'));
const UsersManagement = React.lazy(() => import('./pages/admin/users/UsersManagement'));
const FinancialReports = React.lazy(() => import('./pages/admin/finance/FinancialReports'));
const SystemReports = React.lazy(() => import('./pages/admin/reports/SystemReports'));
const SystemSettings = React.lazy(() => import('./pages/admin/settings/SystemSettings'));
const SystemManagement = React.lazy(() => import('./pages/admin/system/SystemManagement'));

function App() {
  console.log('App component rendering');

  return (
    <ChakraProvider>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/merchant/login" element={<MerchantLoginPage />} />
          
          {/* Merchant Routes */}
          <Route path="/merchant" element={<MerchantLayout />}>
            <Route path="register" element={<MerchantRegisterPage />} />
            <Route path="register-success" element={<RegisterSuccessPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="dashboard" element={<MerchantDashboard />} />
            <Route path="points" element={<PointsManagementPage />} />
            <Route path="offers" element={<OffersManagementPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="login" element={<AdminLoginPage />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="stores" element={<StoresManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="finance" element={<FinancialReports />} />
            <Route path="reports" element={<SystemReports />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="system" element={<SystemManagement />} />
          </Route>

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/merchant/login" replace />} />

          {/* 404 Page - Must be last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </ChakraProvider>
  );
}

export default App;
