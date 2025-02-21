import axios from 'axios';

// تغيير عنوان IP إلى العنوان الصحيح للباك إند
const API_BASE_URL = 'http://172.20.10.4:5000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // زيادة وقت الانتظار
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// إضافة معترض للتشخيص
axiosInstance.interceptors.request.use(
  config => {
    console.log('🚀 API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

const storesApi = {
  getFeaturedStores: async () => {
    try {
      console.log('📍 Attempting to fetch featured stores...');
      const response = await axiosInstance.get('/api/stores/featured');
      console.log('✅ Featured stores fetched successfully:', response.data);
      return {
        stores: response.data || [],
        total: response.data?.length || 0
      };
    } catch (error: any) {
      console.error('❌ Store fetch error:', error);
      throw error;
    }
  },

  getNearbyStores: async (latitude: number, longitude: number) => {
    try {
      const response = await axiosInstance.get('/api/stores/nearby', {
        params: { latitude, longitude }
      });
      return {
        stores: response.data || [],
        total: response.data?.length || 0
      };
    } catch (error: any) {
      console.error('Nearby stores fetch error:', error);
      return { stores: [], total: 0 };
    }
  },

  getStoreDetails: async (storeId: string) => {
    const response = await axiosInstance.get(`/api/stores/${storeId}`);
    return response.data;
  },

  getStoreOffers: async (storeId: string) => {
    const response = await axiosInstance.get(`/api/stores/${storeId}/offers`);
    return response.data;
  }
};

export default storesApi;
