import { useTranslation } from 'react-i18next';
import { Edit } from '../../icons'
import { useAccount } from '../../contexts';

const Avatar = () => {
    const { userData: { avatarPreview: { avatarPreview } }, handleChangeAvatarPreview } = useAccount();

    const { t } = useTranslation();

    return (
        <div className='flex flex-col sm:flex-row justify-between max-sm:gap-y-2'>

            <h3 className='text-gray-600 text-sm sm:text-base'>{t('your_avatar')}</h3>

            <div className='flex items-center gap-x-4'>

                <div className='flex justify-center items-center'>

                    <img src={avatarPreview || '/user-placeholder.jpg'} alt='User avatar' className='w-10 h-10 block object-contains rounded-full select-none' />

                </div>

                <label htmlFor='avatar' className='text-blue-800 text-sm px-2 py-1 border-2 border-blue-800 rounded-md flex gap-x-2 items-center cursor-pointer select-none  transition-colors duration-300 ease-in-out hover:bg-blue-800 hover:text-white'>
                    
                    <input type='file' name='avatar' id='avatar' accept='image/*' onChange={(e) => handleChangeAvatarPreview(e)} className='hidden' />

                    <Edit /> 

                    {t('change_avatar')}

                </label>
            
            </div>
        
        </div>
    );
};

export default Avatar;