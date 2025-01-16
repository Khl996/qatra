import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const storeAPI = {
  getStores: () => api.get('/stores'),
  getStoreDetails: (id: string) => api.get(`/stores/${id}`),
  getStoreOffers: (id: string) => api.get(`/stores/${id}/offers`),
  getStorePoints: (id: string) => api.get(`/stores/${id}/points`),
};

export const userAPI = {
  login: (data: any) => api.post('/users/login', data),
  register: (data: any) => api.post('/users/register', data),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
};

export const offersAPI = {
  getOffers: () => api.get('/offers'),
  getOffer: (id: string) => api.get(`/offers/${id}`),
};

export default api;
