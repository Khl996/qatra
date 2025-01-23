import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type UserRole = 'admin' | 'merchant';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (token: string, role: UserRole) => void;
  logout: () => void;
}

// إضافة وضع التطوير
const isDevelopment = process.env.NODE_ENV === 'development';

// تحديث بيانات التطوير
const getDevAuth = (path: string): { token: string; role: UserRole } => {
  // التحقق من المسار لتحديد الدور
  if (path.startsWith('/admin')) {
    return {
      token: 'fake-admin-token-for-development',
      role: 'admin'
    };
  }
  return {
    token: 'fake-merchant-token-for-development',
    role: 'merchant'
  };
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const devAuth = getDevAuth(location.pathname);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (isDevelopment) return true;
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    return !!(token && role);
  });
  
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    if (isDevelopment) return devAuth.role;
    return (localStorage.getItem('userRole') as UserRole) || null;
  });

  useEffect(() => {
    // في وضع التطوير، نضع بيانات وهمية في localStorage
    if (isDevelopment) {
      localStorage.setItem('token', devAuth.token);
      localStorage.setItem('userRole', devAuth.role);
    }
  }, []);

  // تحديث الدور عند تغيير المسار في وضع التطوير
  useEffect(() => {
    if (isDevelopment) {
      const newAuth = getDevAuth(location.pathname);
      setUserRole(newAuth.role);
      localStorage.setItem('token', newAuth.token);
      localStorage.setItem('userRole', newAuth.role);
    }
  }, [location.pathname]);

  const login = (token: string, role: UserRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: isDevelopment ? true : isAuthenticated, 
      userRole: isDevelopment ? devAuth.role : userRole, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
