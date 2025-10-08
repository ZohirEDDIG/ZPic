import { useState } from 'react';
import WallpapersContext from './WallpapersContext';
import { useQuery } from '@tanstack/react-query';
import { getWallpapers } from '../../api/wallpaper';

const WallpapersProvider = ({ children }) => {
    const [wallpaper, setWallpaper] = useState(null);

    const getWallpapersQuery = useQuery({ queryKey: ['all-wallpapers'], queryFn: () => getWallpapers() });

    const value = {
        wallpaper, setWallpaper,
        getWallpapersQuery
    };

    return (
        <WallpapersContext.Provider value={value}>
            {children}
        </WallpapersContext.Provider>
    );
};

export default WallpapersProvider;
