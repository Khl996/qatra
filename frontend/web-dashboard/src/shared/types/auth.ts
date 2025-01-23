export interface LoginResponse {
  token: string;
  userType: 'admin' | 'merchant';
}

export interface LoginCredentials {
  email: string;
  password: string;
}
