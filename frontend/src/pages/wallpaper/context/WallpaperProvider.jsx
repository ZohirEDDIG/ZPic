import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getWallpaper, getSimilarWallpapers, likeWallpaper, bookmarkWallpaper } from '../api/wallpaper';
import { getCategoryTags } from '../api/tag';

import { useAuth } from '../../../contexts';

import WallpaperContext from './WallpaperContext';
import toast from 'react-hot-toast';

const WallpaperProvider = ({ children }) => {
    const { token, getCurrentUserQuery } = useAuth()

    const [wallpaperId, setWallpaperId] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    const getWallpaperQuery = useQuery({ queryKey: ['wallpaper', wallpaperId], queryFn: () => getWallpaper(wallpaperId), enabled: !!wallpaperId });
    
    const getCategoryTagsQuery = useQuery({ queryKey: ['category-tags', categoryId], queryFn: () => getCategoryTags(categoryId), enabled: !!wallpaperId }); 
    
    const getSimilarWallpapersMutation = useMutation({ mutationFn: getSimilarWallpapers });

    const likeWallpaperMutation = useMutation({ mutationFn: likeWallpaper });

    const bookmarkWallpaperMutation = useMutation({ mutationFn:  bookmarkWallpaper });
    
    const handleLikeWallpaper = () => {
        likeWallpaperMutation.mutate({ wallpaperId, token });

    };

    const handleBookmarkWallpaper = () => {
        bookmarkWallpaperMutation.mutate({ wallpaperId, token })
    };
    
    
    useEffect(() => {
        if (getWallpaperQuery.isSuccess) {
            setCategoryId(getWallpaperQuery.data.data.wallpaper.category._id);
            const tags = getWallpaperQuery.data.data.wallpaper.tags.map((tag) => tag._id);
            getSimilarWallpapersMutation.mutate(tags);
        }
    }, [getWallpaperQuery.isSuccess, getWallpaperQuery.isError]);

    useEffect(() => {
        if (likeWallpaperMutation.isSuccess) {
            toast.success(likeWallpaperMutation.data.data.message);
            getCurrentUserQuery.refetch();
        }

        if (likeWallpaperMutation.isError) {
            toast.error(likeWallpaperMutation.error?.response?.data?.error)
        }
    }, [likeWallpaperMutation.isSuccess, likeWallpaperMutation.isError]);

    useEffect(() => {
        if (bookmarkWallpaperMutation.isSuccess) {
            toast.success(bookmarkWallpaperMutation.data.data.message);
            getCurrentUserQuery.refetch();
        }

        if (bookmarkWallpaperMutation.isError) {
            toast.error(bookmarkWallpaperMutation.error?.response?.data?.error)
        }

    }, [bookmarkWallpaperMutation.isSuccess, bookmarkWallpaperMutation.isError]);

    const handleDownload = async () => {
        try {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = getWallpaperQuery?.data?.data.wallpaper.wallpaper;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg');
                link.download = getWallpaperQuery?.data?.data?.wallpaper?.name;
                link.click();

            };
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    const handleShare = async () => {
        navigator.clipboard.writeText(window.location.href)
        .then(() => {
            toast.success('URL copied!');
        })
        .catch(err => {
            toast.error('Failed to copy:', err);
        });
    };

    const value = {
        wallpaperId,
        setWallpaperId,
        getWallpaperQuery,
        getCategoryTagsQuery,
        getSimilarWallpapersMutation,
        handleDownload,
        handleBookmarkWallpaper,
        handleLikeWallpaper,
        handleShare,
    };

    return (
        <WallpaperContext.Provider value={value}>
            {children}
        </WallpaperContext.Provider>
    );
};

export default WallpaperProvider;