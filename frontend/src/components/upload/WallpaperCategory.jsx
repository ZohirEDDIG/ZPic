import { useTranslation } from 'react-i18next';
import { AngleDown } from '../../icons';
import { useUpload } from '../../contexts';
import { Loading } from '../common';
import { useEffect } from 'react';


const WallpaperCategory = () => {
    const { handleChangeCategory, getCategoriesQuery, uploaodWallpaperErrors, uploadWallpaperMutation,  } = useUpload();

    const { t } = useTranslation();

    useEffect(() => {
        if (uploadWallpaperMutation.isError) {
            console.info(uploadWallpaperMutation)
        }
    }, [uploadWallpaperMutation.isError])

    return (

        getCategoriesQuery.isPending 

        ?   <h1 className='text-gray-600'>Loading categories...</h1>

        :   getCategoriesQuery.isSuccess

            ?   (
                
                <div className='flex flex-col gap-y-1'>

                    <div className='border border-gray-700 rounded-md relative'>

                        <span className='text-white text-xl pointer-events-none absolute right-4 top-2'>
                            
                            <AngleDown />
                        
                        </span> 
                
                        <select name='category' onChange={(e) => handleChangeCategory(e)} className='bg-gray-200 dark:bg-gray-900 dark:text-white w-full text-sm py-2 px-4 block rounded-md cursor-pointer select-none appearance-none focus:outline-none placeholder:text-gray-600 categories'>

                            <option value=''>All categories</option>
                            
                            {

                                getCategoriesQuery.data.data.categories.map((category, index) => (

                                    <option key={index} value={category._id}>{t(category.name)}</option>
                                    
                                ))
                                
                            }

                        </select>
                        
                    </div>

                    {uploaodWallpaperErrors.category && <p className='text-red-500 text-sm'>{t(uploaodWallpaperErrors.category)}</p>}

                    {/* {uploadWallpaperMutation.isError && uploadWallpaperMutation.error.response.data?.errors.category && <p className='text-red-500 text-sm'>{t(uploadWallpaperMutation.error.response.data.errors.category )}</p>} */}

                </div>
            )

        :   getCategoriesQuery.isError 

        ?   <p className='text-red-500 text-sm'>{t(getCategoriesQuery.error.response.data.error)}</p>

        :   null
    );
};

export default WallpaperCategory;