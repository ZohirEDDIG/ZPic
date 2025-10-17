import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCategories } from '../apis/categories';
import { getWallpapers } from '../apis/wallpapers';

import HomeContext from './HomeContext';

const HomeProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    const getWallpapersQuery = useQuery({ queryKey: ['wallpapers', currentPage], queryFn: () => getWallpapers(currentPage, limit), keepPreviousData: true });

    const totalPages = getWallpapersQuery?.data?.data?.totalPages;

    const handleFirstPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };


    const getCategoriesQuery = useQuery({ queryKey: ['categories'], queryFn: getCategories });
    
    const value = {
        currentPage,
        totalPages,
        handleFirstPage,
        handleNextPage,
        handlePrevPage,
        getCategoriesQuery,
        getWallpapersQuery
    };

    return (
        <HomeContext.Provider value={value}>
            {children}
        </HomeContext.Provider>
    );
};

export default HomeProvider;