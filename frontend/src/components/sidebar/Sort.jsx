import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '../../contexts';

const Sort = () => {
    const { isSidebarOpen } = useSidebar();
    
    const { t } = useTranslation();

    return (
        <div className={`${isSidebarOpen ? 'flex' : 'hidden'} flex-col gap-y-2`}>

            <h1 className='text-gray-600 text-lg font-bold px-4'>{t('sort_by')}</h1>

            <div className='flex flex-col'>

            <Link to='/'  className='w-[300px] dark:text-white text-sm  text-left px-4 py-2 block cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700'>
                
                {t('new')}
            
            </Link>

            <Link to='/' className='w-[300px] dark:text-white text-sm  text-left px-4 py-2 block cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700'>
                
                {t('popular')}
            
            </Link>
            
            </div>

        </div>
    );
};


export default Sort;