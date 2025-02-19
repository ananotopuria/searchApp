import { createContext } from 'react';

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// ✅ Provides a default value to prevent 'undefined' errors
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});
