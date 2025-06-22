import React, { createContext, useContext, useState } from 'react';

// Coming Soon Modal Context
const ComingSoonContext = createContext();

export const useComingSoon = () => {
  const context = useContext(ComingSoonContext);
  if (!context) {
    throw new Error('useComingSoon must be used within a ComingSoonProvider');
  }
  return context;
};

export const ComingSoonProvider = ({ children }) => {
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const openComingSoonModal = () => setIsComingSoonModalOpen(true);
  const closeComingSoonModal = () => setIsComingSoonModalOpen(false);

  // Function to handle page navigation
  const navigateToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <ComingSoonContext.Provider value={{ 
      openComingSoonModal, 
      closeComingSoonModal, 
      isComingSoonModalOpen,
      navigateToPage,
      currentPage
    }}>
      {children}
    </ComingSoonContext.Provider>
  );
}; 