import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Upload, Edit, Logout } from '../../icons';
import { useClickOutside } from '../../hooks';
import { useAuth } from '../../contexts';


const UserMenu = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
    const userMenuRef = useRef<HTMLUListElement>(null);
    const userMenuButtonRef = useRef<HTMLButtonElement>(null);

    const handleToggleUserMenu = () : void => {
        setIsUserMenuOpen((prev) => !prev);
    };

    useClickOutside(userMenuRef, userMenuButtonRef, setIsUserMenuOpen);

    const { user, logout } = useAuth(); 

    const { i18n } = useTranslation();
    
    return (
        user ? 

        <div  className='relative'>

            <button ref={userMenuButtonRef} type='button' onClick={handleToggleUserMenu} className='flex justify-center items-center'>
                
                <img src='/user-placeholder.jpg' alt='User placeholder' className='w-8 h-8 block object-contains rounded-full cursor-pointer select-none' />
            
            </button>

            <ul ref={userMenuRef} className={`bg-light-one dark:bg-dark-one w-[200px] py-4 border-1 border-dark-three dark:border-none rounded-md shadow-md ${isUserMenuOpen ? 'flex' : 'hidden'}  flex-col gap-y-2  absolute top-[50px] right-0 z-10`}>

            <li><Link to={`/profile/${user!.username}`} className='dark:text-white text-sm text-left w-full px-4 py-2 flex items-center gap-x-2 cursor-pointer select-none hover:bg-light-two dark:hover:bg-dark-five'><User className='text-dark-three' /> My Profile</Link></li>

            <li><Link to='/upload' className='dark:text-white text-sm text-left w-full px-4 py-2 flex items-center  gap-x-2 cursor-pointer select-none hover:bg-light-two dark:hover:bg-dark-five'><Upload className='text-dark-three' /> Upload</Link></li>
            
            <li><Link to='/account' className='dark:text-white text-sm text-left w-full px-4 py-2 flex  items-center gap-x-2 cursor-pointer select-none hover:bg-light-two dark:hover:bg-dark-five'><Edit className='text-dark-three' /> Edit Profile</Link></li>

            <li><button type='button' onClick={logout} className='dark:text-white text-sm text-left w-full px-4 py-2 flex  items-center gap-x-2 cursor-pointer select-none hover:bg-light-two dark:hover:bg-dark-five'><Logout className='text-dark-three' /> Logout</button></li>

            </ul>
            
        </div>

        : 

        <Link to={`/${i18n.language}/login`} className='flex justify-center items-center' >

            <img src='/user-placeholder.jpg' alt='User placeholder' className='w-8 h-8 block object-contains rounded-full cursor-pointer select-none' />

        </Link>

    );
};

export default UserMenu;