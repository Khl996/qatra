import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:5000/api'; // تغيير هذا حسب عنوان الخادم الفعلي

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('token');
            // إعادة توجيه المستخدم لصفحة تسجيل الدخول
            // navigation.navigate('Login'); // سيتم تنفيذه من خلال context
        }
        return Promise.reject(error);
    }
);

export const endpoints = {
    auth: {
        login: '/auth/mobile/login',
        register: '/auth/mobile/register',
        verifyOTP: '/auth/mobile/verify-otp'
    },
    user: {
        profile: '/user/profile',
        points: '/user/points',
        offers: '/user/offers'
    },
    stores: {
        nearby: '/stores/nearby',
        details: '/stores/details',
        search: '/stores/search'
    }
};
