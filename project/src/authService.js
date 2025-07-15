// src/authService.js
import API from './api';

// POST /api/auth/register
export const registerUser = async (data) => {
  const res = await API.post('/api/auth/register', data);
  return res.data;   // expected { user, token }
};

// POST /api/auth/login
export const loginUser = async (data) => {
  const res = await API.post('/api/auth/login', data);
  return res.data;   // expected { user, token }
};
