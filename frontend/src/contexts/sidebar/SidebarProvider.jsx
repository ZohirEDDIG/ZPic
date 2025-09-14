import { useState } from 'react';
import SidebarContext from './SidebarContext';
import { useWindowWidth } from '../../hooks';

 const SidebarProvider = ({ children }) => {
    const windowWidth = useWindowWidth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(windowWidth >= 1024 ? true : false);

    const handleToggleSidebar  = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const values = {
        isSidebarOpen, setIsSidebarOpen, handleToggleSidebar
    }

    return (
        <SidebarContext.Provider value={values}>
            {children}
        </SidebarContext.Provider>
    );
};


export default SidebarProvider;