import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeSelector = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2  text-black dark:text-white rounded text-[2rem]"
    >
      {theme === 'light' ? '🌃' : '🌅'}
    </button>
  );
};

export default ThemeSelector;