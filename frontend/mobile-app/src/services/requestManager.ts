import axios, { AxiosError, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../config/env';

const requestManager = axios.create({
  baseURL: env.apiUrl,
  timeout: env.timeoutSeconds * 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

requestManager.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

requestManager.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await AsyncStorage.multiRemove(['token', 'user']);
      // يمكن إضافة إعادة توجيه للمصادقة هنا
    }
    return Promise.reject(error);
  }
);

export default requestManager;
