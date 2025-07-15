// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'api',      // <— base URL you gave
  headers: { 'Content-Type': 'application/json'}
});

// Attach the token (if we already have one) before every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
