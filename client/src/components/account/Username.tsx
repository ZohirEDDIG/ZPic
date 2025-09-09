import { useTranslation } from 'react-i18next';

const Username = () => {
    const { t } = useTranslation();

    return (
        <tr className='max-sm:flex flex-col gap-y-2'>

            <td>

                <label htmlFor='username' className='text-dark-three max-sm:text-sm'>{t('your_username')}</label>

            </td>
            

            <td>

                <input type='text' name='username' id='username' className='text-white max-sm:w-[99%] px-2 py-1 border-[1.5px] border-dark-one rounded-md transition-colors duration-300 ease-in-out focus:outline-none focus:border-gold' />

            </td>

        </tr>
    );
};

export default Username;