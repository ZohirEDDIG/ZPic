import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Upload, Edit, Logout } from '../../icons';
import { useClickOutside, useWindowWidth } from '../../hooks';
import { useAuth, useSidebar } from '../../contexts';


const UserMenu = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const userMenuButtonRef = useRef(null);

    const { setIsSidebarOpen } = useSidebar();
    const windowWidth = useWindowWidth();

    const handleToggleUserMenu = () => {
        setIsUserMenuOpen((prev) => !prev);
        if (windowWidth <= 640) {
            setIsSidebarOpen(false);
        }
    };

    useClickOutside(userMenuRef, userMenuButtonRef, setIsUserMenuOpen);

    const { user, logout } = useAuth(); 

    const { t, i18n } = useTranslation();
    
    return (
        user 
        
        ?   
        
            <div  className='relative'>

                <button ref={userMenuButtonRef} type='button' onClick={handleToggleUserMenu} className='flex justify-center items-center'>
                    
                    <img src={user?.avatar || '/user-placeholder.jpg'} alt='User avatar' className='w-8 h-8 block object-contains rounded-full cursor-pointer select-none' />
                
                </button>

                <ul ref={userMenuRef} className={`bg-gray-200 dark:bg-gray-800 w-[200px] py-4 border-1 border-gray-600 dark:border-none rounded-md shadow-md ${isUserMenuOpen ? 'flex' : 'hidden'}  flex-col gap-y-2  absolute top-[50px] right-0 z-10`}>

                    <li>
                        
                        <Link to={`/${i18n.language}/profile/${user.username}`} className='dark:text-white text-sm text-left w-full px-4 py-2 flex items-center gap-x-2 cursor-pointer select-none transition-[background-color] duration-300 ease-in-out  hover:bg-gray-400 dark:hover:bg-gray-700'>
                                
                            <User className='text-gray-600' /> 
                            
                            My Profile
                            
                        </Link>
                        
                    </li>

                    <li>
                        
                        <Link to={`/${i18n.language}/upload`} className='dark:text-white text-sm text-left w-full px-4 py-2 flex items-center  gap-x-2 cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-700'>
                            
                            <Upload className='text-gray-600' /> 
                            
                            Upload
                            
                        </Link>

                    </li>
                    
                    <li>
                        
                        <Link to={`/${i18n.language}/account`} className='dark:text-white text-sm text-left w-full px-4 py-2 flex  items-center gap-x-2 cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-700'>
                        
                            <Edit className='text-gray-600' /> 
                            
                            Edit Profile
                            
                        </Link>
                    
                    </li>

                    <li>
                        
                        <button type='button' onClick={() => logout(t('user_logged_out_successfully'), '✅')} className='dark:text-white text-sm text-left w-full px-4 py-2 flex  items-center gap-x-2 cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-700'>
                            
                            <Logout className='text-gray-600' /> 
                            
                            Logout
                            
                        </button>
                    
                    </li>

                </ul>
            
            </div>

        :   
            
            <Link to={`/${i18n.language}/account/login`} className='flex justify-center items-center'>

                <img src='/user-placeholder.jpg' alt='User placeholder' className='w-8 h-8 block object-contains rounded-full cursor-pointer select-none' />

            </Link>

    );
};

export default UserMenu;