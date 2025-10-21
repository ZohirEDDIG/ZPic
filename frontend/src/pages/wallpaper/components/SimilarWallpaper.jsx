import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useWallpaper from '../context/useWallpaper.js';

const SimilarWallpaper = () => {
    const { getSimilarWallpapersMutation  } = useWallpaper();

    const { t, i18n } = useTranslation();

    return (
        getSimilarWallpapersMutation.isPending

        ?   <h1 className='dark:text-white text-xl'>{t('Loading similar wallpapers...')}</h1>

        :   getSimilarWallpapersMutation.isSuccess

        ?   <div className='flex flex-col gap-y-4'>

                <h2 className='dark:text-white text-xl'>{t('Similar wallpapers')}</h2>

                <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5'>

                    {
                        getSimilarWallpapersMutation.data.data.similarWallpapers.map((wallpaper) => (

                            <Link key={wallpaper._id} to={`/${i18n.language}/image/${wallpaper._id}`} className='mb-4 block'>
                                
                                <img src={wallpaper.wallpaper} alt={wallpaper.name} />

                            </Link>

                        ))
                    }

                </div>

            </div>

        :   getSimilarWallpapersMutation.isError 

        ?   getSimilarWallpapersMutation.error?.response?.data?.error && <p className='error'>{t(getSimilarWallpapersMutation.error.response.data.error)}</p>

        :   <p className='error'>{t('Something went wrong while loading similar wallpapers')}</p>
    );
};

export default SimilarWallpaper;