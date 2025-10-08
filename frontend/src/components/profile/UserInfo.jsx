import { useAuth } from '../../contexts';

const UserInfo = () => {
    const { user } = useAuth();
    
    return (
        <div className='flex flex-col gap-y-4'>

            <div className='flex  items-center gap-x-4'>

                <div>

                    <img src={user?.avatar} alt='User avatar' className='block w-10 h-10 rounded-full object-contains select-none' />

                </div>

                <h1 className='dark:text-white'>{user?.username}</h1>

            </div>

            <p className='text-gray-600 text-sm'>{user?.about}</p>

        </div>
    );
};

export default UserInfo;