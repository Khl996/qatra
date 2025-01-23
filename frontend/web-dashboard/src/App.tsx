import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<CircularProgress />}>
        <AppRoutes />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
