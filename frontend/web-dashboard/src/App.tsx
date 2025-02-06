import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store';
import AdminLayout from './layouts/AdminLayout';
import MerchantLayout from './layouts/MerchantLayout';
import AdminLoginPage from './pages/admin/auth/AdminLoginPage';
import MerchantLoginPage from './pages/merchant/auth/MerchantLoginPage';
import MerchantRegisterPage from './pages/merchant/auth/MerchantRegisterPage';
import AuthGuard from './routes/AuthGuard';
import theme from './theme';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Routes>
          {/* مسارات المسؤول */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/*"
            element={
              <AuthGuard role="admin">
                <AdminLayout />
              </AuthGuard>
            }
          />

          {/* مسارات التاجر */}
          <Route path="/merchant/login" element={<MerchantLoginPage />} />
          <Route path="/merchant/register" element={<MerchantRegisterPage />} />
          <Route
            path="/merchant/*"
            element={
              <AuthGuard role="merchant">
                <MerchantLayout />
              </AuthGuard>
            }
          />

          {/* التوجيه الافتراضي */}
          <Route path="/" element={<Navigate to="/merchant/login" replace />} />
        </Routes>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
