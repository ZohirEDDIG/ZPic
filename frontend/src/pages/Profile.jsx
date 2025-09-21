import { useSidebar } from '../contexts';
import { useProfile } from '../contexts';
import { Header, Sidebar, Footer } from '../components/layout';
import { UserInfo, Nav, Uploads, Bookmarks } from '../components/profile';

const Profile = () => {
    const { activeTab } = useProfile();
    
    const { isSidebarOpen } = useSidebar();
    
    return (
        <>

            <Header />

            <main className='bg-gray-300 dark:bg-gray-900 mt-[53.46px]'>

                <Sidebar />

                <div className={`min-h-[calc(100dvh-53.46px)]  p-4 ${isSidebarOpen ? 'ml-[60px] lg:ml-[300px]' : 'ml-[60px]'} flex flex-col gap-y-6 transition-[margin-left] duration-300 ease-in-out`}>

                    <UserInfo />

                    <Nav />

                    {
                        activeTab === 'uploads'

                        ? <Uploads />

                        : <Bookmarks />

                    }

                </div>
                
                <Footer />

            </main>

        </>
    );
};

export default Profile;