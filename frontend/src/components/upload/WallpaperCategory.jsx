import { useTranslation } from 'react-i18next';
import { AngleDown } from '../../icons';
import { useUpload } from '../../contexts';

const categories = [
  'all_categories',
  'brand',
  'technology',
  'city',
  'sport',
  'textures',
  'abstract',
  'other',
  'animals',
  'anime',
  'food_and_drink',
  'games',
  'space',
  'cars',
  'music',
  'movies',
  'flowers',
  'fantasy',
  'aviation',
  'motorcycles',
  'nature',
  'people',
  'holidays_and_events',
  'weapon'
];

const WallpaperCategory = () => {
    const { handleChangeCategory, uploaodWallpaperErrors, uploadWallpaperMutation } = useUpload();

    const { t } = useTranslation();

    return (
        <div className='flex flex-col gap-y-1'>

            <div className='border border-gray-700 rounded-md relative'>

                <span className='text-white text-xl pointer-events-none absolute right-4 top-2'>
                    
                    <AngleDown />
                
                </span> 
        
                <select name='category' onChange={(e) => handleChangeCategory(e)} className='bg-gray-200 dark:bg-gray-900 dark:text-white w-full text-sm py-2 px-4 block rounded-md cursor-pointer select-none appearance-none focus:outline-none placeholder:text-gray-600 categories'>

                    {
                        
                        categories.map((category, index) => (
                            
                            <option key={index} value={category}>{t(category)}</option>
                            
                        ))
                        
                    }

                </select>
                
            </div>

            {uploaodWallpaperErrors.category && <p className='text-red-500 text-sm'>{t(uploaodWallpaperErrors.category)}</p>}

            {uploadWallpaperMutation.isError && uploaodWallpaperErrors.error.response.data.category && <p className='text-red-500 text-sm'>{t(uploaodWallpaperErrors.error.response.data.category )}</p>}

        </div>
    );
};

export default WallpaperCategory;