import { Link } from 'react-router';

const test = [
    '/wallpapers/test-1.jpg',
    '/wallpapers/test-2.jpg',
    '/wallpapers/test-3.jpg',
    '/wallpapers/test-4.jpg',
    '/wallpapers/test-5.jpg',
    '/wallpapers/test-6.jpg',
    '/wallpapers/test-7.jpg',
    '/wallpapers/test-8.jpg',
    '/wallpapers/test-9.jpg',
    '/wallpapers/test-10.jpg',
    '/wallpapers/test-11.jpg',
    '/wallpapers/test-12.jpg',
    '/wallpapers/test-13.jpg',
    '/wallpapers/test-14.jpg',
    '/wallpapers/test-15.jpg',
    '/wallpapers/test-16.jpg',
    '/wallpapers/test-17.jpg',
    '/wallpapers/test-18.jpg',
    '/wallpapers/test-19.jpg',
];

const Wallpapers = () => {
    return (
        <section  className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5'>

            {

                test.map((item, index) =>
                    
                    <Link key={index} to='/' className='block cursor-pointer select-none'>

                        <img src={item} alt='Wallpaper' className='mb-4' />

                    </Link>
                ) 
            
            }

        </section>
    );
};

export default Wallpapers;