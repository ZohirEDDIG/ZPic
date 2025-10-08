import { useContext } from 'react';
import WallpapersContext from './WallpapersContext';

const useWallpapers = () => {
    const context = useContext(WallpapersContext);
    if (!context)
        throw new Error('useWallpapers must be used within an WallpapersProvider');
    return context;
};

export default useWallpapers;
