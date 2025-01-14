export const formatNumber = (num: number): string => {
  return num.toLocaleString('ar-SA');
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatPhone = (phone: string): string => {
  // تنسيق رقم الجوال السعودي
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `+966${cleaned}`;
  }
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return `+966${cleaned.slice(1)}`;
  }
  return phone;
};

export const validatePhone = (phone: string): boolean => {
  const regex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  return regex.test(phone);
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
