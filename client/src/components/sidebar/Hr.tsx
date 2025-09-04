import { useSidebar } from '../../contexts';

const Hr = ({ hideInLg }: { hideInLg: boolean }) => {
    const { isSidebarOpen } = useSidebar(); 

    return (
         <hr className={`border-dark-three ${isSidebarOpen ? (hideInLg  ? 'hidden' : 'block') : 'hidden'}`} />
    );
};

export default Hr;