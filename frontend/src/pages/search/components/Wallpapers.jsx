import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import Pagination from './Pagination';

import useSearch from '../context/useSearch';
import NotFound from './NotFound';


const Wallpapers = () => {
    const { getSearchWallpapersQuery } = useSearch();

    const { t, i18n } = useTranslation();

    return (
        <section className='screen-minus-header'>

            {
                getSearchWallpapersQuery.isPending 

                ? <h1 className='dark:text-white'>{t('Loading wallpapers...')}</h1> 
                
                :   getSearchWallpapersQuery.isSuccess 
                
                ?   (

                    getSearchWallpapersQuery.data.data.wallpapers.length === 0 

                    ?   <NotFound />

                    :   <>
                            <div  className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5'>

                                <h1 className='dark:text-white text-2xl'>Search Results For </h1>

                                {                    
                                    
                                    getSearchWallpapersQuery.data.data.wallpapers.map((wallpaper) => (
                                        
                                        <Link key={wallpaper._id} to={`/${i18n.language}/image/${wallpaper._id}`}>
                                            
                                            <img src={wallpaper.wallpaper} alt='Wallpaper' className='mb-4' />

                                        </Link>
                                    ))
                                    
                                }
                            
                            </div>
                        
                            <Pagination />
                    </>
                )

                : getSearchWallpapersQuery.isError 
                
                ? (getSearchWallpapersQuery.error?.response?.data?.error ? <p>{getSearchWallpapersQuery.error.response.data.error}</p> : <p className='error'>{t('Something went wrong when trying to load wallpapers')}</p>)

                : null
            }

        </section>
    );
};

export default Wallpapers;