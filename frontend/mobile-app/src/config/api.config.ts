import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://172.20.10.4:5000'; // بدون /api

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 15000
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
        points: '/points',
        offers: '/user/offers'
    },
    stores: {
        all: '/stores',
        featured: '/stores/featured',
        nearby: '/stores/nearby',
        details: (id: string) => `/stores/${id}`,
        offers: (id: string) => `/stores/${id}/offers`
    }
};
