import { useTranslation } from 'react-i18next';

import { IonIcon } from '@ionic/react';
import { arrowDownOutline, shareOutline} from 'ionicons/icons';

import { MdBookmarkAdd, MdBookmarkRemove } from 'react-icons/md';
import { FaHeartCircleMinus, FaHeartCirclePlus } from 'react-icons/fa6';

import { useAuth } from '../../../contexts';
import useWallpaper from '../context/useWallpaper';

const WallpaperOptions = () => {
    const { user } = useAuth();
    
    const { wallpaperId, handleDownload, handleLikeWallpaper, handleBookmarkWallpaper, handleShare } = useWallpaper()
    
    const { t } = useTranslation();

    return (
        <div className='flex flex-wrap items-center gap-4'>

            <button type='button' onClick={handleDownload} className='bg-gray-800 text-white text-sm px-4 py-2 rounded-md flex justify-center gap-x-2 items-center transition-opacity duration-300 ease-in-out hover:opacity-80'>
                
                <IonIcon icon={arrowDownOutline} /> {t('Download')}
                
            </button>

            <button type='button' onClick={handleBookmarkWallpaper} className='bg-gray-800 text-white text-sm px-4 py-2 rounded-md flex justify-center gap-x-2 items-center transition-opacity duration-300 ease-in-out hover:opacity-80'>
                
                { 
                
                    user?.bookmarks?.includes(wallpaperId) 
                    
                    ? 
                    
                    <>

                        <MdBookmarkRemove  className='text-xl'/> 

                                            
                        {t('Unbookmark')}
                    
                    </> 
                    
                    : 
                    
                    <>
                    
                        <MdBookmarkAdd className='text-xl' />
                        
                        {t('Bookmark')}
                    
                    </>
    
                }
            
            </button>
                                        
            <button type='button' onClick={handleLikeWallpaper} className='bg-gray-800 text-white text-sm px-4 py-2 rounded-md flex justify-center gap-x-2 items-center transition-opacity duration-300 ease-in-out hover:opacity-80'>
                
                { 
                
                    user?.likes?.includes(wallpaperId) 
                    
                    ? 
                    
                    <>

                        <FaHeartCircleMinus className='text-xl'/> 

                                            
                        {t('Unlike')}
                    
                    </> 
                    
                    : 
                    
                    <>
                    
                        <FaHeartCirclePlus className='text-xl' />
                        
                        {t('Like')}
                    
                    </>
    
                }
            
            </button>

            <button type='button' onClick={handleShare} className='bg-gray-800 text-white text-sm px-4 py-2 rounded-md flex justify-center gap-x-2 items-center transition-opacity duration-300 ease-in-out hover:opacity-80'>
                
                <IonIcon icon={shareOutline} /> {t('Share')}
                
            </button>

        </div>
    );
};

export default WallpaperOptions;