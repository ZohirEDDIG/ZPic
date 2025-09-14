import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ChangePasswordAndEmail = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className='flex flex-col gap-y-4'>

            <Link to={`/${i18n.language}/account/change-email`} className='text-gray-600 text-sm sm:text-base w-fit underline transition-[color] duration-300 ease-in-out hover:text-black dark:hover:text-white'>

                {t('change_password')}

            </Link>

            <Link to={`/${i18n.language}/account/chnage-password`} className='text-gray-600 text-sm sm:text-base w-fit underline transition-[color] duration-300 ease-in-out hover:text-black dark:hover:text-white'>

                {t('change_email')}
                
            </Link>

        </div>
    );
};

export default ChangePasswordAndEmail; 