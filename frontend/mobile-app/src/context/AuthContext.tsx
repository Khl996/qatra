import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User, LoginCredentials } from '../types/auth';
import { checkNetworkConnection } from '../utils/networkManager';
import requestManager from '../services/requestManager';
import { cacheManager } from '../utils/cacheManager';
import { handleApiError } from '../utils/apiErrorHandler';
import { api } from '../config/api.config';  // إضافة import للـ api

// تعريف نوع بيانات التسجيل
interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
}

interface AuthContextType {
    isLoading: boolean;
    token: string | null;
    user: User | null;
    register: (data: RegisterData) => Promise<void>;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    verifyOtp: (otp: string) => Promise<void>;
    checkAuth: () => Promise<void>;
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

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'LOADING', isLoading: true });
      const response = await requestManager.post('/auth/login', credentials);
      
      if (response.data.token && response.data.user) {
        await AsyncStorage.multiSet([
          ['auth_token', response.data.token],
          ['user', JSON.stringify(response.data.user)]
        ]);

        dispatch({ 
          type: 'SIGN_IN', 
          token: response.data.token,
          user: response.data.user
        });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      dispatch({ type: 'LOADING', isLoading: false });
    }
  };

  const register = async (data: RegisterData) => {
    try {
        dispatch({ type: 'LOADING', isLoading: true });
        console.log('Sending register request with data:', data);
        
        const response = await requestManager.post('/auth/register', data);
        console.log('Register response:', response.data);

        if (response.data.token) {
            await AsyncStorage.multiSet([
                ['auth_token', response.data.token],
                ['user', JSON.stringify(response.data.user)]
            ]);

            dispatch({ 
                type: 'SIGN_IN',
                token: response.data.token,
                user: response.data.user 
            });
        }
    } catch (error: any) {
        console.error('Register error:', error.response || error);
        throw new Error(
            error.response?.data?.message || 
            'فشل الاتصال بالخادم. يرجى المحاولة مرة أخرى'
        );
    } finally {
        dispatch({ type: 'LOADING', isLoading: false });
    }
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

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        dispatch({ type: 'SIGN_OUT' });
        return;
      }

      const response = await api.get('/auth/verify-token');
      if (response.data.user) {
        dispatch({ 
          type: 'SIGN_IN',
          token,
          user: response.data.user
        });
      } else {
        await AsyncStorage.removeItem('auth_token');
        dispatch({ type: 'SIGN_OUT' });
      }
    } catch (error) {
      await AsyncStorage.removeItem('auth_token');
      dispatch({ type: 'SIGN_OUT' });
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...state, 
        login, 
        register, 
        logout,
        verifyOtp,
        checkAuth // إضافة هنا
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
