import { useTranslation } from 'react-i18next';
import { useAccount } from '../../contexts';
import { useEffect } from 'react';

const Website = () => {
    const { user, userData, setUserData,userDataErrors } = useAccount();

    const handleChangeWebsite = (e) => {
        if (e.target.value.startsWith(' ')) return;
        setUserData((prev) => ({ ...prev, website: e.target.value }));
    };

    useEffect(() => {
        if (!userData.website) {
            setUserData((prev) => ({ ...prev, website: user.website }));
        }
        
    }, []);

    const { t } = useTranslation();

    return (
        <div className='flex flex-col sm:flex-row justify-between max-sm:gap-y-2'>

            <label htmlFor='website' className='text-gray-600 text-sm sm:text-base'>{t('website')}</label>

            <div className='flex flex-col gap-y-2'>

                <input type='url' name='website' id='website' value={userData.website} onChange={(e) => handleChangeWebsite(e)} className='text-white px-2 py-1 border-[1.5px] border-gray-800 rounded-md transition-[border-color] duration-300 ease-in-out focus:outline-none focus:border-gold' />

                { userDataErrors.website.message && <p className='text-red-500 text-xs'>{t(userDataErrors.website.message)}</p> }
            
            </div>

        </div>
    );
};


export default Website;