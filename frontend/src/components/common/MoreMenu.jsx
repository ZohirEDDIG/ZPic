import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThreeDots } from '../../icons';
import { useClickOutside } from '../../hooks';
import { useSidebar } from '../../contexts';

const MoreMenu = ({ parent }) => {
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const moreMenuRef = useRef(null);
    const moreMenuButtonRef = useRef(null);

    const handleToggleMoreMenu = () => {
    setIsMoreMenuOpen((prev) => !prev);
    };

    useClickOutside(moreMenuRef, moreMenuButtonRef, setIsMoreMenuOpen);

    const handleCloseMoreMenu = ()  => {
        setIsMoreMenuOpen(false);
    };

    
    const { isSidebarOpen } = useSidebar();

    const { t, i18n } = useTranslation();  

    return (
        parent === 'header' 

        ?   <div className='hidden lg:block relative'>

                <button ref={moreMenuButtonRef} type='button' onClick={handleToggleMoreMenu} className='dark:text-gray-600 text-xl  cursor-pointer select-none flex'>
                    
                    <ThreeDots />
                    
                </button>
                
                <ul ref={moreMenuRef} className={`bg-white dark:bg-gray-900 w-[200px] py-4 border-1 border-gray-600 dark:border-none rounded-md shadow-md flex flex-col gap-y-2  ${isMoreMenuOpen ? 'flex' : 'hidden'} absolute top-[50px] right-0 z-10`}>

                    <li>
                        
                        <Link to={`/${i18n.language}/about`} onClick={handleCloseMoreMenu} className='dark:text-white text-sm text-left  w-full px-4 py-1 block select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700'>{t('about')}</Link>
                        
                    </li>

                    <li>
                        
                        <Link to={`/${i18n.language}/contact-us`} onClick={handleCloseMoreMenu} className='dark:text-white text-sm text-left w-full px-4 py-1 block select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700'>{t('contact_us')}</Link>
                        
                    </li>

                    <li>
                        <Link to={`/${i18n.language}/popular-searches`} onClick={handleCloseMoreMenu} className='dark:text-white text-sm text-left w-full px-4 py-1 block select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700'>{t('popular_searches')}</Link>
                        
                    </li>

                </ul>

            </div>

        :   parent === 'sidebar'

        ?   <div className={`flex-col  ${isSidebarOpen ? 'flex lg:hidden' : 'hidden'}`}>

                <Link to='/about' className='dark:text-white text-sm w-[300px] text-left px-4 py-2 block select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700'>{t('about')}</Link>

                <Link to='/contact-us' className='dark:text-white text-sm w-[300px] text-left px-4 py-2 block select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700'>{t('contact_us')}</Link>

                <Link to='/popular-searches' className='dark:text-white text-sm w-[300px] text-left px-4 py-2 block select-none  transition-[background-color] duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700'>{t('popular_searches')}</Link>

            </div>

        : null
    );
};

export default MoreMenu;