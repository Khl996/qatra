import { User } from '../types/auth';

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
