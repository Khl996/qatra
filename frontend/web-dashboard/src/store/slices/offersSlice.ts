import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/api-config';
import { OfferData } from '../../types';

interface OffersState {
    offers: OfferData[];
    isLoading: boolean;
    error: string | null;
}

const initialState: OffersState = {
    offers: [],
    isLoading: false,
    error: null
};

export const createOffer = createAsyncThunk(
    'offers/create',
    async (data: OfferData) => {
        const response = await api.post('/merchant/offers', data);
        return response.data;
    }
);

export const getOffers = createAsyncThunk(
    'offers/getAll',
    async () => {
        const response = await api.get('/merchant/offers');
        return response.data;
    }
);

const offersSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOffer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOffer.fulfilled, (state, action) => {
                state.offers.unshift(action.payload);
                state.isLoading = false;
            })
            .addCase(getOffers.fulfilled, (state, action) => {
                state.offers = action.payload;
                state.isLoading = false;
            });
    }
});

export default offersSlice.reducer;
