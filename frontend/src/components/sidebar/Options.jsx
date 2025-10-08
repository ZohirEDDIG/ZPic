import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid, Mobile, Desktop, Cool, Flower } from '../../icons';
import { useSidebar } from '../../contexts';


const options = [
    {
        icon: <Grid />,
        label: 'all_wallpapers',
    }, 
    {
        icon: <Mobile />,
        label: 'mobile_wallpapers',
    },
    {
        icon: <Desktop />,
        label: 'desktop_wallpapers',
    },
    {
        icon: <Cool />,
        label: 'cool_wallpapers',
    },
    {
        icon: <Flower />,
        label: 'wallpapers_for_girls',
    }
];

const Options = () => {
    const { isSidebarOpen } = useSidebar();

    const { t }  = useTranslation();
    
    return (
        <div className={`flex flex-col ${isSidebarOpen ? 'gap-y-0' : 'gap-y-6'} transition-all duration-300 ease-in-out`}>

            {

                options.map((option, index) => (

                    <Link key={index} to='/' className={`dark:text-white text-sm w-[300px] px-4 py-2 flex items-start gap-x-2 cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700`}>
                    
                        <span className='text-gray-600 text-lg'>{option.icon}</span>
                        
                        <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>{t(option.label)}</span>
                    
                    </Link>

                ))

            }

        </div> 
    );
};

export default Options;