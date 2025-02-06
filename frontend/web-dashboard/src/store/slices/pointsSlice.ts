import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/api-config';
import { PointTransaction } from '../../types';

interface PointsState {
    transactions: PointTransaction[];
    isLoading: boolean;
    error: string | null;
}

const initialState: PointsState = {
    transactions: [],
    isLoading: false,
    error: null
};

export const addPoints = createAsyncThunk(
    'points/addPoints',
    async (data: PointTransaction) => {
        const response = await api.post('/merchant/points/add', data);
        return response.data;
    }
);

export const getPointsHistory = createAsyncThunk(
    'points/getHistory',
    async () => {
        const response = await api.get('/merchant/points/history');
        return response.data;
    }
);

const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPoints.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addPoints.fulfilled, (state, action) => {
                state.transactions.unshift(action.payload);
                state.isLoading = false;
            })
            .addCase(getPointsHistory.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.isLoading = false;
            });
    }
});

export default pointsSlice.reducer;
