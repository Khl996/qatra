import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'merchant' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export function useAuth() {
  return useSelector((state: RootState & { auth: AuthState }) => ({
    user: state.auth.user,
    token: state.auth.token,
    isAuthenticated: !!state.auth.token
  }));
}
