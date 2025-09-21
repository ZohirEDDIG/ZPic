import { useTranslation } from 'react-i18next';
import { useSidebar, useUpload } from '../contexts';
import { Header, Sidebar, Footer } from '../components/layout';
import { UploadWallpaper, Wallpaper, WallpaperDetails,  WallpaperCategory, WallpaperTags } from '../components/upload';

const Upload = () => {
    const { wallpaper, handleUploadWallpaper, uploadWallpaperMutation, uploaodWallpaperErrors } = useUpload();

    const { t } = useTranslation();

    const { isSidebarOpen } = useSidebar();

    return (
        <>

            <Header />

            <main className='bg-gray-100 dark:bg-gray-900  mt-[53.46px]'>

                <Sidebar />

                <div className={`p-4 min-h-[calc(100dvh-53.46px)] ${isSidebarOpen ? 'ml-[60px] lg:ml-[300px]' : 'ml-[60px]'} flex flex-col gap-y-8 transition-[margin-left] duration-300 ease-in-out`}>
                  
                    <div className='min-h-[calc(100dvh-53.46px)] flex flex-col gap-y-10'>

                        <h1 className='dark:text-white sm:text-xl'>{t('wallpapers_uploading')}</h1>

                        <div className='flex flex-col gap-y-2 -mt-6'>

                            <p className='text-gray-600 text-sm'>{t('maximum_file_size_12mb')}</p>

                            <p className='text-gray-600 text-sm'>{t('minimum_resolution_3000x1080_or_1080x1920')}</p>
                        
                        </div>

                        <UploadWallpaper />

                        {uploaodWallpaperErrors.wallpaper && <p className='text-red-600 text-sm'>{t(uploaodWallpaperErrors.wallpaper)}</p>}

                        {
                            wallpaper.file && (
                            
                                <div className='grid grid-cols-1 xl:grid-cols-2 xl:items-center gap-x-20 gap-y-10'>

                                    <Wallpaper />

                                    <div className='flex flex-col gap-y-4'>

                                        <WallpaperDetails />

                                        <WallpaperCategory />

                                        <WallpaperTags />

                                    </div>
                                
                                </div>
                            )
                        }

                        {wallpaper.file && <button type='button' disabled={uploadWallpaperMutation.isLoading} onClick={handleUploadWallpaper} className={`bg-gold w-fit text-sm sm:text-base px-4 py-2 mx-auto rounded-md ${uploadWallpaperMutation.isPending ? 'opacity-50 cursor-none pointer-events-none' : 'opacity-100 cursor-pointer hover:opacity-80'} flex gap-x-2 items-center select-none transition-opacity duration-300 ease-in-out`}>{uploadWallpaperMutation.isPending ? t('uploading') : t('upload')}</button>}

                    </div>

                </div>
                
                <Footer />

            </main>

        </>
    );
};

export default Upload;