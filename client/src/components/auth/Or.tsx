import { useTranslation } from 'react-i18next';

const Or = () => {
    const { t } = useTranslation();
    
    return (
        <div className='flex justify-center items-center gap-x-2'>

            <span className='bg-dark-three w-[150px] h-[1px]'></span>

            <span className='text-dark-three'>{t('or')}</span>
            
            <span className='bg-dark-three w-[150px] h-[1px]'></span>

        </div>
    );
};

export default Or;