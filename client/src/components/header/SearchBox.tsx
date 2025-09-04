import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from '../../icons';

const SearchBox = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        setSearchValue(e.currentTarget.value);
    };

    const handleSearch = () : void => {
        if(!searchValue.trim()) return;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) : void => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const { t } = useTranslation();

    return (
        <div className='dark:bg-dark-two w-[200px] sm:w-[300px]  py-1 sm:px-2 px-4  border-1 border-dark-three dark:border-transparent rounded-md flex items-center gap-x-1 sm:gap-x-4'>
        
            <button type='button' onClick={handleSearch} className='text-dark-three block cursor-pointer select-none'><Search /></button>

            <span className='text-dark-three text-lg sm:text-xl block select-none'>|</span>

            <input type='text' name='search' value={searchValue} onChange={(e) => handleSearchValueChange(e)} onKeyDown={handleKeyDown} placeholder={t('search_wallpapers')} className='text-white text-xs sm:text-sm w-full block focus:outline-none placeholder:text-dark-three' />
        
        </div>
    );
};

export default SearchBox;


// sm:w-[200px] md:w-[400px]  max-[400px]:max-w-[200px] max-w-[400px]