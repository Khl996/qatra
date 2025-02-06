import axios from 'axios';

// تعريف نوع ImportMeta
declare interface ImportMeta {
    readonly env: {
        readonly VITE_API_BASE_URL: string;
        [key: string]: string;
    };
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: 'http://localhost:5000', // تأكد من أن هذا هو البورت الصحيح
    headers: {
        'Content-Type': 'application/json'
    }
});

// إضافة interceptors للتشخيص
api.interceptors.request.use(
    config => {
        // إضافة log لتتبع URL الكامل
        console.log('Full URL:', `${config.baseURL}${config.url}`);
        console.log('Sending Request:', {
            method: config.method,
            url: config.url,
            data: config.data
        });
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        console.log('Response:', {
            status: response.status,
            data: response.data
        });
        return response;
    },
    error => {
        console.error('Response Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/merchant/login';
        }
        return Promise.reject(error);
    }
);

export const endpoints = {
    auth: {
        login: '/auth/store/login',          // تم التعديل
        register: '/auth/store/register',     // تم التعديل
        logout: '/auth/store/logout'          // تم التعديل
    },
    store: {                                 // تم تغيير merchant إلى store
        dashboard: '/store/dashboard',
        stats: '/store/stats',
        points: '/store/points',
        offers: '/store/offers'
    }
};
