import { useSidebar } from '../../contexts';

const Hr = ({ hideInLg }) => {
    const { isSidebarOpen } = useSidebar(); 

    return (
        <hr className={`border-gray-600 ${isSidebarOpen ? (hideInLg  ? 'hidden' : 'block') : 'hidden'}`} />
    );
};

export default Hr;