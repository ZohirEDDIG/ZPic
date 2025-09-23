import { useTranslation } from 'react-i18next';
import { useAccount, useSidebar } from '../contexts';
import { Header, Sidebar, Footer } from '../components/layout';
import { Username, Avatar, Website, About, LoginWith, ChangePasswordAndEmail } from '../components/account';

const Account = () => {
    const { userDataErrors: { sameData }, handleSaveChanges, editCurrentUserMutation } = useAccount();

    const { t } = useTranslation();

    const { isSidebarOpen } = useSidebar();

    return (
        <>
            <Header />

            <main className='bg-gray-100 dark:bg-gray-900  mt-[53.46px]'>

                <Sidebar />

                <div className={`p-4 ${isSidebarOpen ? 'ml-[60px] lg:ml-[300px]' : 'ml-[60px]'} flex flex-col gap-y-8 transition-[margin-left] duration-300 ease-in-out`}>
                  
                    <div className='min-h-[calc(100dvh-53.46px)] flex flex-col gap-y-8'>

                        <h1 className='dark:text-white sm:text-xl'>{t('profile_editor')}</h1>

                        <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>

                            <div className='flex flex-col gap-y-4'>

                                <h2 className='dark:text-white text-lg'>{t('general_information')}</h2>

                                <Username />

                                <Avatar />

                                <Website />

                                <About />

                            </div>

                            <div className='flex flex-col gap-y-4'>

                                <h2 className='dark:text-white text-lg'>{t('options')}</h2>

                                <LoginWith />

                                <ChangePasswordAndEmail />

                            </div>

                        </div>

                        {sameData && <p className='text-red-500 text-xs'>{t(sameData)}</p>}

                        {
                    
                            editCurrentUserMutation.error && editCurrentUserMutation.error.response.data?.error &&
                            
                            <p className='text-red-500 text-xs'>{t(editCurrentUserMutation.error.response.data.error)}</p>
                    
                        }
            
                        <button type='button' disabled={editCurrentUserMutation.isPending} onClick={handleSaveChanges} className={`bg-gold w-fit text-sm sm:text-base px-4 py-2 mx-auto rounded-md ${editCurrentUserMutation.isPending ? 'opacity-50 pointer-events-none cursor-none' : 'opacity-100 cursor-pointer hover:opacity-80'} select-none transition-opacity duration-300 ease-in-out`}>{editCurrentUserMutation.isPending ? t('saving_changes') : t('save_changes')}</button>

                    </div>

                </div>

                <Footer />
            
            </main>

        </>
    );
};

export default Account;