import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useGetCurrentUserQuery } from '@shared/services/auth';

interface AuthGuardProps {
  role: 'merchant' | 'admin';
}

export default function AuthGuard({ role }: AuthGuardProps) {
  const { data: user, isLoading } = useGetCurrentUserQuery(undefined);

  if (isLoading) {
    return <CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%' }} />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <Outlet />;
}
