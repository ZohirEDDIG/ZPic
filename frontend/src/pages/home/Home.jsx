import { useTranslation } from 'react-i18next';

import useSidebar from '@/contexts/sidebar/useSidebar';
import HomeProvider from './context/HomeProvider';

import { Header, Sidebar, Footer } from '@/components/layout';
import { Categories, Wallpapers } from './components';


const Home = () => {
    const { isSidebarOpen } = useSidebar();

    const { t } = useTranslation();

    return (
        <HomeProvider>

            <Header />

            <main className='bg-gray-300 dark:bg-gray-900 mt-[53.46px]'>

                <Sidebar />

                <div className={`screen-minus-header p-4 ${isSidebarOpen ? 'ml-[60px] lg:ml-[300px]' : 'ml-[60px]'} flex flex-col gap-y-6 transition-[margin-left] duration-300 ease-in-out`}>
                  
                    <h1 className='dark:text-white sm:text-xl'>{t('HD wallpapers, free desktop backgrounds')}</h1>

                    <Categories />

                    <Wallpapers />

                </div>
                
                <Footer />

            </main>

        </HomeProvider>
    );
};

export default Home;