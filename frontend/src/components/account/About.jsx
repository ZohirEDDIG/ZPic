import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from '../../contexts';

const About = () => {
    const { user, userData, setUserData, userDataErrors } = useAccount();

    const handleChangeAbout = (e) => {
        if (e.target.value.startsWith(' ')) return;
        setUserData((prev) => ({ ...prev, about: e.target.value }));
    };

    useEffect(() => {
        if (!userData.about) {
            setUserData((prev) => ({ ...prev, about: user.about }));
        }
    }, []);

    const { t } = useTranslation();

    return (
        <div className='flex flex-col sm:flex-row justify-between max-sm:gap-y-2'>

            <label htmlFor='about' className='text-gray-600 text-sm sm:text-base'>{t('about_you')}</label>

            <div className='flex flex-col gap-y-2 items-end'>
            
                <textarea name='about' id='about' maxLength={120} value={userData.about} onChange={(e) => handleChangeAbout(e)} className='w-full sm:w-[264.67px] h-[150px] text-white px-2 py-1 border-[1.5px] border-gray-800 rounded-md resize-none transition-[border-color] duration-300 ease-in-out focus:outline-none focus:border-gold about' />
            
                <span className='text-gray-600 text-xs'>{userData.about.length}/120</span>

                { userDataErrors.about.message && <p className='text-red-500 text-xs'>{t(userDataErrors.about.message)}</p> }
            
            </div>  

        </div>
    ); 
};

export default About;