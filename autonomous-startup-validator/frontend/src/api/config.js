// src/api/config.js
import axios from 'axios';

// Set your API base URL from environment or fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create a reusable axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: add JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle auth errors and global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized (token expired or invalid)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optionally, show a notification here
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    // Optionally, handle other status codes globally here
    return Promise.reject(error);
  }
);

export default api;
