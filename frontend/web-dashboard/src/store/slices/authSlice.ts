import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/api-config';
import { LoginCredentials, StoreProfile } from '../../types';

// تعريف واجهة AuthState مرة واحدة
interface AuthState {
  isAuthenticated: boolean;
  userRole: 'admin' | 'merchant' | null;
  user: any | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// تعريف واجهة LoginPayload
interface LoginPayload {
  credentials: {
    email: string;
    password: string;
  };
  role: 'admin' | 'merchant';
}

// استرجاع الحالة من Local Storage
const storedToken = localStorage.getItem('token');
const storedUserRole = localStorage.getItem('userRole') as 'admin' | 'merchant' | null;
const storedUser = localStorage.getItem('user');

const initialState: AuthState = {
  isAuthenticated: !!storedToken,
  userRole: storedUserRole,
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  isLoading: false,
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ credentials, role }: LoginPayload, { rejectWithValue }) => {
    try {
      console.log('Login attempt:', { credentials, role });
      const response = await api.post(`/api/auth/${role}/login`, credentials);
      console.log('Login response:', response.data);
      return { ...response.data, role };
    } catch (error: any) {
      console.error('Login error:', error);
      return rejectWithValue(error.response?.data?.message || 'خطأ في تسجيل الدخول');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data: StoreProfile) => {
    const response = await api.put('/merchant/profile', data);
    return response.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/store/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'خطأ في التسجيل');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userRole = action.payload.role;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userRole', action.payload.role);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        // لا نقوم بتسجيل الدخول مباشرة بعد التسجيل
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
