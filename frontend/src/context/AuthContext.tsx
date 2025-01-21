import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  userType: 'user' | 'store' | 'admin' | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState<'user' | 'store' | 'admin' | null>(null);

  // التحقق من حالة المصادقة عند بدء التطبيق
  useEffect(() => {
    // التحقق من التوكن المخزن
    // تحميل بيانات المستخدم
  }, []);

  const login = async (credentials: any) => {
    // تنفيذ عملية تسجيل الدخول
    // حفظ التوكن
    // تحديث حالة المستخدم
  };

  const logout = () => {
    // تنفيذ تسجيل الخروج
    // مسح التوكن
    // إعادة توجيه المستخدم
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
