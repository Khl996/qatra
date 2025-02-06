import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { NotificationData } from '../../types';

interface UIState {
    isLoading: boolean;
    error: string | null;
    notification: NotificationData | null;
    isSidebarOpen: boolean;
}

const initialState: UIState = {
    isLoading: false,
    error: null,
    notification: null,
    isSidebarOpen: true
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        showNotification: (state, action: PayloadAction<NotificationData>) => {
            state.notification = action.payload;
        },
        clearNotification: (state) => {
            state.notification = null;
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        }
    }
});

export const {
    setLoading,
    setError,
    showNotification,
    clearNotification,
    toggleSidebar
} = uiSlice.actions;

export default uiSlice.reducer;
