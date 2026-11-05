import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('urbannest_user');
    let useLocalFavorites = !saved;
    if (saved) {
      try {
        const restoredUser = JSON.parse(saved);
        useLocalFavorites = Boolean(restoredUser.isDemoMode);
        setUser(restoredUser);
        if (!restoredUser.isDemoMode && restoredUser.token) {
          authService.me().then((res) => {
            if (res.data) setFavorites((res.data.favorites || []).map((item) => typeof item === 'string' ? item : item._id));
          }).catch(() => {
            setUser(null);
            localStorage.removeItem('urbannest_user');
          });
        }
      } catch (e) {
        localStorage.removeItem('urbannest_user');
      }
    }
    const savedFavs = localStorage.getItem('urbannest_favs');
    if (useLocalFavorites) {
      try {
        const parsedFavs = savedFavs ? JSON.parse(savedFavs) : [];
        setFavorites(Array.isArray(parsedFavs) ? parsedFavs : []);
      } catch (e) {
        setFavorites([]);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.success && res.data) {
      setUser(res.data);
      setFavorites((res.data.favorites || []).map((item) => typeof item === 'string' ? item : item._id));
      localStorage.setItem('urbannest_user', JSON.stringify(res.data));
      return res.data;
    }
    throw new Error('Authentication failed');
  };

  const register = async (name, email, password) => {
    const res = await authService.register({ name, email, password });
    if (res.success && res.data) {
      setUser(res.data);
      setFavorites([]);
      localStorage.setItem('urbannest_user', JSON.stringify(res.data));
      return res.data;
    }
    throw new Error('Registration failed');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('urbannest_user');
    setFavorites([]);
  };

  const toggleFavorite = async (propertyId) => {
    const previous = favorites;
    const next = previous.includes(propertyId)
        ? previous.filter((id) => id !== propertyId)
        : [...previous, propertyId];
    setFavorites(next);
    localStorage.setItem('urbannest_favs', JSON.stringify(next));
    if (user && !user.isDemoMode) {
      try {
        const result = await authService.toggleFavorite(propertyId);
        setFavorites((result.favorites || []).map((item) => typeof item === 'string' ? item : item._id));
      } catch (error) {
        setFavorites(previous);
        localStorage.setItem('urbannest_favs', JSON.stringify(previous));
        throw error;
      }
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin',
    favorites,
    toggleFavorite
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider');
  return ctx;
};
