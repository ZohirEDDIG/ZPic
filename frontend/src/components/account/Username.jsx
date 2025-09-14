import { useTranslation } from 'react-i18next';
import { useAccount } from '../../contexts';
import { useEffect } from 'react';

const Username = () => {
    const { user, userData, setUserData, userDataErrors } = useAccount();

    const handleChangeUsername = (e) => {
        if (e.target.value.startsWith(' ')) return;
        setUserData((prev) => ({...prev, username: e.target.value }));
    };

    const { t } = useTranslation();

    useEffect(() => {
        if (!userData.username) {
            setUserData((prev) => ({...prev, username: user.username }));
        }
    }, [])

    return (
        <div className='flex flex-col sm:flex-row justify-between max-sm:gap-y-2'>

            <label htmlFor='username' className='text-gray-600 text-sm sm:text-base'>{t('your_username')}</label>

            <div className='flex flex-col gap-y-2'>

                <input type='text' name='username' id='username' value={userData.username} onChange={(e) => handleChangeUsername(e)} className='text-white px-2 py-1 border-[1.5px] border-gray-800 rounded-md transition-[border-color] duration-300 ease-in-out focus:outline-none focus:border-gold' />

                { userDataErrors.username.message && <p className='text-red-500 text-xs'>{t(userDataErrors.username.message)}</p> }
            
            </div>

        </div>
    );
};

export default Username;