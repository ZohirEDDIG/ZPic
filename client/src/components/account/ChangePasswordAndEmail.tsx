import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ChangePasswordAndEmail = () => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col gap-y-6'>

            <Link to='' className='text-dark-three w-fit  max-sm:text-sm underline transition-colors duration-300 ease-in-out hover:text-white'>{t('change_password')}</Link>

            <Link to='' className='text-dark-three w-fit  max-sm:text-sm underline transition-colors duration-300 ease-in-out hover:text-white'>{t('change_email')}</Link>

        </div>
    );
};

export default ChangePasswordAndEmail;