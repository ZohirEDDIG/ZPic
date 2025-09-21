import { Xmark } from '../../icons'
import { useUpload } from '../../contexts';

const WallpaperDetails = () => {
    const { wallpaperDetails, handleClear } = useUpload();

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 sm:items-center gap-4'>

            <span className='dark:text-white text-sm line-clamp-1'>{wallpaperDetails.name}</span>
            
            <span className='dark:text-white text-sm sm:ml-auto '>{wallpaperDetails.resolution}</span>
            
            <span className='dark:text-white text-sm sm:ml-auto '>{wallpaperDetails.size}</span>

            <button type='button' onClick={handleClear} className='text-gray-600 text-2xl ml-auto cursor-pointer select-none hidden xl:block'>
                
                <Xmark />
            
            </button>

        </div>
    );
};

export default WallpaperDetails;