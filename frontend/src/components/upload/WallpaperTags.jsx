import { useTranslation } from 'react-i18next';
import { Xmark } from '../../icons';
import { useUpload } from '../../contexts';
import { Loading } from '../common';

const WallpaperTags = () => {
    const { handleAddTag, tags, handleRemoveTag, uploaodWallpaperErrors, uploadWallpaperMutation, getCategoryTagsQuery } = useUpload();

    const { t } = useTranslation();

    return (
        <div className='flex flex-col gap-y-4'>
        
            <div  className='w-full dark:text-white text-sm py-2 px-4 border border-gray-700 rounded-md flex flex-wrap gap-2 appearance-none focus:outline-none dark:placeholder:text-white'>
                
                { 
                    tags.length === 0 ? 'Please specify tags' : tags.map((tag) => (
                        
                        <button key={tag.id} type='button' onClick={() => handleRemoveTag(tag)}  className='text-gray-600 text-sm px-2 py-0.5 border border-gray-700 rounded-full flex items-center gap-x-1'>
                            
                            {tag.name} 
                            
                            <Xmark className='cursor-pointer select-none'/>

                        </button>
                ))}

            </div>
            
            {
                getCategoryTagsQuery.isPending 

                ? ''
                
                : getCategoryTagsQuery.isSuccess

                ? (
                    <div className='flex  flex-wrap gap-2'>
                        {
                            getCategoryTagsQuery.data.data.tags.map((tag) => (

                                tags.find((t) => t.id === tag._id) ? '' : <button type='button' onClick={() => handleAddTag(tag)} className='bg-gray-800 text-white text-sm px-2 py-0.5 border border-gray-700 rounded-full flex items-center gap-x-1' key={tag._id}>{tag.name}</button>
                            
                            ))
                        }

                    </div>
                )
                
                : getCategoryTagsQuery.isError

                ? <h1>{getCategoryTagsQuery.error.response.data.error}</h1>

                : null

            }


            {uploaodWallpaperErrors.tags && <p className='text-red-500 text-sm'>{t(uploaodWallpaperErrors.tags)}</p>}

            {uploadWallpaperMutation.isError && uploadWallpaperMutation.error.response.data.tags && <p className='text-red-500 text-sm'>{t(uploadWallpaperMutation.error.response.data.tags )}</p>}

        </div>
    );
};

export default WallpaperTags;