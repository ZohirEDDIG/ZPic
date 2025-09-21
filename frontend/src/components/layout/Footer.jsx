import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Pinterest, Twitter, Facebook } from '../../icons';
import { LanguageChanger } from '../common';
import { useSidebar } from '../../contexts';

const Footer = () => {
    const { t } = useTranslation('');
    const { isSidebarOpen } = useSidebar()
    
    return (
        <footer className={`bg-white dark:bg-gray-800  mt-6 -mb-4 ${isSidebarOpen ? 'ml-[60px] lg:ml-[300px]' : 'ml-[60px]'}`}>

            <div className='p-4 flex flex-col gap-y-4'>

                <div className='flex flex-wrap justify-between items-center gap-x-20 gap-y-6'>

                    <p className='text-gray-600 text-xs font-bold'>{t('copyright')}</p>
                    
                    <div className='flex gap-x-3'>
                    
                        <a href='/' className='text-gray-600 cursor-pointer select-none transition-colors duration-300 ease-in-out hover:text-pinterest'><Pinterest /></a>

                        <a href='/' className='text-gray-600 cursor-pointer select-none transition-colors duration-300 ease-in-out hover:text-twitter'><Twitter /></a>

                        <a href='/' className='text-gray-600 cursor-pointer select-none transition-colors duration-300 ease-in-out hover:text-facebook'><Facebook /></a>

                    </div>

                </div>

                <div className='flex items-center gap-x-3'>

                    <Link to='/' className='dark:text-white text-xs font-bold'>{t('terms_of_use')}</Link>
                    
                    <span className='dark:text-white'>|</span>
                    
                    <Link to='/' className='dark:text-white text-xs font-bold'>{t('privacy_policy')}</Link>

                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>

                        
                    <LanguageChanger parent='footer' />


                    <div className='flex flex-col gap-y-3'>
                                                
                        <h3 className='dark:text-white font-bold text-xs'>{t('instal_our_app')}</h3>

                        <a href='/' className='bg-gray-200 dark:bg-gray-900 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer select-none'>

                            <img src='/google-play.svg' alt='Google play' className='w-6' />

                        </a>
                    
                    </div>

                    <div className='flex flex-col gap-y-3'>
                        
                        <h3 className='dark:text-white font-bold text-xs'>ZPic</h3>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('popular_images')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('best_wallpapers')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('popular_searches')}</Link>

                    </div>

                    <div className='flex flex-col gap-y-3'>

                        <h3 className='dark:text-white font-bold text-xs'>{t('wallpapers')}</h3>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('mobile_wallpapers')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('android_wallpapers')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('4k_wallpapers')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('iphone_wallpapers')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('full_hd_wallpapers')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('samsung_wallpapers')}</Link>

                    </div>

                    <div className='flex flex-col gap-y-3'>

                        <h3 className='dark:text-white font-bold text-xs'>{t('free_images')}</h3>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('car_wallpapers')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('girl_images')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('sunset_backgrounds')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('black_and_white_wallpapers')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('love_wallpapers')}</Link>

                        <Link to='/' className='text-gray-600 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white'>{t('christmas_images')}</Link>

                    </div>

                </div>

            </div>  
            
        </footer>
    );
};

export default Footer;