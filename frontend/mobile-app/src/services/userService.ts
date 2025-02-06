import { api } from '../config/api.config';

export const userService = {
    getProfile: async () => {
        const response = await api.get('/users/profile');
        return response.data;
    },

    updateProfile: async (data: any) => {
        const response = await api.put('/users/profile', data);
        return response.data;
    }
};
