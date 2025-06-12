// src/api/analysis.js
import api from './config';

export const analysisAPI = {
  // Get analysis by idea ID
  getAnalysisByIdeaId: async (ideaId) => {
    const response = await api.get(`/analysis/idea/${ideaId}`);
    return response.data;
  },

  // Get analysis status
  getAnalysisStatus: async (ideaId) => {
    const response = await api.get(`/analysis/status/${ideaId}`);
    return response.data;
  },

  // Start analysis
  startAnalysis: async (ideaId) => {
    const response = await api.post(`/analysis/start/${ideaId}`);
    return response.data;
  },

  // Get processing statistics for dashboard
  getProcessingStats: async () => {
    const response = await api.get('/analysis/processing-stats');
    return response.data;
  },

  // Get vulnerabilities
  getVulnerabilities: async () => {
    const response = await api.get('/analysis/vulnerabilities');
    return response.data;
  },

  // Download report
  downloadReport: async (ideaId, format = 'pdf') => {
    const response = await api.get(`/reports/${ideaId}/download?format=${format}`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // Share report
  shareReport: async (ideaId, shareData) => {
    const response = await api.post(`/reports/${ideaId}/share`, shareData);
    return response.data;
  }
};
