import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import useHome from '../context/useHome';


const Categories = () => {
    const { getCategoriesQuery } = useHome();

    const { t, i18n } = useTranslation();

    return (
        getCategoriesQuery.isPending

        ?   <h1 className='dark:text-white'>{t('Loading categories...')}</h1> 

        :   getCategoriesQuery.isSuccess

        ?   (

                getCategoriesQuery.data.data.categories.length === 0

                ?   <h1 className='dark:text-white'>{t('No categories exist in the platform')}</h1>

                :   <Splide 
                        options={{ 
                            type: 'loop', 
                            perPage: 5, 
                            autoplay : true , 
                            pauseOnHover: true, 
                            arrows: false, 
                            pagination: false, 
                            gap: '1rem', 
                            speed: 3000,  
                            breakpoints: { 
                                400: { perPage: 1 }, 
                                600: { perPage: 2 }, 
                                800: { perPage: 3 }, 
                                1000: { perPage: 4 }
                            }}}
                    >
                    
                        {

                            getCategoriesQuery.data.data.categories.map((category) => (

                                <SplideSlide key={category._id}>

                                    <Link to={`/${i18n.language}/category/${category.name.toLowerCase()}`} className='select-none relative'>

                                        <img src={category.image} alt={t(category.name)} className='min-h-[100px] rounded-md' />
                                        
                                        <span className='w-full text-white text-center absolute top-1/2 left-1/2 -translate-1/2'>{t(category.name)}</span>

                                    </Link>

                                </SplideSlide>
                                
                            ))

                        }

                    </Splide>

            )
        
        :   getCategoriesQuery.isError 
        
        ?   <p className='error'>{getCategoriesQuery.error?.response?.data?.error || t('Something went wrong when trying to load categories')}</p>

        :   null
    );
};

export default Categories;