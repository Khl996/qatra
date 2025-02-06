import { api } from '../config/api.config';

export const dataService = {
  // خدمات المتاجر
  getStores: async () => {
    const response = await api.get('/stores');
    return response.data;
  },

  // خدمات النقاط
  getUserPoints: async () => {
    const response = await api.get('/points');
    return response.data;
  },

  getPointsHistory: async () => {
    const response = await api.get('/points/history');
    return response.data;
  },

  // خدمات العروض
  getOffers: async () => {
    const response = await api.get('/offers');
    return response.data;
  },

  // خدمات الإشعارات
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  }
};
