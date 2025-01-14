export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('ar-SA', {
    style: 'currency',
    currency: 'SAR'
  });
};

export const formatPhoneNumber = (phone: string): string => {
  // تنسيق رقم الجوال السعودي
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(966|0)?(\d{9})$/);
  if (match) {
    return `+966 ${match[2].replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')}`;
  }
  return phone;
};
