import api from './api';

export interface SubService {
    _id: string;
    title: string;
    description: string;
    price: number;
    estimatedDuration: string;
    category: string;
    imageUrl?: string;
    providerId: string;
    isActive: boolean;
}

export const subServiceApi = {
    getAll: async () => {
        const response = await api.get<SubService[]>('/subservices');
        return response.data;
    },

    getByCategory: async (category: string) => {
        const response = await api.get<SubService[]>(`/subservices/category/${category}`);
        return response.data;
    },

    create: async (data: Partial<SubService>) => {
        const response = await api.post<SubService>('/subservices', data);
        return response.data;
    }
};
