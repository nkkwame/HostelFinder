import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <LightModeIcon className="text-yellow-500 hover:text-yellow-400" />
      ) : (
        <DarkModeIcon className="text-gray-600 hover:text-gray-800" />
      )}
    </button>
  );
};

export default ThemeToggle;
