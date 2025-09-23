import { useTranslation } from 'react-i18next';
import { useAccount } from '../../contexts';


const Website = () => {
    const  { userData: { website }, handleChangeWebsite, userDataErrors, editCurrentUserMutation } = useAccount();

    const { t } = useTranslation();

    return (
        <div className='flex flex-col sm:flex-row justify-between max-sm:gap-y-2'>

            <label htmlFor='website' className='text-gray-600 text-sm sm:text-base'>{t('website')}</label>

            <div className='flex flex-col gap-y-2'>

                <input type='url' name='website' id='website' value={website} onChange={(e) => handleChangeWebsite(e)}  className='text-white px-2 py-1 border-[1.5px] border-gray-800 rounded-md transition-[border-color] duration-300 ease-in-out focus:outline-none focus:border-gold' />

                {userDataErrors.username && <p className='text-red-500 text-xs'>{t(userDataErrors.username)} test</p>}

                {
                
                    editCurrentUserMutation.error && editCurrentUserMutation.error.response.data?.userDataErrors && editCurrentUserMutation.error.response.data.userDataErrors.website &&
                    
                    <p className='text-red-500 text-xs'>{t(editCurrentUserMutation.error.response.data.userDataErrors.website)}</p>
                
                }
            

            </div>

        </div>
    );
};


export default Website;