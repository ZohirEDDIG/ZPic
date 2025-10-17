import { useContext } from 'react';

import HomeContext from './HomeContext';

const useHome = () => {
    const context = useContext(HomeContext);
    if (!context) throw new Error ('useHome must be used with in a HomeProvider');
    return context;
}

export default useHome;