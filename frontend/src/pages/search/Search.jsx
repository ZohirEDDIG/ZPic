import useSidebar from '@/contexts/sidebar/useSidebar';

import SearchProvider from './context/SearchProvider';

import { Header, Sidebar, Footer } from '@/components/layout';
import Wallpapers from './components/Wallpapers';

const Search = () => {
    const { isSidebarOpen } = useSidebar();


    return (
        <SearchProvider>

            <Header />

            <main className='bg-gray-300 dark:bg-gray-900 mt-[53.46px]'>

                <Sidebar />

                <div className={`screen-minus-header p-4 ${isSidebarOpen ? 'ml-[60px] lg:ml-[300px]' : 'ml-[60px]'} flex flex-col gap-y-6 transition-[margin-left] duration-300 ease-in-out`}>

                    <Wallpapers /> 
                    
                </div>
                
                <Footer />

            </main>

        </SearchProvider>
    );
}

export default Search;