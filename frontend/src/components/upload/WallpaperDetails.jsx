import { Xmark } from '../../icons'
import { useUpload } from '../../contexts';

const WallpaperDetails = () => {
    const { wallpaperDetails, handleRemoveWallpaper } = useUpload();

    console.log(wallpaperDetails)

    return (
        <div className='flex items-center gap-x-4'>

            <span className='dark:text-white text-sm'>{wallpaperDetails.name}</span>
            
            <span className='dark:text-white text-sm'>{wallpaperDetails.resolution}</span>
            
            <span className='dark:text-white text-sm'>{wallpaperDetails.size}</span>

            <button type='button' onClick={handleRemoveWallpaper} className='text-gray-600 text-2xl cursor-pointer select-none'>
                
                <Xmark />
            
            </button>

        </div>
    );
};

export default WallpaperDetails;