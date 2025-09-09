import { useTranslation } from 'react-i18next';
import { Edit } from '../../icons'

const Avatar = () => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-y-2 sm:gap-y-0'>

            <h3 className='text-dark-three  text-sm sm:text-base'>{t('your_avatar')}</h3>

            <div className='flex items-center gap-x-4'>

                <div className='flex justify-center items-center'>

                    <img src='/user-placeholder.jpg' alt='User placeholder' className='w-10 h-10 block object-contains rounded-full cursor-pointer select-none' />

                </div>

                <button type='button' className='text-blue-800 text-sm px-2 py-1 border-2 border-blue-800 rounded-md flex gap-x-2 items-center cursor-pointer select-none transition-colors duration-300 ease-in-out hover:bg-blue-800 hover:text-white'><Edit /> {t('change_avatar')}</button>
            
            </div>

        
        </div>
    );
};

export default Avatar;