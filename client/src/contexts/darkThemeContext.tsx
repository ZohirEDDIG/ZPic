import { createContext, useState, useEffect, useContext,  } from 'react';
import type { ReactNode} from 'react'


type DarkThemeContextType = {
  isDarkTheme: boolean;
  handleChangeTheme: () => void;
};

const DarkThemeContext = createContext<DarkThemeContextType | null>(null);

export const DarkThemeProvider = ({ children }: { children: ReactNode }) => {

    const isDarkThemeInitialValue : boolean = localStorage.getItem('isDarkTheme') !== null ? JSON.parse(localStorage.getItem('isDarkTheme') as string) : false;
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(isDarkThemeInitialValue);
    
    const handleChangeTheme = () : void => {
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

    const value: DarkThemeContextType = {
        isDarkTheme,
        handleChangeTheme, 
    };

    return (
        <DarkThemeContext.Provider value={value}>
            {children}
        </DarkThemeContext.Provider>
    );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useDarkTheme = () => { 
  const context = useContext(DarkThemeContext);
  if (!context) throw new Error('useDarkTheme must be used within a DarkThemeProvider');
  return context;
};