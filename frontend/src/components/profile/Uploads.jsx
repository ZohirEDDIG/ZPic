import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useProfile } from '../../contexts';
import { Loading } from '../common';

const Uploads = () => {
    const { t, i18n } = useTranslation();
    
    const { getCurrentUserUploadsQuery } = useProfile();

    return (

        getCurrentUserUploadsQuery.isPending

        ?   (
                <div className='flex-1 flex justify-center items-center'>
                    
                    <Loading />
                
                </div>
        )

        : getCurrentUserUploadsQuery.isSuccess

        ?   getCurrentUserUploadsQuery.data.data.uploads.length === 0

            ?   (
                    <div className='flex flex-col gap-y-4'>

                        <h1 className='dark:text-white text-lg'>{t('contribute_to_zpic')}</h1>

                        <p className='dark:text-white text-sm'>{t('want_to_share_some_great_wallpapers_with_the_comunity')}</p>

                        <p className='dark:text-white text-sm'>{t('all_images_shall_be_licensed_under_cc0')}</p>

                        <Link className='w-fit dark:text-white text-sm underline  transition-[color] duration-300 ease-in-out hover:text-gold' to={`/${i18n.language}/upload`}>{t('upload')}</Link>

                    </div>
            )

            :   (
                    <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5'>

                        {

                            getCurrentUserUploadsQuery.data.data.uploads.map((upload) =>
                                
                                <Link key={upload._id} to='/' className='mb-4 select-none'>

                                    <img src={upload.wallpaper} alt={upload.name} />

                                </Link>
                            ) 
                        
                        }

                    </div>
                )

        
        :   <p className='text-red-500 text-sm'>{t(getCurrentUserUploadsQuery.error.response.data.error)}</p>
        

    );
};

export default Uploads;