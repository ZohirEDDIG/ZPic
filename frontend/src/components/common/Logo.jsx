import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Logo = ({ parent }) => {
  const { i18n } = useTranslation();

    return (
        <>
            <Link to={`/${i18n.language}`} className={`${parent === 'header' ? 'dark:text-white' : 'text-white'} text-2xl font-bold max-sm:hidden select-none`}>
                
                ZPic
                
                <span className='text-gold'>.</span>
                
            </Link>

            <Link to={`/${i18n.language}`} className={`${parent === 'header' ? 'dark:text-white' : 'text-white'} text-2xl font-bold sm:hidden select-none`}>

                <img src='/leaf.svg' alt='Leaf' className='w-8'/>

            </Link>

        </>
    );
};

export default Logo;