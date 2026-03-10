import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  quickRegister: (data) => api.post('/auth/quick-register', data),
  getMe: () => api.get('/auth/me')
};

export const plumbersAPI = {
  getAll: (params) => api.get('/plumbers', { params }),
  getById: (id) => api.get(`/plumbers/${id}`),
  createProfile: (data) => api.post('/plumbers/profile', data),
  updateProfile: (data) => api.put('/plumbers/profile', data)
};

export const requestsAPI = {
  create: (data) => api.post('/requests', data),
  getMy: () => api.get('/requests/my-requests'),
  getPlumberRequests: () => api.get('/requests/plumber-requests')
};

export const quotesAPI = {
  create: (data) => api.post('/quotes', data),
  accept: (id) => api.put(`/quotes/${id}/accept`)
};

export default api;
