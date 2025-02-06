import { api } from '../config/api.config';

export const homeService = {
    getSliderImages: async () => {
        const response = await api.get('/slider-images');
        return response.data;
    },

    getTopStores: async () => {
        const response = await api.get('/stores/top');
        return response.data;
    },

    getNearbyStores: async (latitude: number, longitude: number) => {
        const response = await api.get(`/stores/nearby?lat=${latitude}&lng=${longitude}`);
        return response.data;
    },

    getLatestOffers: async () => {
        const response = await api.get('/offers/latest');
        return response.data;
    }
};
