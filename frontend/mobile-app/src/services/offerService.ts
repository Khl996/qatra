import { api } from '../config/api.config';

export interface Offer {
    id: string;
    title: string;
    description: string;
    points: number;
    imageUrl: string;
    expiryDate: string;
    storeName: string;
    storeId: string;
    status: 'active' | 'expired' | 'used';
}

export const offerService = {
    getAllOffers: async () => {
        const response = await api.get('/offers');
        return response.data;
    },

    getOfferById: async (id: string) => {
        const response = await api.get(`/offers/${id}`);
        return response.data;
    },

    getStoreOffers: async (storeId: string) => {
        const response = await api.get(`/stores/${storeId}/offers`);
        return response.data;
    },

    searchOffers: async (query: string) => {
        const response = await api.get(`/offers/search?q=${query}`);
        return response.data;
    }
};

export default offerService;
