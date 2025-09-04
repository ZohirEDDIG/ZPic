import { useTranslation } from 'react-i18next';

const Copyright = () => {
    const { t } = useTranslation();

    const date = new Date();

    return (
        <p className='text-dark-three text-xs sm:text-sm text-center'>© {date.getFullYear()} Zpic | {t('copyright')}</p>
    );
};

export default Copyright;