import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getSearchWallpapers } from '../apis/wallpapers';
import SearchContext from './SearchContext';

const SearchProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20;

    const { query } = useParams();

    const getSearchWallpapersQuery = useQuery({
        queryKey: ['search', query],
        queryFn: () => getSearchWallpapers(query, currentPage, limit),
        enabled: !!query,
        keepPreviousData: true,
    });

    const totalPages = getSearchWallpapersQuery?.data?.data?.totalPages || 1;

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
    }, [query]);

    useEffect(() => {
        if (getSearchWallpapersQuery.isSuccess) {
            console.log(getSearchWallpapersQuery.data.data);
        }

        // if ()
    }, [getSearchWallpapersQuery.isSuccess])

    const value = {
        currentPage,
        totalPages,
        handleFirstPage,
        handleNextPage,
        handlePrevPage,
        getSearchWallpapersQuery,
    };;

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;