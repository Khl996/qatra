import { api, endpoints } from '../config/api.config';

export const pointsService = {
    getUserPoints: async () => {
        try {
            const response = await api.get(endpoints.points.get);
            return response.data;
        } catch (error) {
            console.error('Error fetching points:', error);
            return { total: 0 };
        }
    },

    getPointsHistory: async () => {
        try {
            const response = await api.get(endpoints.points.history);
            return response.data;
        } catch (error) {
            console.error('Error fetching history:', error);
            return [];
        }
    },

    redeemPoints: async (amount: number, storeId: string) => {
        const response = await api.post(endpoints.points.redeem, {
            amount,
            storeId
        });
        return response.data;
    }
};
