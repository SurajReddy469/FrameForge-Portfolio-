import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext(null);

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCompare = (property) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p._id === property._id);
      if (exists) {
        return prev.filter((p) => p._id !== property._id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 properties side by side.');
        return prev;
      }
      return [...prev, property];
    });
  };

  const removeCompare = (propertyId) => {
    setCompareList((prev) => prev.filter((p) => p._id !== propertyId));
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsModalOpen(false);
  };

  const value = {
    compareList,
    toggleCompare,
    removeCompare,
    clearCompare,
    isModalOpen,
    setIsModalOpen,
    isComparing: (id) => compareList.some((p) => p._id === id)
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within a CompareProvider');
  return ctx;
};
