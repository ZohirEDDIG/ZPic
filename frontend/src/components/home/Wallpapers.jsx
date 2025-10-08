import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useWallpapers } from '../../contexts';


const Wallpapers = () => {
    const { setWallpaper, getWallpapersQuery } = useWallpapers();
    const { i18n } = useTranslation();

    return (
        <section  className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5'>

            {
                getWallpapersQuery.isPending 

                ? <h1>Loading wallpapers...</h1> 
                
                : getWallpapersQuery.isSuccess 
                
                ? getWallpapersQuery.data.data.wallpapers.map((wallpaper) => (
                    
                    <Link key={wallpaper._id} onClick={() => setWallpaper(wallpaper)} to={`/${i18n.language}/image/${wallpaper._id}`} className='block cursor-pointer select-none'>
                        
                        <img src={wallpaper.wallpaper} alt='Wallpaper' className='mb-4' />

                    </Link>
                ))

                : getWallpapersQuery.isError 

                ? <h1>Error: {getWallpapersQuery.error.message}</h1>

                : null
                
            }

        </section>
    );
};

export default Wallpapers;