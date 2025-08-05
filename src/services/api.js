import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export const hostelService = {
    // Get all hostels with filters
    getHostels: async (params = {}) => {
        try {
            const response = await api.get('/hostels', { params });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get single hostel by ID
    getHostelById: async (id) => {
        try {
            const response = await api.get(`/hostels/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get featured hostels
    getFeaturedHostels: async () => {
        try {
            const response = await api.get('/hostels/featured/list');
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Search hostels
    searchHostels: async (query, filters = {}) => {
        try {
            const params = {
                search: query,
                ...filters
            };
            const response = await api.get('/hostels', { params });
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default api;
