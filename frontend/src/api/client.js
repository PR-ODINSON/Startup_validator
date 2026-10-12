import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
});

export const submitIdea = async (data) => {
  const response = await api.post('/validation/submit-idea', data);
  return response.data;
};

export const getResults = async (id) => {
  const response = await api.get(`/validation/results/${id}`);
  return response.data;
};

export default api;
