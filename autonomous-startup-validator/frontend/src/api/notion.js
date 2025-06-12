// src/api/notion.js
import api from './config';

export const notionAPI = {
  // Validate Notion URL
  validateNotionUrl: async (url) => {
    const response = await api.post('/notion/validate', { url });
    return response.data;
  },

  // Get Notion content
  getNotionContent: async (url) => {
    const response = await api.post('/notion/content', { url });
    return response.data;
  },

  // Connect Notion workspace
  connectWorkspace: async (authCode) => {
    const response = await api.post('/notion/connect', { authCode });
    return response.data;
  }
};
