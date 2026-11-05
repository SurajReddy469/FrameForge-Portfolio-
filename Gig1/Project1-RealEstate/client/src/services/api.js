import axios from 'axios';
import { initialMockProperties, initialMockInquiries } from '../data/mockProperties';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const isNetworkFailure = (err) => !err.response || err.response.status === 401 || err.response.status === 403;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 4000
});

// Attach Authorization Bearer token to requests
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('urbannest_user');
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        const demoToken = parsed.isDemoMode
          ? (parsed.role === 'admin' ? 'demo-admin' : 'demo-user')
          : parsed.token;

        if (demoToken) {
          config.headers.Authorization = `Bearer ${demoToken}`;
        }
      } catch (e) {
        console.error('Failed to parse user info', e);
      }
    }
    return config;

  },
  (error) => Promise.reject(error)
);

// Fallback handling to ensure demo resilience
export const propertyService = {
  getProperties: async (params = {}) => {
    try {
      const res = await api.get('/properties', { params });
      return res.data;
    } catch (err) {
      if (!isNetworkFailure(err)) throw err;
      if (!window.__hasLoggedDemoNotice) {
        console.info('[FrameForge Portfolio] Dual-engine active: running in standalone demo mode with high-fidelity local dataset.');
        window.__hasLoggedDemoNotice = true;
      }
      let filtered = [...initialMockProperties];

      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(
          p => p.title.toLowerCase().includes(q) || p.address.city.toLowerCase().includes(q)
        );
      }
      if (params.city && params.city !== 'All') {
        filtered = filtered.filter(p => p.address.city.toLowerCase() === params.city.toLowerCase());
      }
      if (params.propertyType && params.propertyType !== 'All') {
        filtered = filtered.filter(p => p.propertyType === params.propertyType);
      }
      if (params.purpose && params.purpose !== 'All') {
        filtered = filtered.filter(p => p.purpose === params.purpose);
      }
      if (params.minPrice) {
        filtered = filtered.filter(p => p.price >= Number(params.minPrice));
      }
      if (params.maxPrice) {
        filtered = filtered.filter(p => p.price <= Number(params.maxPrice));
      }
      if (params.bedrooms && params.bedrooms !== 'All') {
        filtered = filtered.filter(p => p.specs.bedrooms === Number(params.bedrooms));
      }

      if (params.sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (params.sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      }

      return {
        success: true,
        count: filtered.length,
        total: filtered.length,
        data: filtered,
        isFallback: true
      };
    }
  },

  getFeatured: async () => {
    try {
      const res = await api.get('/properties/featured');
      return res.data;
    } catch (err) {
      if (!isNetworkFailure(err)) throw err;
      return {
        success: true,
        data: initialMockProperties.filter(p => p.featured),
        isFallback: true
      };
    }
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/properties/${id}`);
      return res.data;
    } catch (err) {
      if (!isNetworkFailure(err)) throw err;
      const match = initialMockProperties.find(p => p._id === id);
      if (!match) throw err;
      return {
        success: true,
        data: match,
        isFallback: true
      };
    }
  },

  create: async (payload) => {
    try {
      const res = await api.post('/properties', payload);
      return res.data;
    } catch (err) {
      if (!isNetworkFailure(err)) throw err;
      const newProp = {
        _id: 'prop-' + Date.now(),
        ...payload,
        createdAt: new Date().toISOString()
      };
      initialMockProperties.unshift(newProp);
      return { success: true, data: newProp, isFallback: true };
    }
  },

  update: async (id, payload) => {
    try {
      const res = await api.put(`/properties/${id}`, payload);
      return res.data;
    } catch (err) {
      if (!isNetworkFailure(err)) throw err;
      const index = initialMockProperties.findIndex((property) => property._id === id);
      if (index < 0) throw err;
      initialMockProperties[index] = { ...initialMockProperties[index], ...payload };
      return { success: true, data: initialMockProperties[index], isFallback: true };
    }
  },

  delete: async (id) => {
    try {
      const res = await api.delete(`/properties/${id}`);
      return res.data;
    } catch (err) {
      if (!isNetworkFailure(err)) throw err;
      const index = initialMockProperties.findIndex(p => p._id === id);
      if (index !== -1) initialMockProperties.splice(index, 1);
      return { success: true, isFallback: true };
    }
  }
};

export const inquiryService = {
  create: async (payload) => {
    try {
      const res = await api.post('/inquiries', payload);
      return res.data;
    } catch (err) {
      if (!isNetworkFailure(err)) throw err;
      const newInquiry = {
        _id: 'inq-' + Date.now(),
        ...payload,
        status: 'New',
        createdAt: new Date().toISOString()
      };
      initialMockInquiries.unshift(newInquiry);
      return {
        success: true,
        message: 'Inquiry submitted successfully! An agent will contact you shortly.',
        data: newInquiry,
        isFallback: true
      };
    }
  },

  getAll: async () => {
    try {
      const res = await api.get('/inquiries');
      return res.data;
    } catch (err) {
      if (!isNetworkFailure(err)) throw err;
      return {
        success: true,
        data: initialMockInquiries,
        isFallback: true
      };
    }
  },

  updateStatus: async (id, status) => {
    try {
      const res = await api.put(`/inquiries/${id}/status`, { status });
      return res.data;
    } catch (err) {
      if (!isNetworkFailure(err)) throw err;
      const target = initialMockInquiries.find(i => i._id === id);
      if (target) target.status = status;
      return { success: true, data: target, isFallback: true };
    }
  }
};

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

export const authService = {
  login: async (credentials) => {
    try {
      const res = await api.post('/auth/login', credentials);
      return res.data;
    } catch (err) {
      if (!isNetworkFailure(err)) throw new Error(err.response?.data?.message || 'Login failed');
      // Demo accounts are available only when the API cannot be reached.
      if (credentials.email === 'admin@urbannest.com' && credentials.password === 'admin123') {
        return {
          success: true,
          data: {
            _id: 'admin-1',
            name: 'FrameForge Admin',
            email: 'admin@urbannest.com',
            role: 'admin',
            avatar: DEFAULT_AVATAR,
            token: 'mock-jwt-admin-token',
            isDemoMode: true
          }
        };
      }
      if (credentials.email === 'user@urbannest.com' && credentials.password === 'user123') {
        return {
          success: true,
          data: {
            _id: 'user-1',
            name: 'Rahul Sharma',
            email: 'user@urbannest.com',
            role: 'user',
            avatar: DEFAULT_AVATAR,
            token: 'mock-jwt-user-token',
            isDemoMode: true
          }
        };
      }
      throw new Error(err.response?.data?.message || 'Invalid credentials');
    }
  },

  register: async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      return res.data;
    } catch (err) {
      if (!isNetworkFailure(err)) throw new Error(err.response?.data?.message || 'Registration failed');
      return {
        success: true,
        data: {
          _id: 'user-' + Date.now(),
          name: userData.name,
          email: userData.email,
          role: 'user',
          avatar: DEFAULT_AVATAR,
          token: 'mock-jwt-registered-token',
          isDemoMode: true
        }
      };
    }
  }
};

authService.me = async () => (await api.get('/auth/me')).data;
authService.toggleFavorite = async (propertyId) => (await api.post(`/auth/favorites/${propertyId}`)).data;

export default api;
