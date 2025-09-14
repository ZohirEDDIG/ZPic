import { useTranslation } from 'react-i18next'

const UploadWallpaper = () => {
    const { t } = useTranslation();
    
    return (
        <label htmlFor='wallpaper' className='text-gray-600 text-4xl text-center p-8 border-dashed border-4 border-gray-600 rounded-md cursor-pointer relative'>

            {t('click_or_drop_the_file')}

            <input type='file' name='wallpaper' id='wallpaper' accept='image/*' className='bg-red-200 w-full h-full absolute top-0 left-0 hidden' />

        </label>
    )
};

export default UploadWallpaper;