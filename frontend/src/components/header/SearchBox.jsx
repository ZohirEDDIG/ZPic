import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from '../../icons';

const SearchBox = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchValueChange = (e)  => {
        setSearchValue(e.currentTarget.value);
    };

    const handleSearch = () => {
        if (!searchValue.trim()) {
            return;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const { t } = useTranslation();

    return (
        <div className='dark:bg-gray-900 w-[200px] sm:w-[300px] py-1 sm:px-2 px-4 border-1 border-gray-600 dark:border-transparent rounded-md flex items-center gap-x-1 sm:gap-x-4'>
        
            <button type='button' onClick={handleSearch} className='text-gray-600 hree block cursor-pointer select-none'>
                
                <Search />
                
            </button>

            <span className='text-gray-600 text-lg sm:text-xl block select-none'>|</span>

            <input type='text' name='search' value={searchValue} onChange={(e) => handleSearchValueChange(e)}  onKeyDown={handleKeyDown} placeholder={t('search_wallpapers')} className='dark:text-white text-xs sm:text-sm w-full block focus:outline-none placeholder:text-gray-600' />
        
        </div>
    );
};

export default SearchBox;