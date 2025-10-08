import  { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Desktop, FourK, Apple, Android, AngleDown } from '../../icons';
import { useSidebar } from '../../contexts';
import { Link } from 'react-router-dom';

const resolutions = [
  {
    icon: <FourK />,
    label: 'Ultra HD',
    options: [
      {
        resolution: '3820x2160',
        infos: '4K Ultra HD'
      },
      {
        resolution: '7680x4320',
        infos: '8K Ultra HD'
      }
    ]
  },
  {
    icon: <Apple />,
    label: 'Apple',
    options: [
      {
        resolution: '1242x2688',
        infos: 'iPhone XS Max'
      },
      {
        resolution: '1125x2436',
        infos: 'iPhone X / XS',
      },
      {
        resolution: '1080x1920',
        infos: 'iPhone 6S+/7+/8+',
      },
      {
        resolution: '750x1334',
        infos: 'iPhone 6/6S/7/8',
      }
    ]
  },
  {
    icon: <Android />,
    label: 'Android',
    options: [
      {
        resolution: '2560x1440',
        infos: '2560x1440 QHD '
      },
      {
        resolution: '1920x1080',
        infos: '1920x1080 Full HD'
      },
      {
        resolution: '1366x768',
        infos: '1366x768'
      },
      {
        resolution: '1280x720',
        infos: '1280x720 HD'
      }
    ]
  },
  {
    icon: <Desktop />,
    label: 'Widescreen',
    options: [
      {
        resolution: '2560x1440',
        infos: '2560x1440 QHD'
      },
      {
        resolution: '1920x1080',
        infos: '1920x1080 Full HD'
      },
      {
        resolution: '1366x768',
        infos: '1366x768'
      },
      {
        resolution: '1280x720',
        infos: '1280x720 HD'
      }
    ]
  }
];

const Resolutions = () => {
    const { isSidebarOpen } = useSidebar();

    const { t } = useTranslation();

    const [isResolutionsOptionsOpen, setIsResolutionsOptionsOpen] = useState({
        0: false,
        1: false,
        2: false,
        3: false
    });


    const handleToggleResolutionOptions = (index) => {
        setIsResolutionsOptionsOpen((prev) => ({...prev, [index]: !prev[index]}));
    };

    return (
        <div className={`flex flex-col gap-y-2 ${isSidebarOpen ? 'flex' : 'hidden'}`}>
        
            <h1 className='text-gray-600 text-lg font-bold px-4'>{t('resolution')}</h1>

            <div className='flex flex-col'>
            
                {
                  
                    resolutions.map((resolution, index) => (
                    
                    <div key={index} className='flex flex-col gap-y-1'>

                        <button type='button' onClick={() => handleToggleResolutionOptions(index)} className='dark:text-white text-sm w-[300px] px-4 py-2 flex  items-center justify-between  cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700'>

                            <div className='flex items-center gap-x-2'>
                            
                                <span className='text-gray-600 text-lg'>{resolution.icon}</span>
                                
                                <span>{resolution.label}</span>

                            </div>

                            <span className='text-dark-three'><AngleDown /></span> 

                        </button>

                        <div  className={`w-full ${isResolutionsOptionsOpen[index] ? (index === 0 ? 'h-[76px]' : 'h-[156px]') : 'h-0'}   flex flex-col items-start gap-y-1 transition-[height] duration-300 ease-in-out overflow-hidden`}>

                            {

                                resolution.options.map((option, index) => (

                                    <Link  key={index} to='/' type='button' className='w-full dark:text-white text-sm px-4 flex flex-col items-start cursor-pointer select-none transition-[background-color] duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700'>
                                      
                                        <span>{option.resolution}</span>
                                        
                                        <span className='text-gray-600 text-xs'>{option.infos}</span>
                                    
                                    </Link>

                                ))

                            }

                        </div>
                      
                    </div>
                  
                  ))
                
                }
            
            </div>
                
        </div>
      
    );
};

export default Resolutions;