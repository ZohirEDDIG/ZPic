import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCategoryWallpapers } from '../apis/wallpapers';

import CategoryWallpapersContext from './CategoryWallpapersContext';

import { capitalize } from '../../../utils';
import { getCategoryTags } from '../apis/tags';

const CategoryWallpapesrProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    const { category } = useParams();
    const capitalizedCategory = capitalize(category);

    const getCategoryTagsQuery = useQuery({
        queryKey: ['categoryTags', capitalizedCategory],
        queryFn: () => getCategoryTags(capitalizedCategory),
        enabled: !!category,
    });

    const getCategoryWallpapersQuery = useQuery({
        queryKey: ['categoryWallpapers', capitalizedCategory, currentPage],
        queryFn: () => getCategoryWallpapers(capitalizedCategory, currentPage, limit),
        enabled: !!category,
        keepPreviousData: true,
    });

    const totalPages = getCategoryWallpapersQuery?.data?.data?.totalPages || 1;

    const handleFirstPage = () => {
        if (currentPage !== 1) setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [category]);

    const value = {
        currentPage,
        totalPages,
        handleFirstPage,
        handleNextPage,
        handlePrevPage,
        getCategoryTagsQuery,
        getCategoryWallpapersQuery,
    };;

    return (
        <CategoryWallpapersContext.Provider value={value}>
            {children}
        </CategoryWallpapersContext.Provider>
    );
};

export default CategoryWallpapesrProvider;