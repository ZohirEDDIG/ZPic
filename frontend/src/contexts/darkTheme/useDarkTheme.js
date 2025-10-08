import { useContext } from 'react';
import DarkThemeContext from './DarkThemeContext';

const useDarkTheme = () => {
    const context = useContext(DarkThemeContext);
    if (!context) {
        throw new Error('useDarkTheme must be used within a DarkThemeProvider');
    }
  return context;
};

export default useDarkTheme;