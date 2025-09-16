import { useTranslation } from 'react-i18next';
import { useUpload } from '../../contexts'

const UploadWallpaper = () => {
    const { wallpaper, handleDrop } = useUpload();

    const { t } = useTranslation();
    
    return (
        !wallpaper.file && (
            <label htmlFor='wallpaper' className='text-gray-600 text-4xl text-center p-8 border-dashed border-4 border-gray-600 rounded-md cursor-pointer relative'>

                {t('click_or_drop_the_file')}

                <input type='file' name='wallpaper' id='wallpaper' accept='image/*' onChange={(e) => handleDrop(e)} className='w-full h-full absolute top-0 left-0 hidden' />

            </label>
        )
    )
};

export default UploadWallpaper;