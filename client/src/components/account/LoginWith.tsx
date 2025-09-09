import { useTranslation } from 'react-i18next';

const LoginWith = () => {
    const { t } = useTranslation();

    return (
        <tr className='flex max-sm:flex-col sm:items-center gap-x-16 gap-y-4'>

            <td>

                <h3 className='text-dark-three'>{t('login_with')}</h3>

            </td>


            <td className='flex items-center gap-x-4'>
                
                <button type='button' className='bg-[#3D5A98] max-sm:text-sm text-white px-4 py-2  rounded-md flex gap-x-2 items-center cursor-pointer select-none transition-opacity duration-300 ease-in-out hover:opacity-80'>

                    <img src='/facebook.svg' alt='Facebook' className='w-4' /> {t('bind')}

                </button>

                
                <button type='button' className='bg-white max-sm:text-sm text-black px-4 py-2  rounded-md flex gap-x-2 items-center cursor-pointer select-none transition-opacity duration-300 ease-in-out hover:opacity-80'>
                    
                    <img src='/google.svg' alt='Google' className='w-4'/> {t('bind')}
                
                </button>
            
            </td>

        </tr>
    );
};

export default LoginWith;