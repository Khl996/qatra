export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const MERCHANT_ENDPOINTS = {
  login: '/merchant/auth/login',
  register: '/merchant/auth/register',
};

export {};
