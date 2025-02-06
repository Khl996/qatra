import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const adminApi = {
  // إحصائيات لوحة التحكم
  getDashboardStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/dashboard/stats`);
    return response.data;
  },

  // إدارة المتاجر
  getStores: async (params?: { status?: string; page?: number }) => {
    const response = await axios.get(`${API_BASE_URL}/admin/stores`, { params });
    return response.data;
  },

  approveStore: async (storeId: string) => {
    const response = await axios.put(`${API_BASE_URL}/admin/stores/${storeId}/approve`);
    return response.data;
  },

  // إدارة المستخدمين
  getUsers: async (params?: { page?: number }) => {
    const response = await axios.get(`${API_BASE_URL}/admin/users`, { params });
    return response.data;
  },

  // التقارير
  getSystemReports: async (params?: { type?: string; startDate?: string; endDate?: string }) => {
    const response = await axios.get(`${API_BASE_URL}/admin/reports`, { params });
    return response.data;
  },

  // إحصائيات مالية
  getFinancialStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/finance/stats`);
    return response.data;
  }
};

export default adminApi;
