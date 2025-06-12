// src/api/index.js
export { authAPI } from './auth';
export { ideasAPI } from './ideas';
export { analysisAPI } from './analysis';
export { profileAPI } from './profile';
export { platformAPI } from './platform';
export { filesAPI } from './files';
export { notionAPI } from './notion';

// Export the configured axios instance
export { default as api } from './config';

// Utility functions
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'An error occurred',
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
      data: null
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
      data: null
    };
  }
};

// Helper function to get user from token
export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  return null;
};
