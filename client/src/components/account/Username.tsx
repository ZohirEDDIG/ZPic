import { useTranslation } from 'react-i18next';

const Username = () => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-y-2 sm:gap-y-0'>

            <label htmlFor='username' className='text-dark-three  text-sm sm:text-base'>{t('your_username')}</label>

            <input type='text' name='username' id='username' className='text-white px-2 py-1 border-[1.5px] border-dark-one rounded-md transition-colors duration-300 ease-in-out focus:outline-none focus:border-gold' />

        </div>
    );
};

export default Username;