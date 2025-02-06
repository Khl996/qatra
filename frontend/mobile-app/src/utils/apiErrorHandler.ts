import { AxiosError } from 'axios';
import { AuthError } from '../types/auth';

export const handleApiError = (error: AxiosError): AuthError => {
    if (error.response?.data && typeof error.response.data === 'object') {
        const data = error.response.data as { message?: string };
        return {
            message: data.message || 'حدث خطأ',
            code: error.response.status.toString()
        };
    }
    return {
        message: 'فشل الاتصال بالخادم',
        code: '500'
    };
};
