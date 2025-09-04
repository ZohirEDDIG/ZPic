import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThreeDots } from '../../icons';
import { useClickOutside } from '../../hooks';
import { useSidebar } from '../../contexts';

const MoreMenu = ({ parent }: { parent: string }) => {
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);
    const moreMenuRef = useRef<HTMLUListElement>(null);
    const moreMenuButtonRef = useRef<HTMLButtonElement>(null);

    const handleToggleMoreMenu = () : void => {
    setIsMoreMenuOpen((prev) => !prev);
    };

    useClickOutside(moreMenuRef, moreMenuButtonRef, setIsMoreMenuOpen);

    const handleCloseMoreMenu = () : void => {
        setIsMoreMenuOpen(false);
    };

    const { t, i18n } = useTranslation();

    const { isSidebarOpen } = useSidebar();

    return (
        parent === 'header' 

        ?   <div className='hidden lg:block relative'>

                <button ref={moreMenuButtonRef} type='button' onClick={handleToggleMoreMenu} className='dark:text-dark-three text-xl flex cursor-pointer select-none'><ThreeDots /></button>
                
                <ul ref={moreMenuRef} className={`bg-white dark:bg-dark-one w-[200px] py-4 border-1 border-dark-three dark:border-none rounded-md shadow-md flex flex-col gap-y-2  ${isMoreMenuOpen ? 'flex' : 'hidden'} absolute top-[50px] right-0 z-10`}>

                    <li><Link to={`/${i18n.language}/about`} onClick={handleCloseMoreMenu} className='dark:text-white text-sm text-left w-full px-4 py-1 block cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-light-two dark:hover:bg-dark-five'>{t('about')}</Link></li>

                    <li><Link to={`/${i18n.language}/contact-us`} onClick={handleCloseMoreMenu} className='dark:text-white text-sm text-left w-full px-4 py-1 block cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-light-two dark:hover:bg-dark-five'>{t('contact_us')}</Link></li>

                    <li><Link to={`/${i18n.language}/popular-searches`} onClick={handleCloseMoreMenu} className='dark:text-white text-sm text-left w-full px-4 py-1 block cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-light-two dark:hover:bg-dark-five'>{t('popular_searches')}</Link></li>

                </ul>

            </div>

        :   <div className={`flex-col  ${isSidebarOpen ? 'flex lg:hidden' : 'hidden'}`}>

                <Link to='/about' className='dark:text-white text-sm w-[300px]  text-left px-4 py-2 block cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-[#f5f5f5] dark:hover:bg-[#444444]'>{t('about')}</Link>

                <Link to='/contact-us' className='dark:text-white text-sm w-[300px]  text-left px-4 py-2 block cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-light-two dark:hover:bg-dark-five'>{t('contact_us')}</Link>

                <Link to='/popular-searches' className='dark:text-white text-sm w-[300px]  text-left px-4 py-2 block cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-light-two dark:hover:bg-dark-five'>{t('popular_searches')}</Link>

            </div>
    );
};

export default MoreMenu;