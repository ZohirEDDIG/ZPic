import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useProfile } from '../../contexts';
import { Loading } from '../common';

const Bookmarks = () => {
    const { t } = useTranslation();

    const { getCurrentUserBookmarksQuery } = useProfile();

    return (

        getCurrentUserBookmarksQuery.isPending

        ?   (
                <div className='flex-1 flex justify-center items-center'>
                    
                    <Loading />
                
                </div>
        )

        : getCurrentUserBookmarksQuery.isSuccess

        ?   getCurrentUserBookmarksQuery.data.data.bookmarks.length === 0

            ?   (
                    <div className='flex flex-col gap-y-4'>

                        <p className='dark:text-white text-sm'>{t('no_bookmarks_available')}</p>

                        <p className='dark:text-white text-sm'>{t('when_you_bookmark_a_wallpaper_it_will_appear_here')}</p>

                    </div>
            )

            :   (
                    <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5'>

                        {

                            getCurrentUserBookmarksQuery.data.data.bookmarks.map((bookmark) =>
                                
                                <Link key={bookmark._id} to='/' className='mb-4 select-none'>

                                    <img src={bookmark.wallpaper} alt={bookmark.name}  />

                                </Link>
                            ) 
                        
                        }

                    </div>
                )

        
        :   <p className='text-red-500 text-sm'>{getCurrentUserBookmarksQuery.error.response.data.error}</p>
        

    );
};

export default Bookmarks;