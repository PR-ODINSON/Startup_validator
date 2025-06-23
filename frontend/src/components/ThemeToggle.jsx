import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  console.log('ThemeToggle component rendering...');
  
  try {
    const { isDark, toggleTheme } = useTheme();
    console.log('Theme context values:', { isDark, toggleTheme: typeof toggleTheme });

    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Theme toggle clicked! Current theme:', isDark ? 'dark' : 'light');
      if (toggleTheme) {
        toggleTheme();
      } else {
        console.error('toggleTheme is not a function');
      }
    };

    return (
      <button
        onClick={handleClick}
        className="relative p-2 rounded-xl transition-all duration-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 cursor-pointer z-50"
        aria-label="Toggle theme"
        style={{ minWidth: '40px', minHeight: '40px' }}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {isDark ? (
            <Moon className="w-5 h-5 text-blue-400" />
          ) : (
            <Sun className="w-5 h-5 text-orange-500" />
          )}
        </div>
      </button>
    );
  } catch (error) {
    console.error('Error in ThemeToggle:', error);
    return (
      <button
        onClick={() => console.log('Fallback button clicked')}
        className="p-2 bg-red-500 text-white rounded-xl"
      >
        Error
      </button>
    );
  }
};

export default ThemeToggle; 