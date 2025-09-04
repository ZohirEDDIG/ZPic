import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TriangleDown, Language, AngleDown } from '../../icons';
import { useClickOutside,useWindowWidth } from '../../hooks';
import { useSidebar } from '../../contexts';

const LanguageChanger = ({ parent }: { parent: string }) => {
    // Header Logic
    const [islanguagesMenuOpen, setIsLanguagesMenuOpen] = useState<boolean>(false);
    const languagesMenuRef = useRef<HTMLUListElement>(null);
    const languagesMenuButtonRef = useRef<HTMLButtonElement>(null);

  
    const handleToggleLanguagesMenu = () : void => {
        setIsLanguagesMenuOpen((prev) => !prev);
    };

    useClickOutside(languagesMenuRef, languagesMenuButtonRef, setIsLanguagesMenuOpen);

    const { i18n } = useTranslation();


    // Sidebar Logic
    const { isSidebarOpen } = useSidebar();

    const [extandLanguagesMenu, setExtendLanguagesMenu] = useState<boolean>(false);

    const handleToggleExtandLanguagesMenu = () : void => {
        setExtendLanguagesMenu((prev) => !prev);
    };

    useEffect(() => {
        if (isSidebarOpen && parent === 'sidebar') setExtendLanguagesMenu(false);
    }, [isSidebarOpen, parent]);

    const windowWidth = useWindowWidth();

    useEffect(() => {
        if(windowWidth >= 1024) setExtendLanguagesMenu(false);
    }, [windowWidth]);

    // Change Language Logic 
    const navigate = useNavigate();
    const location = useLocation();  

    const handleChangeLanguage = (language: string) : void => {
        i18n.changeLanguage(language);
        localStorage.setItem('i18nextLng', i18n.language);
        const newPath = location.pathname.replace(/^\/(en|fr)/, `/${language}`)
        navigate(newPath, { replace: true });

        if (parent === 'header') setIsLanguagesMenuOpen(false);
    };

    return (
        parent === 'header' 
        
        ?   <div className='hidden lg:block relative'>
                
                <button ref={languagesMenuButtonRef} type='button' onClick={handleToggleLanguagesMenu} className='dark:text-dark-three text-sm flex items-end gap-x-2 cursor-pointer select-none'>{i18n.language === 'en' ? 'English' : 'Français'} <TriangleDown /></button>
                
                <ul ref={languagesMenuRef} className={`bg-white dark:bg-dark-one w-[200px] py-4 border-1 border-dark-three dark:border-none rounded-md shadow-md flex flex-col gap-y-2 ${islanguagesMenuOpen ? 'flex' : 'hidden'} absolute top-[50px] right-0 z-10`}>

                    <li><button type='button' onClick={() => handleChangeLanguage('en')} className='dark:text-white text-sm text-left w-full px-4 py-1 block cursor-pointer select-none hover:bg-light-two dark:hover:bg-dark-five'>English</button></li>

                    <li><button type='button' onClick={() => handleChangeLanguage('fr')} className='dark:text-white text-sm text-left w-full px-4 py-1 block cursor-pointer select-none hover:bg-light-two dark:hover:bg-dark-five'>Français</button></li>

                </ul> 

            </div>

        : parent === 'sidebar' 
        
        ?   <div className={`w-[300px] ${isSidebarOpen ? 'flex lg:hidden' : 'hidden'} flex-col`}>

                <button type='button' onClick={handleToggleExtandLanguagesMenu} className='dark:text-white text-sm w-[300px] px-4 py-2 flex items-center justify-between  cursor-pointer select-auto hover:bg-light-two dark:hover:bg-dark-five'>

                    <span className='flex ityems-center gap-x-2'><Language className='text-dark-three text-lg'/>Language</span>

                    <span className='text-dark-three'><AngleDown /></span> 

                </button>

                <div className={`flex flex-col gap-y ${extandLanguagesMenu ? 'h-[76px]' : 'h-0'} overflow-hidden transition-[height] duration-300 ease-in-out`}>

                    <button type='button' onClick={() => handleChangeLanguage('en')} className='dark:text-white text-sm w-[300px] text-left px-4 py-2 block cursor-pointer select-auto hover:bg-light-two dark:hover:bg-dark-five'>English</button>

                    <button type='button' onClick={() => handleChangeLanguage('fr')} className='dark:text-white text-sm w-[300px] text-left px-4 py-2 block cursor-pointer select-auto hover:bg-light-two dark:hover:bg-dark-five'>Français</button>

                </div>
            
            </div>
        
        :   
            <div className='relative'>

                <span className='text-dark-three text-xl pointer-events-none absolute right-2 top-2'><AngleDown /></span> 
                
                <select name='category' id='category' onChange={(e) => handleChangeLanguage(e.target.value)} className='bg-light-one dark:bg-dark-one dark:text-white text-sm w-full block rounded-md py-2 pl-4 pr-8 cursor-pointer select-none appearance-none focus:outline-none placeholder:text-dark-three categories'>

                    <option value='en'>English</option>

                    <option value='fr'>Français</option>

                </select>

            </div>

    );
};

export default LanguageChanger;