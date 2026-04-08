import api from './api';

export interface User {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    role: 'customer' | 'provider';
    businessName?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export const authApi = {
    login: async (identifier: { phone?: string, email?: string, password?: string }) => {
        const response = await api.post<AuthResponse>('/auth/login', identifier);
        return response.data;
    },

    register: async (data: any) => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    getMe: async () => {
        // Token should be injected by api interceptor
        const response = await api.get<User>('/auth/me');
        return response.data;
    }
};
