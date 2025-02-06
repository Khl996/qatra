import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppDispatch';

interface AuthGuardProps {
    children: ReactNode;
    userType?: 'merchant' | 'admin';
}

const AuthGuard = ({ children, userType = 'merchant' }: AuthGuardProps) => {
    const location = useLocation();
    const { token, user } = useAppSelector(state => state.auth);

    if (!token || !user) {
        return <Navigate 
            to={userType === 'merchant' ? '/merchant/login' : '/admin/login'} 
            state={{ from: location }} 
            replace 
        />;
    }

    return <>{children}</>;
};

export default AuthGuard;
