import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pointsReducer from './slices/pointsSlice';
import offersReducer from './slices/offersSlice';
import uiReducer from './slices/uiSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        points: pointsReducer,
        offers: offersReducer,
        ui: uiReducer,
        admin: adminReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
