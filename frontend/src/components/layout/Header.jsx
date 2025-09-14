import { Bars } from '../../icons';
import { useSidebar } from '../../contexts';
import { Logo, MoreMenu, DarkModeToggler, LanguageChanger } from '../common';
import { SearchBox, UserMenu } from '../header';

const Header = () => {
    const { handleToggleSidebar } = useSidebar();

    return (
        <header className='bg-white dark:bg-gray-800 w-full fixed top-0 z-[10] transition-all duration-300 ease-in-out'>
          
          <div className='px-4 py-2 flex max-[400px]:gap-x-2 justify-between items-center'>
            
              <div className='flex items-center gap-x-2 sm:gap-x-6'>
                
                  <button type='button' onClick={handleToggleSidebar} className='dark:text-white text-2xl block cursor-pointer select-none'><Bars /></button>

                  <Logo parent='header' />

                  <SearchBox />
              
              </div>

            <div className='flex items-center gap-x-8'>

                <DarkModeToggler parent='header' />

                <LanguageChanger parent='header' />

                <MoreMenu parent='header' />

                <UserMenu />

            </div>

          </div>

        </header>
    );
};

export default Header;