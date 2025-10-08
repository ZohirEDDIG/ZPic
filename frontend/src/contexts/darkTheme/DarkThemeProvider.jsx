import { useEffect, useState } from 'react';
import DarkThemeContext from './DarkThemeContext';

const DarkThemeProvider = ({ children }) => {

    const [isDarkTheme, setIsDarkTheme] = useState(JSON.parse(localStorage.getItem('isDarkTheme')));
    
    const handleChangeTheme = () => {
        setIsDarkTheme((prev) => !prev);
    };
    
    useEffect(() => {
        if (isDarkTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('isDarkTheme', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('isDarkTheme', 'false');
        }
    }, [isDarkTheme]);

    const value = {
        isDarkTheme,
        handleChangeTheme, 
    };

    return (
        <DarkThemeContext.Provider value={value}>
            {children}
        </DarkThemeContext.Provider>
    );
};


export default DarkThemeProvider;