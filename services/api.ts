import axios from 'axios';
import { Platform } from 'react-native';

// Dynamically assign Base URL based on platform
// Android Emulator uses 10.0.2.2 to point to host localhost
// iOS / Web uses normal localhost
export const BASE_URL = Platform.OS === 'android' 
    ? 'http://10.0.2.2:5000/api'
    : 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    // Import dynamically to avoid circular dependency issues
    const { useAuthStore } = require('../hooks/useAuthStore');
    const token = useAuthStore.getState().token;
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
