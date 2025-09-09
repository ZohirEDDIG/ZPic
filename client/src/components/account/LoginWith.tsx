import { useTranslation } from 'react-i18next';

const LoginWith = () => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-y-2 sm:gap-y-0'>

            <h3 className='text-dark-three text-sm sm:text-base'>{t('login_with')}</h3>

            <div className='flex items-center gap-x-4'>
                
                <button type='button' className='bg-facebook text-white text-xs sm:text-sm px-4 py-2 rounded-md flex gap-x-2 items-center cursor-pointer select-none transition-opacity duration-300 ease-in-out hover:opacity-80'>

                    <img src='/facebook.svg' alt='Facebook' className='h-4' /> {t('bind')}

                </button>
                
                <button type='button' className='bg-white text-black text-xs sm:text-sm px-4 py-2 rounded-md flex gap-x-2 items-center cursor-pointer select-none transition-opacity duration-300 ease-in-out hover:opacity-80'>
                    
                    <img src='/google.svg' alt='Google' className='h-4'/> {t('bind')}
                
                </button>
            
            </div>

        </div>
    );
};

export default LoginWith;