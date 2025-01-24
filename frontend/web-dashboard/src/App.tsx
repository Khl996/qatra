import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
// تصحيح مسارات الاستيراد
import MerchantLoginPage from './pages/merchant/auth/MerchantLoginPage';
import MerchantRegisterPage from './pages/merchant/auth/MerchantRegisterPage';
import RegisterSuccessPage from './pages/merchant/auth/RegisterSuccessPage';
import ForgotPasswordPage from './pages/merchant/auth/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import MerchantLayout from './layouts/MerchantLayout';
import MerchantDashboard from './pages/merchant/dashboard/MerchantDashboard';
import PointsManagementPage from './pages/merchant/points/PointsManagementPage';
import OffersManagementPage from './pages/merchant/offers/OffersManagementPage';
import StatisticsPage from './pages/merchant/statistics/StatisticsPage';
import SalesPage from './pages/merchant/sales/SalesPage';
import FinancePage from './pages/merchant/finance/FinancePage';
import ReportsPage from './pages/merchant/reports/ReportsPage';
import SettingsPage from './pages/merchant/settings/SettingsPage';
import AdminLoginPage from './pages/admin/auth/AdminLoginPage';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import AdminLayout from './layouts/admin/AdminLayout';
import StoresManagement from './pages/admin/stores/StoresManagement';
import UsersManagement from './pages/admin/users/UsersManagement';
import FinancialReports from './pages/admin/finance/FinancialReports';
import SystemReports from './pages/admin/reports/SystemReports';
import SystemSettings from './pages/admin/settings/SystemSettings';
import SystemManagement from './pages/admin/system/SystemManagement';

function App() {
  console.log('App component rendering');

  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<MerchantLoginPage />} />
        <Route path="/merchant">
          {/* Auth Routes */}
          <Route path="login" element={<MerchantLoginPage />} />
          <Route path="register" element={<MerchantRegisterPage />} />
          <Route path="register-success" element={<RegisterSuccessPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Dashboard Routes */}
          <Route element={<MerchantLayout />}>
            <Route path="dashboard" element={<MerchantDashboard />} />
            <Route path="points" element={<PointsManagementPage />} />
            <Route path="offers" element={<OffersManagementPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin">
          <Route path="login" element={<AdminLoginPage />} />
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="stores" element={<StoresManagement />} />  {/* إضافة المسار الجديد */}
            <Route path="users" element={<UsersManagement />} />  {/* إضافة المسار الجديد */}
            <Route path="finance" element={<FinancialReports />} /> {/* إضافة المسار الجديد */}
            <Route path="reports" element={<SystemReports />} /> {/* إضافة المسار الجديد */}
            <Route path="settings" element={<SystemSettings />} /> {/* إضافة المسار الجديد */}
            <Route path="system" element={<SystemManagement />} /> {/* إضافة المسار الجديد */}
          </Route>
        </Route>

        {/* 404 Page - Must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
