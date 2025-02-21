import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const merchantApi = {
  // Dashboard Stats
  getDashboardStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/merchant/dashboard/stats`);
    return response.data;
  },

  // Customers
  getCustomers: async (page = 1, limit = 10) => {
    const response = await axios.get(`${API_BASE_URL}/merchant/customers`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Transactions
  getTransactions: async (filters = {}) => {
    const response = await axios.get(`${API_BASE_URL}/merchant/transactions`, {
      params: filters
    });
    return response.data;
  },

  // Points
  addPoints: async (customerId: string, points: number) => {
    const response = await axios.post(`${API_BASE_URL}/merchant/points/add`, {
      customerId,
      points
    });
    return response.data;
  },

  // Points Management
  getPointsHistory: async (filters = {}) => {
    const response = await axios.get(`${API_BASE_URL}/merchant/points/history`, {
      params: filters
    });
    return response.data;
  },
  
  redeemPoints: async (customerId: string, points: number) => {
    const response = await axios.post(`${API_BASE_URL}/merchant/points/redeem`, {
      customerId,
      points
    });
    return response.data;
  },

  // Reports
  getReports: async (type: string, dateRange: { start: Date, end: Date }) => {
    const response = await axios.get(`${API_BASE_URL}/merchant/reports`, {
      params: { type, ...dateRange }
    });
    return response.data;
  },

  // Offers
  getOffers: async () => {
    const response = await axios.get(`${API_BASE_URL}/merchant/offers`);
    return response.data;
  },

  createOffer: async (offerData: any) => {
    const response = await axios.post(`${API_BASE_URL}/merchant/offers`, offerData);
    return response.data;
  },

  // Settings
  getMerchantProfile: async () => {
    const response = await axios.get(`${API_BASE_URL}/merchant/profile`);
    return response.data;
  },

  updateMerchantProfile: async (profileData: any) => {
    const response = await axios.put(`${API_BASE_URL}/merchant/profile`, profileData);
    return response.data;
  }
};

export default merchantApi;
