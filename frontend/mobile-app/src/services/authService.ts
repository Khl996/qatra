import { User } from '../types/auth';
import { api, endpoints } from '../config/api.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^(05\d{8}|5\d{8})$/;
  if (!phoneRegex.test(phone)) {
    return 'رقم الجوال غير صحيح';
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'البريد الإلكتروني غير صحيح';
  }
  return null;
};

export const validateName = (name: string): string | null => {
  if (name.length < 3) {
    return 'الاسم يجب أن يكون 3 أحرف على الأقل';
  }
  return null;
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post(endpoints.auth.login, credentials);
    if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post(endpoints.auth.register, data);
    return response.data;
};

export const verifyOTP = async (phone: string, code: string): Promise<AuthResponse> => {
    const response = await api.post(endpoints.auth.verifyOTP, { phone, code });
    if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem('token');
};
