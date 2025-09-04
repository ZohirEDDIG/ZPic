import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Logo = ({ parent }: { parent: string }) => {
  const { i18n } = useTranslation();

    return (
        <>
            <Link to={`/${i18n.language}`} className={`${parent === 'header' ? 'dark:text-white' : 'text-white'} text-2xl font-bold hidden sm:block cursor-pointer select-none`}>ZPic<span className='text-gold'>.</span></Link>

            <Link to={`/${i18n.language}`} className={`${parent === 'header' ? 'dark:text-white' : 'text-white'} text-2xl font-bold block sm:hidden cursor-pointer select-none`}>

                <img src='/leaf.svg' alt='Leaf' className='w-8 cursor-pointer select-none'/>

            </Link>

        </>
    );
};

export default Logo;