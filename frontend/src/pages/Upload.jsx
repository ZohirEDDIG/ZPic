import { useTranslation } from 'react-i18next';
import { Xmark } from '../icons';
import { useSidebar } from '../contexts';
import { Header, Sidebar, Footer } from '../components/layout';
import { UploadWallpaper, WallpaperDetails } from '../components/upload';

const Upload = () => {
    const { t } = useTranslation();

    const { isSidebarOpen } = useSidebar();

    return (
        <>
            <Header />

            <main className='bg-gray-100 dark:bg-gray-900  mt-[53.46px]'>

                <Sidebar />

                <div className={`p-4 ${isSidebarOpen ? 'ml-[60px] lg:ml-[300px]' : 'ml-[60px]'} flex flex-col gap-y-8 transition-[margin-left] duration-300 ease-in-out`}>
                  
                    <div className='min-h-[calc(100dvh-53.46px)] flex flex-col gap-y-8'>

                        <h1 className='dark:text-white sm:text-xl'>{t('wallpaper_uploading')}</h1>

                        <div className='flex flex-col gap-y-2'>

                            <p className='text-gray-600'>{t('maximum_file_size_12mb')}</p>

                            <p className='text-gray-600'>{t('minimum_resolution_3000x1080_or_1080x1920')}</p>

                        </div>

                        <div className='bg-red-950 py-4 rounded-md flex justify-center items-center gap-x-2'>

                            <p className='text-red-500'>goat.jpg too small (1920x1080)</p>

                            <button type='button' className='text-red-500 text-2xl cursor-pointer select-none'><Xmark /></button>

                        </div>

                        <WallpaperDetails />

                        <UploadWallpaper />

                        <button type='button' className={`bg-gold w-fit text-sm sm:text-base px-4 py-2 mx-auto rounded-md cursor-pointer  select-none transition-opacity duration-300 ease-in-out hover:opacity-80`}>{t('upload')}</button>

                    </div>

                    <Footer />

                </div>

            </main>

        </>
    );
};

export default Upload;