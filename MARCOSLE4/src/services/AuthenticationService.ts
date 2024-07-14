// src/services/authService.ts
import axios from 'axios';
import { saveToken, removeToken } from './TokenService';

const API_URL = 'http://localhost:5046/api/login'; // Login API URL
export const login = async (userName: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { userName, password });
        const { data } = response;
        saveToken(data);
        return data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

export const register = async (userName: string, firstName: string, lastName: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { userName, firstName, lastName, password });
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};

export const logout = () => {
    removeToken();
};
