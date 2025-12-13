import { useTranslation } from 'react-i18next';
import { useUpload } from '../../contexts';

const WallpaperDescription = () => {
    const { description, handleChangeDescription, uploadWallpaperErrors, uploadWallpaperMutation } = useUpload();

    const { t } = useTranslation();

    return (
        <div className='flex flex-col gap-y-2'>

            <input 
                className='w-full dark:text-white text-sm py-2 px-4 border border-gray-700 rounded-md flex flex-wrap gap-2 
                appearance-none focus:outline-none dark:placeholder:text-white'
                type="text"
                id='wallpaper-description'
                name='wallpaper-description'
                placeholder='A short description for you wallpaper' 
                value={description}
                maxLength={100}
                onChange={(e) => handleChangeDescription(e)}
            />

            <span className='text-gray-500 text-sm text-right'>{description.length} / 100 characters left</span>

            {uploadWallpaperErrors.category && <p className='text-red-500 text-sm'>{t(uploadWallpaperErrors.description)}</p>}

            {uploadWallpaperMutation.isError && 
            uploadWallpaperMutation.error.response.data?.errors.description && 
            <p className='text-red-500 text-sm'>{t(uploadWallpaperMutation.error.response.data.errors.description )}</p>}
        
        </div>
    );
};

export default WallpaperDescription;