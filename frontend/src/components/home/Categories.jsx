import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from 'axios';
import '@splidejs/react-splide/css';


const API_URL = import.meta.env.VITE_API_URL

console.log(API_URL)

const getCategories = () => {
    return axios.get(`${API_URL}/categories`);
}


const Categories = () => {
    const { t } = useTranslation();

    const getCategoriesQuerie = useQuery({ queryKey: ['categories'], queryFn: getCategories });

    useEffect(() => {

        if (getCategoriesQuerie.isSuccess) {
            console.log(getCategoriesQuerie.data.data.categories)
        }
      
        if (getCategoriesQuerie.isError) {
            console.log(getCategoriesQuerie.error.response.data.error)
        }

    }, [getCategoriesQuerie.isSuccess, getCategoriesQuerie.isError])

    return (

        getCategoriesQuerie.isPending

        ?    <h1>Loading Categories...</h1>

        :    getCategoriesQuerie.isSuccess

        ?   <Splide options={{ type: 'loop', perPage: 5, autoplay : true , pauseOnHover: true, arrows: false, pagination: false, gap: '1rem', speed: 3000,  breakpoints: { 400: { perPage: 1 }, 600: { perPage: 2 }, 800: { perPage: 3 }, 1000: { perPage: 4 }}}}>
                
                {

                    getCategoriesQuerie.data.data.categories.map((category) => (

                        <SplideSlide key={category._id}>

                            <Link to='/' className='block cursor-pointer select-none relative'>

                                <img src={category.image} alt={t(category.name)} className='rounded-md' />
                                
                                <span className='text-xl  text-white w-full  text-center absolute top-1/2 left-1/2 -translate-1/2'>{t(category.name)}</span>

                            </Link>

                        </SplideSlide>
                        
                    ))

                }

            </Splide>

        :   getCategoriesQuerie.isError 

        ?   <p>{getCategoriesQuerie.error.response.data.error}</p>

        :   'null'
    );
};

export default Categories;