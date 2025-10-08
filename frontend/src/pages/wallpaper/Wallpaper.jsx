import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSidebar } from '../../contexts';

import useWallpaper from './context/useWallpaper';

import { Header, Sidebar, Footer } from '../../components/layout';
import { Loading } from '../../components/common';

import { WallpaperDetails, WallpaperOptions, RelatedTags, SimilarWallpaper, OtherResolutionsDownload, WallpaperNotFound } from './components';

const Wallpaper = () => {
    const { setWallpaperId, getWallpaperQuery } = useWallpaper();

    const { isSidebarOpen } = useSidebar();

    const params = useParams();
    
    useEffect(() => {
        setWallpaperId(params.wallpaperId);
    }, []);

        
    const { i18n } = useTranslation();
    
    return (
        <>
            <Header />

            <main className='bg-gray-300 dark:bg-gray-900 mt-[53.46px]'>

                <Sidebar />

                <div className={`screen-minus-header p-4 ${isSidebarOpen ? 'ml-[60px] lg:ml-[300px]' : 'ml-[60px]'} ${getWallpaperQuery.isPending || getWallpaperQuery.isError ? 'flex justify-center items-center' : 'flex flex-col gap-y-9'} transition-[margin-left] duration-300 ease-in-out`}>

                    {
                        
                        getWallpaperQuery.isPending

                        ? <Loading />

                        : getWallpaperQuery.isSuccess


                        ?  (

                            <>
                                <div className='screen-minus-header grid grid-cols-1 md:grid-cols-2 gap-10'>
                                
                                    <div className='screen-minus-header bg-gray-800 flex justify-center items-center'>

                                        <img src={getWallpaperQuery.data.data.wallpaper.wallpaper} alt={getWallpaperQuery.data.data.wallpaper.name} className='select-none' />

                                    </div>

                                    <div className='flex flex-col gap-y-6'>

                                        <WallpaperDetails wallpaper={getWallpaperQuery.data.data.wallpaper} />

                                        <WallpaperOptions />
                               
                                    </div>
                               
                               </div> 

                               <OtherResolutionsDownload />

                               <RelatedTags />

                               <SimilarWallpaper />

                            </>
                        
                        )

                        : getWallpaperQuery.isError

                        ? ( (getWallpaperQuery.error.response.status === 400 || getWallpaperQuery.error.response.status === 404)
                        
                        ? <Navigate to={`/${i18n.language}/wallpaper-not-found`} /> 
                        
                        : <p className='error'>{getWallpaperQuery.error.response.data.error}</p> )

                        : null
                    }

                </div>
                
                <Footer />

            </main>

        </>
    );
};

export default Wallpaper;