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

export const universityService = {
    // Get all universities
    getUniversities: async (params = {}) => {
        try {
            const response = await api.get('/universities', { params });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get single university by ID
    getUniversityById: async (id) => {
        try {
            const response = await api.get(`/universities/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get regions
    getRegions: async () => {
        try {
            const response = await api.get('/universities/regions/list');
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Create university (admin only)
    createUniversity: async (universityData, token) => {
        try {
            const response = await api.post('/universities', universityData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Update university (admin only)
    updateUniversity: async (id, universityData, token) => {
        try {
            const response = await api.put(`/universities/${id}`, universityData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Delete university (admin only)
    deleteUniversity: async (id, token) => {
        try {
            const response = await api.delete(`/universities/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default api;
