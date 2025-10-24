import { useContext } from 'react';
import CategoryWallpapersContext from './CategoryWallpapersContext';

const useCategoryWallpapers = () => {
    const context = useContext(CategoryWallpapersContext);
    if (!context) throw new Error('useCategoryWallpapers must be used within an CategoryWallpapersProvider');
    return context;
};

export default useCategoryWallpapers;