// src/api/platform.js
import api from './config';

export const platformAPI = {
  // Get platform statistics for landing page
  getPlatformStats: async () => {
    const response = await api.get('/platform/stats');
    return response.data;
  },

  // Get featured testimonials
  getFeaturedTestimonials: async () => {
    const response = await api.get('/testimonials/featured');
    return response.data;
  },

  // Submit testimonial
  submitTestimonial: async (testimonialData) => {
    const response = await api.post('/testimonials', testimonialData);
    return response.data;
  },

  // Get system health
  getSystemHealth: async () => {
    const response = await api.get('/platform/health');
    return response.data;
  }
};
