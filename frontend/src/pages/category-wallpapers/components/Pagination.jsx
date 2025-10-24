import { useTranslation } from 'react-i18next';

import { AngleRight, AngleLeft } from '@/icons';

import useCategoryWallpapers from '../context/useCategoryWallpapers';


const Pagination = () => {
    const { currentPage, totalPages, handleFirstPage, handleNextPage, handlePrevPage } = useCategoryWallpapers();

    const { t } = useTranslation();

    return (
        <div className='mt-6 flex justify-center sm:justify-between items-center'>

            <span className='hidden sm:block'></span>

            <button type='button' disabled={currentPage===totalPages} onClick={handleNextPage} className={`dark:bg-gray-900 dark:text-white px-4 py-2 border border-gray-600 dakr:border-none rounded-md ${currentPage===totalPages && 'opacity-60 pointer-events-none'}  hidden sm:flex gap-x-2 items-center transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-black dark:hover:bg-gold dark:hover:text-white`}>
                
                {t('Next page')} 
                
                <AngleRight />
            
            </button>

            <div className='flex items-center gap-x-2 '>

                <button type='button' disabled={currentPage===1} onClick={handleFirstPage} className={`dark:bg-gray-900 dark:text-white p-2 border border-gray-600 dakr:border-none rounded-md flex ${currentPage===1 && 'opacity-60 pointer-events-none'}  hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300 ease-in-out`}>
                    
                    <AngleLeft />
                    
                    <AngleLeft className='-ml-2' />
                
                </button>
                
                <button type='button' disabled={currentPage===1} onClick={handlePrevPage} className={`dark:bg-gray-900 dark:text-white p-2 border border-gray-600 dakr:border-none rounded-md ${currentPage===1 && 'opacity-60  pointer-events-none'}  transition-colors duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-600`}>
                    
                    <AngleLeft />
                
                </button>

                <span className='bg-transparent dark:text-white text-xs py-2 px-3 border border-gray-600 rounded-md'>{currentPage}</span>

                <button type='button' disabled={currentPage===totalPages} onClick={handleNextPage} className={`dark:bg-gray-900 dark:text-white p-2 border border-gray-600 dakr:border-none rounded-md ${currentPage===totalPages && 'opacity-60 pointer-events-none'} select-none  transition-colors duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-600`}>
                   
                    <AngleRight />
                
                </button>

                <span className='text-gray-600 select-none'>|</span>

                <span className='text-gray-600'>{totalPages}</span>

            </div>
            
        </div>
    );
};

export default Pagination;