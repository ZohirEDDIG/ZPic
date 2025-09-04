import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useWindowWidth } from '../hooks/index';

type SidebarContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  handleToggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const windowWidth = useWindowWidth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(windowWidth >= 1024 ? true : false);

    const handleToggleSidebar  = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const values: SidebarContextType = {
        isSidebarOpen, setIsSidebarOpen, handleToggleSidebar
    }

    return (
        <SidebarContext.Provider value={values}>
            {children}
        </SidebarContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error('useSidebar must be used within a SidebarProvider');
    return context;
};
