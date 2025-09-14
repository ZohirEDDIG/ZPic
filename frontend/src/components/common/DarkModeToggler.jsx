import { useTranslation } from 'react-i18next';
import { Moon } from '../../icons';
import { useDarkTheme, useSidebar } from '../../contexts';

const DarkModeToggler = ({ parent }) => {
    const { isDarkTheme, handleChangeTheme } = useDarkTheme();
    
    const { isSidebarOpen } = useSidebar();
    
    const { t } = useTranslation();

    return (
        parent  === 'header'

        ?   <div className='hidden lg:flex items-center gap-x-2'>

                <span className='dark:text-gray-600 text-sm block'>
                  
                  <Moon />
                  
                </span>

                <span className='dark:text-gray-600 text-sm'>{t('dark_theme')}</span>

                <button type='button' onClick={handleChangeTheme} className='bg-gray-200 dark:bg-gray-700 w-10 h-3 block rounded-full relative cursor-pointer select-none'>

                  <span className={`block w-5 h-5 bg-transparent border-5 border-gray-600 dark:border-white rounded-full absolute ${isDarkTheme ? 'left-[calc(100%-20px)]' : '-left-1'} top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out`}></span>
                
                </button>
                
            </div>
        
        :   parent === 'sidebar'

        ?   <div className={`w-[300px] px-4 ${isSidebarOpen ? 'flex lg:hidden' : 'hidden'} justify-between items-center gap-x-2`}>

                <span className='dark:text-gray-600 text-sm'>{t('dark_theme')}</span>

                <button type='button' onClick={handleChangeTheme} className='bg-gray-200 dark:bg-gray-700 w-10 h-3 block rounded-full relative cursor-pointer select-none'>

                  <span className={`block w-5 h-5 bg-transparent border-5 border-gray-600 dark:border-white rounded-full  absolute ${isDarkTheme ? 'left-[calc(100%-20px)]' : '-left-1'} top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out`}></span>
                
                </button>
                
            </div>
          
        :   null

    );
};

export default DarkModeToggler;