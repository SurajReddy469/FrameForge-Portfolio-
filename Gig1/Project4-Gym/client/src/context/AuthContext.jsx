import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fitpulse_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('fitpulse_user', JSON.stringify(user));
      if (user.token) {
        localStorage.setItem('fitpulse_token', user.token);
      }
    } else {
      localStorage.removeItem('fitpulse_user');
      localStorage.removeItem('fitpulse_token');
    }
  }, [user]);

  const login = async (arg1, arg2) => {
    setLoading(true);
    try {
      let credentials;
      if (typeof arg1 === 'object' && arg1 !== null) {
        credentials = arg1;
      } else {
        credentials = { email: arg1, password: arg2 };
      }

      const res = await authService.login(credentials);
      const userData = res.data || res.user || res;
      if (userData && (userData._id || userData.token || userData.email)) {
        setUser(userData);
        if (userData.token) {
          localStorage.setItem('fitpulse_token', userData.token);
        }
        return userData;
      }
      throw new Error(res.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, phone) => {
    setLoading(true);
    try {
      let userData;
      if (typeof name === 'object' && name !== null) {
        userData = name;
      } else {
        userData = { name, email, password, phone };
      }

      const res = await authService.register(userData);
      const registeredData = res.data || res.user || res;
      if (registeredData && (registeredData._id || registeredData.token)) {
        setUser(registeredData);
        if (registeredData.token) {
          localStorage.setItem('fitpulse_token', registeredData.token);
        }
        return registeredData;
      }
      throw new Error(res.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const deductCredit = () => {
    if (user && user.membershipTier !== 'Elite' && user.classCredits > 0) {
      setUser((prev) => ({
        ...prev,
        classCredits: prev.classCredits - 1
      }));
    }
  };

  const refundCredit = () => {
    if (user && user.membershipTier !== 'Elite') {
      setUser((prev) => ({
        ...prev,
        classCredits: (prev.classCredits || 0) + 1
      }));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitpulse_user');
    localStorage.removeItem('fitpulse_token');
  };

  const isAdmin = user?.role === 'admin';
  const isTrainer = user?.role === 'trainer';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isTrainer,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        deductCredit,
        refundCredit
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
