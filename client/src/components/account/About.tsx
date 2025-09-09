import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    return (
        <tr className='max-sm:flex flex-col gap-y-2'>
            
            <td>

                <label htmlFor='text' className='text-dark-three max-sm:text-sm'>{t('about_you')}</label>

            </td>

            <td>
                
                <textarea name='website' id='website'  className='max-sm:w-[99%] sm:w-[300px] h-[150px] text-white px-2 py-1 border-[1.5px] border-dark-one rounded-md resize-none transition-colors duration-300 ease-in-out focus:outline-none focus:border-gold' />
            
            </td>

        </tr>
    ); 
};

export default About;