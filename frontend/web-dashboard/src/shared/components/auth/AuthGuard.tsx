import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  role: 'admin' | 'merchant';
}

export default function AuthGuard({ role }: AuthGuardProps) {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role !== userRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}
