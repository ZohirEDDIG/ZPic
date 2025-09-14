import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const categories  = [
  {
    label: 'ipad_wallpapers',
    bg: '/categories/illustration.webp'
  },
  {
    label: 'wallpapers_for_boys',
    bg: '/categories/skyline.webp',
  },
  {
    label: 'screen_wallpapers',
    bg: '/categories/apple.webp'
  },
  {
    label: 'windows_wallpapers',
    bg: '/categories/art.webp'
  },
  {
    label: 'iphone_wallpapers',
    bg: '/categories/textures.webp'
  },
  {
    label: '8k_wallpapers',
    bg: '/categories/movies.webp'
  },
  {
    label: 'background_images',
    bg: '/categories/graphics.webp'
  },
  {
    label: 'pc_wallpapers',
    bg: '/categories/cities.webp',
  },
  {
    label: 'lock_screen_wallpapers',
    bg: '/categories/music.webp'
  },
  {
    label: '4k_wallpapers',
    bg: '/categories/food.webp'
  }, 
  {
    label: 'full_hd_wallpapers',
    bg: '/categories/forest.webp'
  }, 
  {
    label: '4k_mobile_wallpapers',
    bg: '/categories/mountains.webp'
  }, 
  {
    label: 'laptop_wallpapers',
    bg: '/categories/abstract.webp'
  }
];

const Categories = () => {
  const { t } = useTranslation();

    return (
        <Splide options={{ type: 'loop', perPage: 5, autoplay : true , pauseOnHover: true, arrows: false, pagination: false, gap: '1rem', speed: 3000,   breakpoints: {
            400: { perPage: 1 },
            600: { perPage: 2 },
            800: { perPage: 3 },
            1000: { perPage: 4 }

        }}}>

            {

                categories.map((category, index) => (

                    <SplideSlide key={index}>

                        <Link to='/' className='block cursor-pointer select-none relative'>

                            <img src={category.bg} alt={t(category.label)} className='rounded-md' />
                            
                            <span className='text-white w-full text-sm  text-center absolute top-1/2 left-1/2 -translate-1/2'>{t(category.label)}</span>

                        </Link>

                    </SplideSlide>

                ))
            
            }

        </Splide>
    );
};

export default Categories;