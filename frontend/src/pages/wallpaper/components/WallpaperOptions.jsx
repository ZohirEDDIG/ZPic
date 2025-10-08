import { useTranslation } from 'react-i18next';

import { IonIcon } from '@ionic/react';
import { arrowDownOutline, bookmarkOutline, heartOutline, shareOutline} from 'ionicons/icons';

const WallpaperOptions = () => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-wrap items-center gap-3'>

            <button type='button' className='bg-gray-800 text-white text-sm px-4 py-2 rounded-md flex justify-center gap-x-2 items-center cursor-pointer select-none transition-opacity duration-300 ease-in-out hover:opacity-80'>
                
                <IonIcon icon={arrowDownOutline} /> {t('download')}
                
            </button>

            <button type='button' className='bg-gray-800 text-white text-sm px-4 py-2 rounded-md flex justify-center gap-x-2 items-center cursor-pointer select-none transition-opacity duration-300 ease-in-out hover:opacity-80'>
                
                <IonIcon icon={bookmarkOutline} /> {t('bookmark')}
            
            </button>
                                        
            <button type='button' className='bg-gray-800 text-white text-sm px-4 py-2 rounded-md flex justify-center gap-x-2 items-center cursor-pointer select-none transition-opacity duration-300 ease-in-out hover:opacity-80'>
                
                <IonIcon icon={heartOutline} /> {t('like')}
            
            </button>

            <button type='button' className='bg-gray-800 text-white text-sm px-4 py-2 rounded-md flex justify-center gap-x-2 items-center cursor-pointer select-none transition-opacity duration-300 ease-in-out hover:opacity-80'>
                
                <IonIcon icon={shareOutline} /> {t('share')}
                
            </button>

        </div>
    );
};

export default WallpaperOptions;