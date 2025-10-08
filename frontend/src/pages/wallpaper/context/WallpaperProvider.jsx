import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getWallpaper, getSimilarWallpapers } from '../api/wallpaper';
import { getCategoryTags } from '../api/tag';

import WallpaperContext from './WallpaperContext';

const WallpaperProvider = ({ children }) => {
    const [wallpaperId, setWallpaperId] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    const getWallpaperQuery = useQuery({ queryKey: ['wallpaper', wallpaperId], queryFn: () => getWallpaper(wallpaperId), enabled: !!wallpaperId });
    
    const getCategoryTagsQuery = useQuery({ queryKey: ['category-tags', categoryId], queryFn: () => getCategoryTags(categoryId), enabled: !!wallpaperId }); 
    
    const getSimilarWallpapersMutation = useMutation({ mutationFn: getSimilarWallpapers });
    
    
    useEffect(() => {
        if (getWallpaperQuery.isSuccess) {
            setCategoryId(getWallpaperQuery.data.data.wallpaper.category._id);
            const tags = getWallpaperQuery.data.data.wallpaper.tags.map((tag) => tag._id);
            getSimilarWallpapersMutation.mutate(tags);
        }

        if (getWallpaperQuery.isError) {
            console.log(getWallpaperQuery.error.response.status, typeof getWallpaperQuery.error.response.status);
        }
    }, [getWallpaperQuery.isSuccess, getWallpaperQuery.isError]);


    const value = {
        wallpaperId,
        setWallpaperId,
        getWallpaperQuery,
        getCategoryTagsQuery,
        getSimilarWallpapersMutation
    };

    return (
        <WallpaperContext.Provider value={value}>
            {children}
        </WallpaperContext.Provider>
    );
};

export default WallpaperProvider;
