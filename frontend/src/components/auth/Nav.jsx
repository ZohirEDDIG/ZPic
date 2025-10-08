import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Nav = ({ parent }) => {

    const { i18n, t } = useTranslation();

    return (
        <div className='flex gap-x-6 items-center'>

            <Link to={`/${i18n.language}/account/login`} className={`text-sm ${parent=== 'login' ? 'border-b-2 border-b-gold' : 'text-gray-600'}`}>{t('login')}</Link>

            <Link to={`/${i18n.language}/account/register`} className={`text-sm ${parent=== 'register' ? 'border-b-2 border-b-gold' : 'text-gray-600'}`}>{t('register')}</Link>

        </div>
    );
};

export default Nav;