import { useTranslation } from 'react-i18next';
import { Edit } from '../../icons'

const Avatar = () => {
    const { t } = useTranslation();

    return (
        <tr className='max-sm:flex flex-col gap-y-2'>

            <td>

                <h3 className='text-dark-three max-sm:text-sm'>{t('your_avatar')}</h3>

            </td>

            <td className='flex max-sm:flex-col sm:items-center gap-4'>

                <div className='flex sm:justify-center items-center'>

                    <img src='/user-placeholder.jpg' alt='User placeholder' className='w-10 sm:w-15 h-10 sm:h-15 block object-contains rounded-full cursor-pointer select-none' />

                </div>

                <button type='button' className='text-blue-800 max-sm:text-sm w-fit px-4 py-2 border-2 border-blue-800 rounded-md flex gap-x-2 items-center cursor-pointer select-none transition-colors duration-300 ease-in-out hover:bg-blue-800 hover:text-white'><Edit /> {t('change_avatar')}</button>
            
            </td>

        
        </tr>
    );
};

export default Avatar;