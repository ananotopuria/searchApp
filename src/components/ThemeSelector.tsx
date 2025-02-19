import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeSelector: React.FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeSelector must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = context;

  return (
    <div className="mb-4">
      <span>Theme: {theme}</span>
      <button
        className="ml-2 px-4 py-2 bg-gray-300 rounded"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeSelector;
