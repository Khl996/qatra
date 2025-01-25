export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  points: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
