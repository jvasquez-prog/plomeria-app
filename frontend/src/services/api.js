import axios from 'axios';
import useAuthStore from '../store/authStore';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  quickRegister: (data) => api.post('/auth/quick-register', data),
  getMe: () => api.get('/auth/me')
};

// Plumbers
export const plumbersAPI = {
  getAll: (params) => api.get('/plumbers', { params }),
  getById: (id) => api.get(`/plumbers/${id}`),
  createProfile: (data) => api.post('/plumbers/profile', data),
  updateProfile: (data) => api.put('/plumbers/profile', data)
};

// Requests
export const requestsAPI = {
  create: (data) => api.post('/requests', data),
  getUserRequests: () => api.get('/requests/my-requests'),
  getPlumberRequests: () => api.get('/requests/plumber-requests')
};

// Quotes
export const quotesAPI = {
  create: (data) => api.post('/quotes', data),
  accept: (id) => api.put(`/quotes/${id}/accept`)
};

export default api;
