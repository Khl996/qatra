import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default API;