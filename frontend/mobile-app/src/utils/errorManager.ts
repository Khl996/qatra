
import { AxiosError } from 'axios';
import env from '../config/env';

export class ApiError extends Error {
  code: string;
  
  constructor(message: string, code: string = 'UNKNOWN_ERROR') {
    super(message);
    this.code = code;
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: AxiosError): ApiError => {
  if (env.enableLogs) {
    console.error('API Error:', error);
  }

  if (error.response?.data && typeof error.response.data === 'object') {
    const data = error.response.data as { message?: string; code?: string };
    return new ApiError(
      data.message || 'حدث خطأ غير متوقع',
      data.code || error.response.status.toString()
    );
  }

  return new ApiError('فشل الاتصال بالخادم', 'NETWORK_ERROR');
};