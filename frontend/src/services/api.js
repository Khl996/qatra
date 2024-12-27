import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api', // رابط الخلفية
});

export default api;
