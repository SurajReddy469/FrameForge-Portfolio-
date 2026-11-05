const API_BASE = import.meta.env.VITE_API_URL || '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('medicare_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const authApi = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  me: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch user');
    return data.user;
  },
};

export const departmentApi = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/departments`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch departments');
    return data.data;
  },

  getByCode: async (code) => {
    const res = await fetch(`${API_BASE}/departments/${code}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch department');
    return data.data;
  },
};

export const doctorApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.department) query.append('department', params.department);
    if (params.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/doctors?${query.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch doctors');
    return data.data;
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE}/doctors/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch doctor');
    return data.data;
  },

  getAvailability: async (id, date) => {
    const res = await fetch(`${API_BASE}/doctors/${id}/availability?date=${date}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch availability');
    return data.data;
  },
};

export const appointmentApi = {
  book: async (appointmentData) => {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(appointmentData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to schedule appointment');
    return data.data;
  },

  getMy: async () => {
    const res = await fetch(`${API_BASE}/appointments/my`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch appointments');
    return data.data;
  },

  getByCode: async (code) => {
    const res = await fetch(`${API_BASE}/appointments/code/${code}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Appointment not found');
    return data.data;
  },

  getAll: async (filters = {}) => {
    const query = new URLSearchParams();
    if (filters.status && filters.status !== 'All') query.append('status', filters.status);
    if (filters.search) query.append('search', filters.search);
    if (filters.date) query.append('date', filters.date);

    const res = await fetch(`${API_BASE}/appointments?${query.toString()}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch clinic roster');
    return data.data;
  },

  updateStatus: async (id, status, cancellationReason = '') => {
    const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, cancellationReason }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update status');
    return data.data;
  },

  cancel: async (id, reason = '') => {
    const res = await fetch(`${API_BASE}/appointments/${id}/cancel`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to cancel appointment');
    return data.data;
  },

  downloadCSV: async () => {
    const token = localStorage.getItem('medicare_token');
    const res = await fetch(`${API_BASE}/appointments/export/csv`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error('Failed to download appointments CSV');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medicare_appointments_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  },
};
