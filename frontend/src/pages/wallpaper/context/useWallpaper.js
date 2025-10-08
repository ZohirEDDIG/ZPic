import { useContext } from 'react';
import WallpaperContext from './WallpaperContext';

const useWallpaper = () => {
    const context = useContext(WallpaperContext);
    if (!context) throw new Error('useWallpaper must be used within an WallpaperProvider');
    return context;
};

export default useWallpaper;