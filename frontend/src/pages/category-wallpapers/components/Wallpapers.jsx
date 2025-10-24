import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import useCategoryWallpapers from '../context/useCategoryWallpapers';

import Pagination from './Pagination';


const Wallpapers = () => {
    const { getCategoryWallpapersQuery } = useCategoryWallpapers();

    const { t, i18n } = useTranslation();

    return (
        <section className='screen-minus-header'>

            {
                getCategoryWallpapersQuery.isPending 

                ? <h1 className='dark:text-white'>{t('Loading wallpapers...')}</h1> 
                
                :   getCategoryWallpapersQuery.isSuccess 
                
                ?   
                    <>
                        <div  className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5'>
                        
                            {                    
                                
                                getCategoryWallpapersQuery.data.data.wallpapers.map((wallpaper) => (
                                    
                                    <Link key={wallpaper._id} to={`/${i18n.language}/image/${wallpaper._id}`}>
                                        
                                        <img src={wallpaper.wallpaper} alt='Wallpaper' className='mb-4' />

                                    </Link>
                                ))
                                
                            }
                        
                        </div>
                        
                        <Pagination />
                    </>

                : getCategoryWallpapersQuery.isError 
                
                ? (getCategoryWallpapersQuery.error?.response?.data?.error ? <p>{getCategoryWallpapersQuery.error.response.data.error}</p> : <p className='error'>{t('Something went wrong when trying to load wallpapers')}</p>)

                : null
            }

        </section>
    );
};

export default Wallpapers;