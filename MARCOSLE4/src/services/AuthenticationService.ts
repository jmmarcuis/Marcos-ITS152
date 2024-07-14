// AuthenticationService.ts
import axios from 'axios';
import { saveToken, removeToken, getToken, saveUsername } from './TokenService';

const API_URL = 'http://localhost:5046/api/login';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
});

 api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const login = async (userName: string, password: string) => {
  try {
    const response = await api.post('/login', { userName, password });
    const { token } = response.data;
    saveToken(token);
    saveUsername(userName); // Save username in local storage
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const register = async (userName: string, firstName: string, lastName: string, password: string) => {
  try {
    const response = await api.post('/register', { userName, firstName, lastName, password });
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const logout = () => {
  removeToken();
};
