import { api } from '../config/api.config';

export interface Store {
    id: string;
    name: string;
    imageUrl: string;
    category: string;
    rating?: number;
    description?: string;
    distance?: string;
}

export interface StoreOffer {
    id: string;
    title: string;
    description: string;
    points: number;
    storeName: string;
    discount: number;
    expiryDate: string;
    imageUrl: string;
}

export const storeService = {
    getAllStores: async () => {
        const response = await api.get('/stores');
        return response.data;
    },

    getNearbyStores: async (latitude: number, longitude: number, radius: number = 5000) => {
        const response = await api.get(`/stores/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);
        return response.data;
    },

    getStoreById: async (id: string) => {
        const response = await api.get(`/stores/${id}`);
        return response.data;
    },

    getStoreOffers: async (storeId: string) => {
        const response = await api.get(`/stores/${storeId}/offers`);
        return response.data;
    }
};
