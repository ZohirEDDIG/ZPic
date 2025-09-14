import { AngleRight, AngleLeft } from '../../icons';

const Pagination = () => {
    return (
        <div className='flex justify-center sm:justify-between items-center'>

            <span className='hidden sm:block'></span>

            <button type='button' className=' dark:bg-gray-900 dark:text-white px-4 py-2 border border-gray-600 dakr:border-none rounded-md cursor-pointer select-none hidden sm:flex gap-x-2 items-center transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-black dark:hover:bg-gold dark:hover:text-white'>Next Page <AngleRight /></button>

            <div className='flex items-center gap-x-2 '>

                <button type='button' className='dark:bg-gray-900 dark:text-white p-2 border border-gray-600 dakr:border-none rounded-md flex cursor-pointer select-none hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300 ease-in-out'>
                    
                    <AngleLeft />
                    
                    <AngleLeft className='-ml-2' />
                
                </button>
                
                <button type='button' className='dark:bg-gray-900 dark:text-white p-2 border border-gray-600 dakr:border-none rounded-md cursor-pointer select-none hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300 ease-in-out'>
                    
                    <AngleLeft />
                
                </button>

                <span className='bg-transparent dark:text-white text-xs py-2 px-3 border border-gray-600 rounded-md'>5</span>

                <button type='button' className='dark:bg-gray-900 dark:text-white p-2 border border-gray-600 dakr:border-none rounded-md cursor-pointer select-none hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300 ease-in-out'>
                   
                    <AngleRight />
                
                </button>

                <span className='text-gray-600 select-none'>|</span>

                <span className='text-gray-600'>2708</span>

            </div>
            
        </div>
    );
};

export default Pagination;