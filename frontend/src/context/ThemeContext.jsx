import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      console.log('Found saved theme:', saved);
      return saved === 'dark';
    }
    // Check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('System prefers dark:', systemPrefersDark);
    return systemPrefersDark;
  });

  useEffect(() => {
    console.log('Theme changed to:', isDark ? 'dark' : 'light');
    // Update localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update document class
    if (isDark) {
      document.documentElement.classList.add('dark');
      console.log('Added dark class to document');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class from document');
    }
  }, [isDark]);

  const toggleTheme = () => {
    console.log('toggleTheme called, current isDark:', isDark);
    setIsDark(!isDark);
  };

  console.log('ThemeProvider rendered, isDark:', isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 