import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppDispatch';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'merchant';
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { user, token } = useAppSelector(state => state.admin);
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
