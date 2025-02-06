import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppDispatch';

interface AuthGuardProps {
  children: ReactNode;
  role: 'admin' | 'merchant';
}

const AuthGuard = ({ children, role }: AuthGuardProps) => {
  const { isAuthenticated, userRole } = useAppSelector(state => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/${role}/login`, { replace: true, state: { from: location } });
    } else if (userRole !== role) {
      navigate(`/${userRole}/dashboard`, { replace: true });
    }
  }, [isAuthenticated, userRole, role, navigate, location]);

  if (!isAuthenticated || userRole !== role) {
    return null; // لا تعرض أي شيء هنا، التوجيه يتم بواسطة useEffect
  }

  return <>{children}</>;
};

export default AuthGuard;
