export interface LoginResponse {
  token: string;
  userType: 'merchant' | 'admin';
}

export interface LoginCredentials {
  email: string;
  password: string;
}
