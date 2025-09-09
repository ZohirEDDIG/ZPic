import { useTranslation } from 'react-i18next';

const Website = () => {
    const { t } = useTranslation();

    return (
        <tr className='max-sm:flex flex-col gap-y-2'>

            <td>

                <label htmlFor='text' className='text-dark-three max-sm:text-sm'>{t('website')}</label>
            
            </td>

            <td>

                <input type='url' name='website' id='website' className='text-white max-sm:w-[99%]  px-2 py-1 border-[1.5px] border-dark-one rounded-md transition-colors duration-300 ease-in-out focus:outline-none focus:border-gold' />

            </td>

        </tr>
    );
};


export default Website;