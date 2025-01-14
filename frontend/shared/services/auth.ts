import api from '../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types';

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

class AuthService {
  private TOKEN_KEY = 'qatra_token';

  async login(phone: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', { phone, password });
    await this.setToken(response.data.token);
    return response.data;
  }

  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/register', data);
    await this.setToken(response.data.token);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      await this.removeToken();
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  private async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem(this.TOKEN_KEY, token);
  }

  private async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(this.TOKEN_KEY);
  }

  private async removeToken(): Promise<void> {
    await AsyncStorage.removeItem(this.TOKEN_KEY);
  }
}

export const auth = new AuthService();
export default auth;
