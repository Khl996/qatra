import api from './api';

export const loginUser = async (credentials) => {
    return await api.post('/users/login', credentials);
};
