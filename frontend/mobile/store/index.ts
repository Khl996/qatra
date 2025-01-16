import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { storeApi } from './api/storeApi';
import { offersApi } from './api/offersApi';
import { pointsApi } from './api/pointsApi';

export const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    [offersApi.reducerPath]: offersApi.reducer,
    [pointsApi.reducerPath]: pointsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      storeApi.middleware,
      offersApi.middleware,
      pointsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
