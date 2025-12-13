import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { format } from 'date-fns';

const WallpaperDetails = ({ wallpaper }) => {
    const { description, createdAt, category, resolution, author: { username } } = wallpaper;

    const formatted = format(new Date(createdAt), 'dd MMM yy');

    const { t, i18n } = useTranslation();

    return (
        <div className='flex flex-col gap-y-6'>

            <div className='flex flex-col gap-y-3'>


                <h2 className='text-gray-600 text-2xl'>{description}</h2>
            
                <h3 className='text-gray-600'>{t('Uploaded')} {formatted}</h3>

            </div>

            <div className='flex flex-col gap-y-3'>   

                <h3 className='text-gray-600'>{t('Category')}: <span className='dark:text-white'>{category.name}</span></h3>

                <h3 className='text-gray-600'>{t('Resolution')}: <span className='dark:text-white'>{resolution}</span></h3>

                <Link to={`/${i18n.language}/profile/${username}`}  className='text-gray-600'>{t('Uploaded by')}: <span className='dark:text-white'>{username}</span></Link>
            
            </div>

        </div>
    );
};

export default WallpaperDetails;