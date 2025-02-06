import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// تعريف الأنواع
interface LoginCredentials {
    email: string;    // تأكيد استخدام email
    password: string;
}

interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface DashboardStats {
    totalUsers: number;
    totalStores: number;
    totalPoints: number;
}

interface AdminState {
    user: AdminUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    dashboardStats: DashboardStats | null;
    lastStatsFetch: number | null; // إضافة وقت آخر تحديث
    lastFetch: number | null;
}

// الحالة الأولية
const initialState: AdminState = {
    user: JSON.parse(localStorage.getItem('adminUser') || 'null'),
    token: localStorage.getItem('adminToken'),
    isLoading: false,
    error: null,
    dashboardStats: null,
    lastStatsFetch: null, // إضافة وقت آخر تحديث
    lastFetch: null
};

// تعريف API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// تعريف thunk لتسجيل الدخول
export const loginAdmin = createAsyncThunk(
    'admin/login',
    async (credentials: { email: string; password: string }) => {
        try {
            const response = await axios.post(`${API_URL}/admin/login`, credentials);
            const { token, user } = response.data;
            
            // تخزين التوكن
            localStorage.setItem('adminToken', token);
            // تخزين معلومات المستخدم
            localStorage.setItem('adminUser', JSON.stringify(user));
            
            return { token, user };
        } catch (error: any) {
            throw error.response?.data?.message || 'Login failed';
        }
    }
);

export const fetchDashboardStats = createAsyncThunk(
    'admin/fetchDashboardStats',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/admin/dashboard/stats`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            return response.data;
        } catch (error: any) {
            // التحقق من نوع الخطأ
            if (error.response?.status === 401 && 
                error.response?.data?.code === 'TOKEN_EXPIRED') {
                // تسجيل الخروج تلقائياً
                dispatch(logout());
                throw new Error('انتهت صلاحية الجلسة، الرجاء إعادة تسجيل الدخول');
            }
            return rejectWithValue(error.response?.data?.message || 'حدث خطأ في جلب البيانات');
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<{token: string; user: AdminUser}>) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(fetchDashboardStats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dashboardStats = action.payload;
                state.lastStatsFetch = Date.now(); // تحديث وقت آخر جلب للبيانات
                state.lastFetch = Date.now();
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'فشل في جلب إحصائيات لوحة التحكم';
            });
    }
});

export const { logout, clearError } = adminSlice.actions;
export default adminSlice.reducer;
