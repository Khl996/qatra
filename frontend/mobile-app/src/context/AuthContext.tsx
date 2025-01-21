import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (phone: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      
      dispatch({ type: 'RESTORE_TOKEN', token, user });
    } catch (error) {
      console.error('Error loading auth state:', error);
    }
  };

  const login = async (phone: string) => {
    try {
      // سيتم إضافة طلب API هنا
      dispatch({ type: 'LOADING', isLoading: true });
      await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة طلب API
      
      // بيانات تجريبية
      const fakeUser = {
        id: '1',
        name: 'محمد أحمد',
        phone,
        email: 'mohammed@example.com',
        points: 100
      };
      const fakeToken = 'fake_token_123';

      await AsyncStorage.setItem('auth_token', fakeToken);
      await AsyncStorage.setItem('user', JSON.stringify(fakeUser));
      
      dispatch({ type: 'SIGN_IN', token: fakeToken, user: fakeUser });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: Partial<User>) => {
    // سيتم إضافة منطق التسجيل
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user');
      dispatch({ type: 'SIGN_OUT' });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const verifyOtp = async (otp: string) => {
    // سيتم إضافة منطق التحقق من OTP
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...state, 
        login, 
        register, 
        logout,
        verifyOtp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function authReducer(state: AuthState, action: any): AuthState {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        token: action.token,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        token: action.token,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}
