import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('apex_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('apex_user', JSON.stringify(user));
      if (user.token) {
        localStorage.setItem('apex_token', user.token);
      }
    } else {
      localStorage.removeItem('apex_user');
      localStorage.removeItem('apex_token');
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
          localStorage.setItem('apex_token', userData.token);
        }
        return userData;
      }
      throw new Error(res.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, company) => {
    setLoading(true);
    try {
      let userData;
      if (typeof name === 'object' && name !== null) {
        userData = name;
      } else {
        userData = { name, email, password, company };
      }

      const res = await authService.register(userData);
      const registeredData = res.data || res.user || res;
      if (registeredData && (registeredData._id || registeredData.token)) {
        setUser(registeredData);
        if (registeredData.token) {
          localStorage.setItem('apex_token', registeredData.token);
        }
        return registeredData;
      }
      throw new Error(res.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('apex_user');
    localStorage.removeItem('apex_token');
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isAuthenticated,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
