// src/api/ideas.js
import api from './config';

export const ideasAPI = {
  // Submit new idea
  submitIdea: async (formData) => {
    const response = await api.post('/ideas/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        // This can be used for upload progress tracking
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        return progress;
      }
    });
    return response.data;
  },

  // Get user's ideas
  getUserIdeas: async (userId) => {
    const response = await api.get(`/ideas/user/${userId}`);
    return response.data;
  },

  // Get idea by ID
  getIdeaById: async (ideaId) => {
    const response = await api.get(`/ideas/${ideaId}`);
    return response.data;
  },

  // Get recent submissions
  getRecentSubmissions: async () => {
    const response = await api.get('/ideas/recent');
    return response.data;
  },

  // Delete idea
  deleteIdea: async (ideaId) => {
    const response = await api.delete(`/ideas/${ideaId}`);
    return response.data;
  },

  // Update idea
  updateIdea: async (ideaId, updateData) => {
    const response = await api.put(`/ideas/${ideaId}`, updateData);
    return response.data;
  }
};
