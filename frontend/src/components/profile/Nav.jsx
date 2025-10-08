import { useProfile } from '../../contexts';

const Nav = () => {
    const { activeTab,  activeTabRef, unactiveTabRef, activeTabStyles, handleTabClick } = useProfile();

    return (
        <nav className='pb-2 flex items-center gap-x-6 relative before:content-[""] before:bg-gray-600 before:w-full before:h-[1px] before:absolute before:bottom-0'>

            <button ref={activeTab === 'uploads' ? activeTabRef : unactiveTabRef} type='button' onClick={() => handleTabClick('uploads')} className='dark:text-white cursor-pointer'>Uploads</button>

            <button ref={activeTab === 'bookmarks' ? activeTabRef : unactiveTabRef} type='button' onClick={() => handleTabClick('bookmarks')} className='dark:text-white cursor-pointer'>Bookmarks</button>

            <span className='bg-gold h-[2px] absolute bottom-[-0] transition-all duration-300 ease-in-out' style={activeTabStyles}></span>

        </nav>
    );
};

export default Nav;4