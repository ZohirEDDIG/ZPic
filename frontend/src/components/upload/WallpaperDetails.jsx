import { useTranslation } from 'react-i18next';
import { Xmark, AngleDown } from '../../icons'

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

const WallpaperDetails = () => {
    const { t } = useTranslation();

    return (
        <div className='flex justify-center gap-x-20'>

            <div>

                <img src='/categories/apple.webp' alt="" className='' />

            </div>

            <div className='flex flex-col gap-y-4'>

                <div className='flex items-center gap-x-4'>

                    <span className='dark:text-white text-sm'>photo-71.jpg</span>
                    
                    <span className='dark:text-white text-sm'>7825x5217</span>
                    
                    <span className='dark:text-white text-sm'>3.56 Mb</span>

                    <button type='button' className='text-gray-600 text-2xl cursor-pointer select-none'><Xmark /></button>

                </div>

                
                <div className='relative border border-gray-700 rounded-md'>

                    <span className='text-white text-xl pointer-events-none absolute right-4 top-2'>
                        
                        <AngleDown />
                    
                    </span> 
            
                    <select name='category' className='bg-gray-200 dark:bg-gray-900 dark:text-white text-sm w-full block rounded-md py-2 px-4 cursor-pointer select-none appearance-none focus:outline-none placeholder:text-gray-600 categories'>

                        {
                        
                            categories.map((category, index) => (

                                <option key={index} value={category}>{t(category)}</option>

                            ))
                        
                        }

                    </select>

                </div>

                <div className='flex flex-col gap-y-2'>

                    <input type='text' name='tags' id='tags' placeholder={t('please_specify_tags')} className='w-full dark:text-white text-sm py-2 px-4 border border-gray-700 rounded-md cursor-pointer select-none appearance-none focus:outline dark:placeholder:text-white' />
                    
                    <div className='flex gap-x-2'>
                        
                        <span className='text-gray-600  px-2 py-0.5 border border-gray-700 rounded-full'>Nature</span>

                        <span className='text-gray-600  px-2 py-0.5 border border-gray-700 rounded-full'>Nature</span>

                        <span className='text-gray-600  px-2 py-0.5 border border-gray-700 rounded-full'>Nature</span>

                    </div>
                
                </div>

            </div>
            
        </div>
    );
};

export default WallpaperDetails;