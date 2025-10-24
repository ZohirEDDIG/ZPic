import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import CategoryWallpapersProvider from './context/CategoryWallpapersProvider';

import useSidebar from '@/contexts/sidebar/useSidebar';

import { Header, Sidebar, Footer } from '@/components/layout'
;
import { capitalize } from '../../utils';
import { CategoryTags, Wallpapers } from './components';

const CategoryWallpapers = () => {
    const { isSidebarOpen } = useSidebar();

    const { t } = useTranslation();

    const params  = useParams();

    return (
        <CategoryWallpapersProvider>

            <Header />

            <main className='bg-gray-300 dark:bg-gray-900 mt-[53.46px]'>

                <Sidebar />

                <div className={`screen-minus-header p-4 ${isSidebarOpen ? 'ml-[60px] lg:ml-[300px]' : 'ml-[60px]'} flex flex-col gap-y-6 transition-[margin-left] duration-300 ease-in-out`}>
                    
                    <h1 className='dark:text-white sm:text-xl'>{t(`${capitalize(params.category)} Wallpapers`)}</h1>

                    <CategoryTags />

                    <Wallpapers />

                </div>
                
                <Footer />

            </main>

        </CategoryWallpapersProvider>
    );
};

export default CategoryWallpapers;