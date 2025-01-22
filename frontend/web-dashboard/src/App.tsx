import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { merchantRoutes, adminRoutes } from './routes/routes';
import AuthGuard from '@shared/components/auth/AuthGuard';

export default function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/" element={<Navigate to="/merchant" />} />
        
        {/* Merchant Routes */}
        <Route element={<AuthGuard role="merchant" />}>
          {merchantRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.element />}>
              {route.children?.map((child) => (
                <Route key={child.path} path={child.path} element={<child.element />} />
              ))}
            </Route>
          ))}
        </Route>

        {/* Admin Routes */}
        <Route element={<AuthGuard role="admin" />}>
          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.element />}>
              {route.children?.map((child) => (
                <Route key={child.path} path={child.path} element={<child.element />} />
              ))}
            </Route>
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}
