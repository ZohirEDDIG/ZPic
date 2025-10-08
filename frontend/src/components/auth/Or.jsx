import { useTranslation } from 'react-i18next';

const Or = () => {
    const { t } = useTranslation();
    
    return (
        <div className='flex justify-center items-center gap-x-2'>

            <span className='bg-gray-600 w-[150px] h-[1px]'></span>

            <span className='text-gray-600'>{t('or')}</span>
            
            <span className='bg-gray-600 w-[150px] h-[1px]'></span>

        </div>
    );
};

export default Or;