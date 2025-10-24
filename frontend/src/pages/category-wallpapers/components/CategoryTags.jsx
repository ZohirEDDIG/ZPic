import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useCategoryWallpapers from '../context/useCategoryWallpapers';


const CategoryTags = () => {
    const { getCategoryTagsQuery } = useCategoryWallpapers();

    const { t } = useTranslation();

    return (
        getCategoryTagsQuery.isPending

        ?  <h1 className='dark:text-white text-2xl'>{t('Loading category tags...')}</h1>

        :   getCategoryTagsQuery.isSuccess

        ?   <div className='flex flex-col gap-y-4'>

                <div className='flex flex-wrap items-center gap-2'>

                    {
                        getCategoryTagsQuery.data.data.tags.map((tag) => (

                            <Link key={tag._id} to='/' className='bg-gray-800 text-white px-2 py-1 flex items-center gap-x-2 rounded-full'>

                                <img src={tag.image} alt={tag.name} className='w-6 h-6 rounded-full' />

                                <span className='text-white text-sm'>{tag.name}</span>
                
                            </Link>

                        ))
                    }

                </div>

            </div>

        :   getCategoryTagsQuery.isError 

        ?   getCategoryTagsQuery.error.response.data.error && <p className='error'>{t(getCategoryTagsQuery.error.response.data.error)}</p>

        :   <p className='error'>{t('Something went wrong while loading related tags')}</p>
    );
};

export default CategoryTags;