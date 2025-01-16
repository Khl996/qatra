import { format, formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale/ar'; // تغيير طريقة الاستيراد

export const formatDate = (date: string | Date) => {
  return format(new Date(date), 'dd MMMM yyyy', { locale: ar });
};

export const formatRelativeTime = (date: string | Date) => {
  return formatDistance(new Date(date), new Date(), {
    locale: ar,
    addSuffix: true
  });
};
