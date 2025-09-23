import { useTranslation } from 'react-i18next';
import { useSidebar } from '../contexts';
import { Header, Sidebar, Footer } from '../components/layout';
import { Categories, Wallpapers, Pagination } from '../components/home';

const Home = () => {
    const { isSidebarOpen } = useSidebar();

    const { t } = useTranslation();

    return (
        <>
            <Header />

            <main className='bg-gray-300 dark:bg-gray-900 mt-[53.46px]'>

                <Sidebar />

                <div className={`min-h-[calc(100dvh-53.46px)] p-4 ${isSidebarOpen ? 'ml-[60px] lg:ml-[300px]' : 'ml-[60px]'} flex flex-col gap-y-6 transition-[margin-left] duration-300 ease-in-out`}>
                  
                    <h1 className='dark:text-white sm:text-xl'>{t('hd_wallpapers_free_desktop_backgrounds')}</h1>

                    <Categories />

                    <Wallpapers />

                    <Pagination />


                </div>
                
                <Footer />

            </main>

        </>
    );
};

export default Home;