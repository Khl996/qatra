import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import Home from '../app/page'; // تحديث المسار ليعكس التغييرات
import StoreSignUp from '../pages/StoreSignUp';
import StoreLogin from '../pages/StoreLogin';
import StoreDashboard from '../pages/StoreDashboard';
import AddPoints from '../pages/AddPoints';
import ManageOffers from '../pages/ManageOffers';
import ManageProducts from '../pages/ManageProducts';
import SalesReports from '../pages/SalesReports';
import Commission from '../pages/Commission';
import AdminLogin from '../pages/AdminLogin';
import UserManagement from '../pages/UserManagement';
import StoreManagement from '../pages/StoreManagement';
import AdManagement from '../pages/AdManagement';
import DiscountManagement from '../pages/DiscountManagement';
import FinancialReports from '../pages/FinancialReports';
// ...existing code...

const AppNavigation: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store-signup" element={<StoreSignUp />} />
          <Route path="/store-login" element={<StoreLogin />} />
          <Route path="/store-dashboard" element={<StoreDashboard />} />
          <Route path="/add-points" element={<AddPoints />} />
          <Route path="/manage-offers" element={<ManageOffers />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/sales-reports" element={<SalesReports />} />
          <Route path="/commission" element={<Commission />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/store-management" element={<StoreManagement />} />
          <Route path="/ad-management" element={<AdManagement />} />
          <Route path="/discount-management" element={<DiscountManagement />} />
          <Route path="/financial-reports" element={<FinancialReports />} />
          {/* ...existing code... */}
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default AppNavigation;
