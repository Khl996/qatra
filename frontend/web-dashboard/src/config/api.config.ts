import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // تأكد من أن عنوان الباك إند صحيح

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// إضافة interceptor للتعامل مع التوكن
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// إضافة interceptor للتعامل مع الأخطاء
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const endpoints = {
    auth: {
        login: '/auth/admin/login',
        logout: '/auth/admin/logout',
        profile: '/auth/admin/profile'
    },
    users: {
        list: '/admin/users',
        create: '/admin/users',
        update: (id: string) => `/admin/users/${id}`,
        delete: (id: string) => `/admin/users/${id}`,
    },
    stores: {
        list: '/admin/stores',
        approve: (id: string) => `/admin/stores/${id}/approve`,
        reject: (id: string) => `/admin/stores/${id}/reject`,
        stats: '/admin/stores/stats'
    },
    points: {
        transactions: '/admin/points/transactions',
        stats: '/admin/points/stats'
    },
    dashboard: {
        stats: '/admin/dashboard/stats',
        recentActivity: '/admin/dashboard/recent-activity'
    },
    // إضافة نقاط النهاية الخاصة بلوحة تحكم المتاجر
    storeAuth: {
        login: '/auth/store/login',
        logout: '/auth/store/logout',
        profile: '/auth/store/profile'
    },
    storeManagement: {
        offers: '/store/offers',
        createOffer: '/store/offers',
        updateOffer: (id: string) => `/store/offers/${id}`,
        deleteOffer: (id: string) => `/store/offers/${id}`,
        stats: '/store/stats'
    },
    storePoints: {
        transactions: '/store/points/transactions',
        stats: '/store/points/stats'
    }
};
