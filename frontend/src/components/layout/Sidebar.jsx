import { useSidebar } from '../../contexts';
import { Options, Sort, Resolutions, Categories, Hr } from '../sidebar';
import { DarkModeToggler, LanguageChanger, MoreMenu } from '../common';

const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();

  return (
      <aside className={`bg-white dark:bg-gray-800 ${isSidebarOpen ? 'w-[300px]' : 'w-[60px]'} h-[calc(100dvh-53.46px)] pb-4 flex flex-col gap-y-4 fixed top-[53.46px] z-10 overflow-x-hidden overflow-y-scroll transition-all duration-300 ease-in-out sidebar`}>
        
        <Options />

        <Hr hideInLg={false} />

        <Sort />

        <Hr hideInLg={false} />

        <Resolutions />

        <Hr hideInLg={false} />

        <Categories />

        <Hr hideInLg={true} />

        <MoreMenu parent='sidebar' />

        <Hr hideInLg={true} />

        <LanguageChanger parent='sidebar' />

        <Hr hideInLg={true} />

        <DarkModeToggler parent='sidebar' />
        
      </aside>
  
);
};

export default Sidebar;