import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeSelector = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default ThemeSelector;