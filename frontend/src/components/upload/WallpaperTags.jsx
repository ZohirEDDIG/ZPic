import { useTranslation } from 'react-i18next';
import { Xmark } from '../../icons';
import { useUpload } from '../../contexts';

const WallpaperTags = () => {
    const { tag, handleAddTag, tags, handleRemoveTag, uploaodWallpaperErrors } = useUpload();

    const { t } = useTranslation();

    return (
        <div className='flex flex-col gap-y-1'>
        
            <input type='text' name='tags' id='tags' value={tag} disabled={tags.length === 3} onChange={(e) => handleAddTag(e)} onKeyDown={(e) => handleAddTag(e)} placeholder={tags.length === 3 ? t('max_tags_reached') : t('please_specify_tags')} className='w-full dark:text-white text-sm py-2 px-4 border border-gray-700 rounded-md appearance-none focus:outline-none dark:placeholder:text-white' />
            
            <div className='flex flex-wrap gap-2'>

                {
                    tags && tags.map((tag, index) => (

                        <button key={index} type='button' onClick={(e) => handleRemoveTag(e)} className='text-gray-600 text-sm px-2 py-0.5 border border-gray-700 rounded-full flex items-center gap-x-1'>
                            
                            {tag} 
                            
                            <Xmark className='cursor-pointer select-none'/>

                        </button>

                    ))
                }
                
            </div>

            <p className='text-gray-600'>{3 - tags.length} {t('tags_left')}</p>

            {uploaodWallpaperErrors.tags && <p className='text-red-500 text-sm'>{t(uploaodWallpaperErrors.tags)}</p>}

                            
        </div>
    );
};

export default WallpaperTags;