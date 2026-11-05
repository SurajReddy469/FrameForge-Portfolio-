import axios from 'axios';
import { initialMockProperties, initialMockInquiries } from '../data/mockProperties';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 3000
});

// Interceptor: Detect when Vercel static rewrites return index.html instead of a JSON API
api.interceptors.response.use(
  (response) => {
    if (typeof response.data === 'string' && (response.data.includes('<!doctype') || response.data.includes('<html'))) {
      const err = new Error('Static host: backend API not available on /api (HTML returned)');
      err.isStaticFallback = true;
      return Promise.reject(err);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

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

const isNetworkFailure = (err) => {
  if (err?.isStaticFallback) return true;
  if (!err?.response) return true;
  const s = err.response.status;
  return s === 404 || s >= 500 || s === 401 || s === 403;
};

// Fallback handling to ensure demo resilience
export const propertyService = {
  getProperties: async (params = {}) => {
    try {
      const res = await api.get('/properties', { params });
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        return res.data;
      }
      throw new Error('Invalid API response structure, using fallback');
    } catch (err) {
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
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        return res.data;
      }
      throw new Error('Invalid API response');
    } catch {
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
      if (res.data && res.data.success && res.data.data) {
        return res.data;
      }
      throw new Error('Invalid API response');
    } catch {
      const match = initialMockProperties.find(p => p._id === id || p.id === id) || initialMockProperties[0];
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
      if (res.data && res.data.success) {
        return res.data;
      }
      throw new Error('Invalid API response');
    } catch {
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
      if (res.data && res.data.success) {
        return res.data;
      }
      throw new Error('Invalid API response');
    } catch {
      const index = initialMockProperties.findIndex((property) => property._id === id);
      if (index >= 0) {
        initialMockProperties[index] = { ...initialMockProperties[index], ...payload };
        return { success: true, data: initialMockProperties[index], isFallback: true };
      }
      return { success: true, data: payload, isFallback: true };
    }
  },

  delete: async (id) => {
    try {
      const res = await api.delete(`/properties/${id}`);
      if (res.data && res.data.success) {
        return res.data;
      }
      throw new Error('Invalid API response');
    } catch {
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
      if (res.data && res.data.success) {
        return res.data;
      }
      throw new Error('Invalid API response');
    } catch {
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
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        return res.data;
      }
      throw new Error('Invalid API response');
    } catch {
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
      if (res.data && res.data.success) {
        return res.data;
      }
      throw new Error('Invalid API response');
    } catch {
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
      if (res.data && res.data.success) {
        return res.data;
      }
      throw new Error('Invalid API response');
    } catch (err) {
      // Demo credentials fallback for offline / static host
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
      throw new Error(err.response?.data?.message || 'Invalid credentials. Use demo: admin@urbannest.com / admin123');
    }
  },

  register: async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res.data && res.data.success) {
        return res.data;
      }
      throw new Error('Invalid API response');
    } catch {
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

authService.me = async () => {
  try {
    const res = await api.get('/auth/me');
    if (res.data && res.data.success) return res.data;
  } catch {}
  const local = localStorage.getItem('urbannest_user');
  if (local) {
    try { return JSON.parse(local); } catch {}
  }
  return null;
};

authService.toggleFavorite = async (propertyId) => {
  try {
    const res = await api.post(`/auth/favorites/${propertyId}`);
    if (res.data && res.data.success) return res.data;
  } catch {}
  return { success: true, isFallback: true };
};

export default api;
