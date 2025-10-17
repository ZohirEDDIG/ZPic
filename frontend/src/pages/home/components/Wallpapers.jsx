import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import useHome from '../context/useHome';

import Pagination from './Pagination';


const Wallpapers = () => {
    const { getWallpapersQuery } = useHome();

    const { t, i18n } = useTranslation();

    return (
        <section className='screen-minus-header'>

            {
                getWallpapersQuery.isPending 

                ? <h1 className='dark:text-white'>{t('Loading wallpapers...')}</h1> 
                
                :   getWallpapersQuery.isSuccess 
                
                ?   
                    <>
                        <div  className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5'>
                        
                            {                    
                                
                                getWallpapersQuery.data.data.wallpapers.map((wallpaper) => (
                                    
                                    <Link key={wallpaper._id} to={`/${i18n.language}/image/${wallpaper._id}`}>
                                        
                                        <img src={wallpaper.wallpaper} alt='Wallpaper' className='mb-4' />

                                    </Link>
                                ))
                                
                            }
                        
                        </div>
                        
                        <Pagination />
                    </>

                : getWallpapersQuery.isError 
                
                ? (getWallpapersQuery.error?.response?.data?.error ? <p>{getWallpapersQuery.error.response.data.error}</p> : <p className='error'>{t('Something went wrong when trying to load wallpapers')}</p>)

                : null
            }

        </section>
    );
};

export default Wallpapers;