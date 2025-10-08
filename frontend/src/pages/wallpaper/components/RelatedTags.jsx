import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useWallpaper from '../context/useWallpaper.js';

const RelatedTags = () => {
    const { getCategoryTagsQuery } = useWallpaper();

    const { t } = useTranslation();

    return (
        getCategoryTagsQuery.isPending

        ?  <h1 className='dark:text-white'>{t('loading_related_tags')}</h1>

        :   getCategoryTagsQuery.isSuccess

        ?   <div className='flex flex-col gap-y-4'>

                <h2 className='dark:text-white text-xl'>{t('related_tags')}</h2>

                <div className='flex flex-wrap items-center gap-2'>

                    {
                        getCategoryTagsQuery.data.data.tags.map((tag) => (

                            <Link key={tag._id} to='/' className='bg-gray-800 text-white px-2 py-1 flex items-center gap-x-2 rounded-full cursor-pointer select-none'>

                                <img src={tag.image} alt={tag.name} className='w-6 h-6 rounded-full' />

                                <span className='text-white text-sm'>{tag.name}</span>
                
                            </Link>

                        ))
                    }

                </div>

            </div>

        :   getCategoryTagsQuery.isError 

        ?   getCategoryTagsQuery.error.response.data.error && <p className='error'>{t(getCategoryTagsQuery.error.response.data.error)}</p>

        :   null
    );
};

export default RelatedTags;