import { useTranslation } from 'react-i18next';
import { AngleDown } from '../../icons';
import { useSidebar } from '../../contexts';


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

const Categories = () => {
    const { isSidebarOpen } = useSidebar();

    const { t } = useTranslation();

    return (

        <div className={`w-[300px]  px-4 flex flex-col gap-y-2 ${isSidebarOpen ? 'flex' : 'hidden'}`}>

            <h1  className='text-gray-600 text-lg font-bold'>{t('categories')}</h1>

            <div className='relative'>

                <span className='text-gray-600 text-xl pointer-events-none absolute right-4 top-2'>
                    
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

        </div> 

    );
};

export default Categories;